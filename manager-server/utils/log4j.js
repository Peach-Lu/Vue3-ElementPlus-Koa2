/**
 * 日志存储
 * @author Peach 
 */
const log4js = require('log4js')
const levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL,
}
log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    info: {
      type: 'file',
      filename: 'logs/all-logs.log'
    },
    error: {
      type: 'dateFile',
      filename: 'logs/log',
      pattern: 'yyyy-MM-DD.log',
      alwaysIncludePattern: true //设置文件名称为filename + pattern
    }
  },
  categories: {
    default: { appenders: ['console'], level: "debug" },
    info: {
      appenders: ['info', 'console'],
      level: 'info'
    },
    error: {
      appenders: ['error', 'console'],
      level: 'error'
    }
  }
})
/**
 * 日志输出 level为debug
 * @param {*} content 
 */
exports.debug = (content) => {
  let logger = log4js.getLogger()
  logger.debug(content)
}

/**
 * 日志输出 error
 * @param {*} content 
 */
exports.error = (content) => {
  let logger = log4js.getLogger('error')
  logger.error(content)
}

/**
 * 日志输出 info
 * @param {*} content 
 */
exports.info = (content) => {
  let logger = log4js.getLogger('info')
  logger.info(content)
}