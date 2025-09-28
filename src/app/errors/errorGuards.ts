import type { IParserError } from '@/types/interfaces';
import { isObject } from 'nhb-toolbox';

/**
 * * Type guard to check if an error is an Express Body Parser Error.
 * @param error An unknown error object.
 */
export const isParserError = (error: unknown): error is IParserError => {
	return isObject(error) && 'type' in error && error.type === 'entity.parse.failed';
};

export const typeGuards = { isParserError };
