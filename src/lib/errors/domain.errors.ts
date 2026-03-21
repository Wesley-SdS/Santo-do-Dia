import { AppError } from './base.error';

export class NotFoundError extends AppError {
  readonly statusCode = 404;
  readonly isOperational = true;

  constructor(message = 'Recurso não encontrado', context?: Record<string, unknown>) {
    super(message, context);
  }
}

export class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly isOperational = true;

  constructor(message = 'Dados inválidos', context?: Record<string, unknown>) {
    super(message, context);
  }
}

export class RateLimitExceededError extends AppError {
  readonly statusCode = 429;
  readonly isOperational = true;

  constructor(message = 'Limite de requisições excedido', context?: Record<string, unknown>) {
    super(message, context);
  }
}

export class ExternalServiceError extends AppError {
  readonly statusCode = 502;
  readonly isOperational = true;

  constructor(message = 'Erro no serviço externo', context?: Record<string, unknown>) {
    super(message, context);
  }
}

export class UnauthorizedError extends AppError {
  readonly statusCode = 401;
  readonly isOperational = true;

  constructor(message = 'Não autorizado', context?: Record<string, unknown>) {
    super(message, context);
  }
}
