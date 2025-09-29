import { prisma, type User } from '@/configs/prisma.gen';
import type { TQueries } from '@/types';

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
