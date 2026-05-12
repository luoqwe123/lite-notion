import log from "log4js";
import path from "path";
function getCommonAppender(pathSeg:string) {
    return {
        // 定义一个sql日志出口
        type: "dateFile",
        filename: path.resolve(__dirname, "../../logs", `${pathSeg}`, "logging.log"),
        maxLogSize: 300 * 1024,  // 配置文件的最大字节数
        keepFileExt: true, //保留文件格式
        daysTokeep: 1, // 保留几天内的日志
        layout: {
            type: "pattern",
            pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n"
        }
    }
}
log.configure({
    appenders: {
        sql: getCommonAppender("sql"),
        default: {
            type: "stdout",
            // filename:path.resolve(__dirname,"logs","sql","logging.log"),
        },
        api: getCommonAppender("api"),
        email:getCommonAppender("email")
    },
    categories: {
        sql: {
            appenders: ["sql"], // 该分类使用出口sql的配置写入日志
            level: "all",
        },
        default: {
            appenders: ["default"],
            level: "all"
        },
        api: {
            appenders: ["api"],
            level: "all"
        },
        email: {
            appenders: ["email"],
            level: "all"
        }
    }
});

process.on("exit", () => {
    log.shutdown();
})
export const emailLog = log.getLogger("email");
const sqlLog = log.getLogger("sql");
const defaultLog = log.getLogger("default");
const apiLog = log.getLogger("api");
// sqlLog.level = "all";

