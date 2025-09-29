import { PrismaClientKnownRequestError } from '@/configs/prisma.rt.lib';
import type { PrismaError, TStatusCode } from '@/types';
import type { IErrorResponse, PrismaErrorMeta } from '@/types/interfaces';
import { HTTP_STATUS } from 'nhb-toolbox/constants';

export function handlePrismaError(error: PrismaError): IErrorResponse {
	let name = error.name,
		message = 'Database Error! Please try again later!',
		path = 'unknown',
		statusCode: TStatusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;

	if (error instanceof PrismaClientKnownRequestError) {
		const { modelName = '', target = [] } = (error?.meta ?? {}) as PrismaErrorMeta;

		const targetPath = target?.join('.');

		switch (error.code) {
			case 'P2002':
				path = targetPath;
				statusCode = HTTP_STATUS.BAD_REQUEST;
				name = 'Validation Error';
				message = `${modelName} already exists with the provided ${targetPath}!`;
				break;

			default:
				break;
		}
	}

	return {
		name,
		statusCode,
		errorSource: [{ path, message }],
		stack: error.stack,
	};
}
