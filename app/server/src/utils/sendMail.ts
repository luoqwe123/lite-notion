import nodemailer from "nodemailer";
import "dotenv/config";
import { emailLog } from "./genLog"
// console.log(process.env)


export async function sendMail(targetEmail:string,random:string) {
    try {
        // 创建Nodemailer传输器 SMTP 或者 其他 运输机制
        let transporter = nodemailer.createTransport({
            host: "smtp.163.com", // 第三方邮箱的主机地址
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env["PLAT_EMAIL"], // 发送方邮箱的账号
                pass: process.env["EMAIL_KEY"], // 邮箱授权密码
            },
        });
        // 定义transport对象并发送邮件
        let info = await transporter.sendMail({
            from: `"dazhi 👻" ${process.env["PLAT_EMAIL"]}`, // 发送方邮箱的账号
            to: targetEmail, // 邮箱接受者的账号
            subject: "lite-notion", // Subject line
            // text: "H5-Dooring?", // 文本内容
            html: `<!DOCTYPE html>
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
            <meta charset="UTF-8">
            <title>Lite Notion 邮箱验证码</title>
            </head>
            <body style="margin:0;padding:0;background-color:#F4F4F4;">
            <div style="max-width:600px;margin:0 auto;background-color:#F4F4F4;">
                <div style="background:#000;text-align:center;padding:30px 25px;">
                <div style="font-size:22px;font-weight:bold;color:#fff;font-family:'Microsoft YaHei',Arial,sans-serif;">Lite Notion</div>
                <div style="font-size:13px;color:#ccc;margin-top:5px;">轻量知识库</div>
                </div>
                <div style="background:#fff;padding:30px 20px;text-align:center;">
                <div style="font-size:16px;color:#333;">您好，感谢使用 Lite Notion</div>
                <div style="font-size:24px;font-weight:bold;color:#000;margin:20px 0;">验证码：${random}</div>
                <div style="font-size:12px;color:#666;line-height:1.6;">验证码 5 分钟内有效<br>如果你没有发起注册，请忽略本邮件</div>
                </div>
                <div style="text-align:center;padding:20px;font-size:12px;color:#999;">Lite Notion © 2025 轻量知识库平台</div>
            </div>
            </body>
            </html>`, // html 内容, 如果设置了html内容, 将忽略text内容
        });
       
    } catch (error) {
        emailLog.debug(`${targetEmail} ${error}`)
    }

}
// sendMail("qwe18173945756@163.com","3242342")

