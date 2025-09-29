import { ErrorWithStatus } from '@/classes/ErrorWithStatus';
import { typeGuards } from '@/errors/errorGuards';
import { genericErrors } from '@/errors/genericErrors';
import { handleZodErrors } from '@/errors/zodErrors';
import type { IErrorResponse } from '@/types/interfaces';
import type { StrictObject } from 'nhb-toolbox/object/types';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';

interface Meta extends StrictObject {
	modelName: string;
	target: string[];
}

/**
 * * Processes an error of `unknown` type and returns a structured response.
 * @param error An error of `unknown` type.
 * @returns Processed & structured `Error Response`.
 */
const processErrors = (error: unknown): IErrorResponse => {
	const stack = error instanceof Error ? error.stack : 'Stack Not Available!';

	// Zod Validation Error
	if (error instanceof ZodError) {
		return handleZodErrors(error, stack);
	} else if (error instanceof PrismaClientKnownRequestError) {
		const { modelName = '', target = [] } = (error?.meta as Meta) ?? {};

		const path = target?.join('.');

		const message =
			error.code === 'P2002' ?
				`${modelName} must be with unique ${path}!`
			:	'Database Error! Please try again later!';

		return {
			name: 'Validation Error',
			statusCode: 400,
			errorSource: [{ path, message }],
			stack: error.stack,
		};
	}
	// Express Body Parser Error
	else if (typeGuards.isParserError(error)) {
		return genericErrors.handleParserError(error, stack);
	}
	// Custom ErrorWithStatus
	else if (error instanceof ErrorWithStatus) {
		return genericErrors.handleErrorWithStatus(error, stack);
	}
	// General Error
	else if (error instanceof Error) {
		return genericErrors.handleGenericError(error, stack);
	}

	// Fallback for unknown errors
	return {
		statusCode: 500,
		name: 'Unknown Error!',
		errorSource: [{ path: 'unknown', message: 'An Unknown Error Occurred!' }],
		stack,
	};
};

export default processErrors;
