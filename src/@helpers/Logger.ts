export enum LogLevel {
  DEBUG,
  INFO,
  WARNING,
  ERROR,
}

const getLogLevelFromEnv = (): LogLevel => {
  switch (import.meta.env.VITE_LOG_LEVEL) {
    case "DEBUG":
      return LogLevel.DEBUG;
    case "INFO":
      return LogLevel.INFO;
    case "WARNING":
      return LogLevel.WARNING;
    case "ERROR":
      return LogLevel.ERROR;
    default:
      return LogLevel.ERROR;
  }
};

class Logger {
  private static logLevel: LogLevel = getLogLevelFromEnv();

  static debug(message: string) {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${message}`);
    }
  }

  static info(message: string) {
    if (this.logLevel <= LogLevel.INFO) {
      console.log(`[INFO] ${message}`);
    }
  }

  static warn(message: string) {
    if (this.logLevel <= LogLevel.WARNING) {
      console.warn(`[WARNING] ${message}`);
    }
  }

  static error(message: string) {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`);
    }
  }
}

export default Logger;
