import type { Logger } from '@/lib/logger';
import { AppError } from './base.error';

interface ErrorResponse {
  statusCode: number;
  message: string;
  details?: unknown;
}

export function handleError(error: Error, logger: Logger): ErrorResponse {
  if (error instanceof AppError && error.isOperational) {
    logger.warn({ error: error.message, context: error.context }, 'Operational error');
    return { statusCode: error.statusCode, message: error.message, details: error.context };
  }

  logger.error({ error, stack: error.stack }, 'Unexpected error');
  return { statusCode: 500, message: 'Erro interno do servidor' };
}
