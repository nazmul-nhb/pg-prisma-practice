import { prisma } from '@/configs/prisma';
import type { TQueries } from '@/types';
import type { User } from '../../../../generated/prisma';

class UserServices {
	async getAllUsersFromDB(query?: TQueries<User>) {
		const users = await prisma.user.findMany({
			where: query,
			orderBy: { id: 'asc' },
		});

		return users;
	}

	// async getCurrentUserFromDB(email: TEmail | undefined) {
	// 	const user = await User.validateUser(email);

	// 	const { password: _, __v, ...userInfo } = user.toObject<IPlainUser>();

	// 	return userInfo;
	// }
}

export const userServices = new UserServices();
