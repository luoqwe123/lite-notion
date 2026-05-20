
打开终端，输入一下命令
```
pnpm i 
```


然后分别进入`app/server`   `app/web`,做以下操作
```
# server

pnpm i 

# 在server根目录创建.env文件
DATABASE_URL=""
PLAT_EMAIL=""                          // 邮箱
EMAIL_KEY=""                          // 邮箱授权码，用于给用户发验证码
USER_NAME="user001"                   // 用户注册时设置的用户名
DATABASE_USER="root"
DATABASE_PASSWORD=""
DATABASE_NAME="lite-notion"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
# TOKEN密钥
TOKEN_SECRET = ""



npx prisma migrate dev --name init  // 创建数据库表

npx prisma generate   // 生成prisma 客户端

npx prisma db seed    // 给数据库填充测试数据


# web
pnpm i 

# 在web根目录创建.env文件
NODE_ENV = "development"
VITE_APP_TITLE = "lite-notion"
VITE_BASEURL = 'http://localhost:3000/api/'


```
回到根目录
```
pnpm server:dev  // 服务端

pnpm web:dev     // 客户端

```

