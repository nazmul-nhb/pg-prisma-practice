import { Prisma, prisma, type User } from '@/configs/prisma.gen';
import type { TEmail, TQueries } from '@/types';
import { convertObjectValues, extractKeys, isValidObject, pickFields } from 'nhb-toolbox';

class UserServices {
	async getAllUsersFromDB(query?: TQueries<User>) {
		const queries = pickFields(
			convertObjectValues(query!, { keys: ['id'], convertTo: 'number' }),
			extractKeys(Prisma.UserScalarFieldEnum)
		);

		const users = await prisma.user.findMany({
			...(isValidObject(query) && { where: queries }),
			orderBy: { id: 'asc' },
		});

		const p = await prisma.user.findMany({
			where: {
				email: {
					contains: 'hello',
				},
			},
		});

		console.log(p);

		const raw = await prisma.$queryRaw<User[]>(
			Prisma.sql`select * from "User" where email like '%hello%'`
		);

		console.log(raw);

		const {
			_sum: { id: sum },
		} = await prisma.user.aggregate({
			_sum: {
				id: true,
			},
		});

		console.log(sum);

		return users;
	}

	async getCurrentUserFromDB(email: TEmail | undefined) {
		const user = await prisma.user.findFirst({
			select: { name: false, email: true },
			where: { email },
		});

		return user;
	}
}

export const userServices = new UserServices();
