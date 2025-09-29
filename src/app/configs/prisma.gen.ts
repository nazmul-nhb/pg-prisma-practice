import { PrismaClient } from '../../../generated/prisma';

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export const prisma = new PrismaClient();

export * from '../../../generated/prisma/client';
export * from '../../../generated/prisma/default';
export * from '../../../generated/prisma/edge';
export * from '../../../generated/prisma/index';
export * from '../../../generated/prisma/wasm';
