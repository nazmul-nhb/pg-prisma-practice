import type { PrismaError } from '@/types';
import type { IParserError } from '@/types/interfaces';
import { isObjectWithKeys, isString } from 'nhb-toolbox';

class ErrorGuard {
	/** * Type guard to check if an error is an Express Body Parser Error. */
	isParserError(error: unknown): error is IParserError {
		return (
			isObjectWithKeys(error, ['type']) &&
			isString(error.type) &&
			error.type === 'entity.parse.failed'
		);
	}

	/** * Type guard to check if an error is `PrismaError` */
	isPrismaError(error: unknown): error is PrismaError {
		return (
			isObjectWithKeys(error, ['code']) &&
			isString(error.code) &&
			error.code.startsWith('P')
		);
	}
}

export const errorGuard = new ErrorGuard();
