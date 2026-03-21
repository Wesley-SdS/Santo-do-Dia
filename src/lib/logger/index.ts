import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  transport: isProduction ? undefined : { target: 'pino-pretty', options: { colorize: true } },
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    service: 'santododia',
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
  },
});

export type Logger = pino.Logger;

export function createChildLogger(context: Record<string, unknown>): Logger {
  return logger.child(context);
}
