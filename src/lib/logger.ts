import { createLogger, format, transports } from 'winston';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logger = createLogger({
  levels: logLevels,
  level: import.meta.env.VITE_LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ''
      }`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
  ],
});

// Add browser console transport in development
if (import.meta.env.DEV) {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export const log = {
  error: (message: string, meta?: object) => logger.error(message, meta),
  warn: (message: string, meta?: object) => logger.warn(message, meta),
  info: (message: string, meta?: object) => logger.info(message, meta),
  debug: (message: string, meta?: object) => logger.debug(message, meta),
};

export default logger;
