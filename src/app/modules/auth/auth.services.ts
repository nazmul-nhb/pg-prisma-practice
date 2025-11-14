import { prisma, type Prisma } from '@/configs/prisma.gen';
import { hashPassword } from '@/utilities/authUtilities';

class AuthServices {
	async registerUserInDB(payload: Prisma.UserCreateInput) {
		const { first_name, password } = payload;

		const normalized = first_name.toLowerCase().replace(/\s+/g, '_');

		let username = normalized;
		let suffix = 0;

		// Continuously check the database for existing usernames
		while (true) {
			const exists = await prisma.user.findUnique({
				where: { user_name: username },
				select: { id: true },
			});

			if (!exists) break;

			suffix += 1;
			username = `${normalized}_${suffix}`;
		}

		payload.user_name = username;
		payload.password = await hashPassword(password);

		const user = await prisma.user.create({ data: payload, omit: { password: true } });

		return user;
	}

	// /**
	//  * * Login user.
	//  * @param payload Login credentials (`email` and `password`).
	//  * @returns Token as object.
	//  */
	// async loginUser(payload: ILoginCredentials): Promise<ITokens> {
	// 	// * Validate and extract user from DB.
	// 	const user = await User.validateUser(payload.email);

	// 	const result = await processLogin(payload?.password, user);

	// 	return result;
	// }

	// /**
	//  * Refresh token.
	//  * @param token Refresh token from client.
	//  * @returns New access token.
	//  */
	// async refreshToken(token: string): Promise<{ token: string }> {
	// 	// * Verify and decode token
	// 	const decodedToken = verifyToken(configs.refreshSecret, token);

	// 	// * Validate and extract user from DB.
	// 	const user = await User.validateUser(decodedToken.email);

	// 	// * Create token and send to the client.
	// 	const accessToken = generateToken(
	// 		pickFields(user, ['email', 'role']),
	// 		configs.accessSecret,
	// 		configs.accessExpireTime
	// 	);

	// 	return { token: accessToken };
	// }

	// /** * Get current user from DB. */
	// async getCurrentUserFromDB(client?: DecodedUser) {
	// 	const user = await User.validateUser(client?.email);

	// 	const { password: _, __v, ...userInfo } = user.toObject<IPlainUser>();

	// 	return userInfo;
	// }
}

export const authServices = new AuthServices();
