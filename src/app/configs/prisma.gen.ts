import { Stylog } from 'nhb-toolbox/stylog';
import { PrismaClient } from '../../../generated/prisma';

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export const prisma = new PrismaClient({
	log: [
		{ emit: 'event', level: 'query' },
		{ emit: 'event', level: 'error' },
	],
});

prisma.$on('error', (event) => {
	Stylog.ansi16('blue').log(event.message);
});

// ! Export everything from Prisma CLient
export * from '../../../generated/prisma/client';
export * from '../../../generated/prisma/default';
export * from '../../../generated/prisma/edge';
export * from '../../../generated/prisma/index';
export * from '../../../generated/prisma/wasm';
