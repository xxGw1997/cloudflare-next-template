# Cloudflare Next Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 准备工作

1. **环境要求**

   - Node.js >= 20
   - pnpm >= 10

2. **创建一个 Cloudflare 账户**

- 前往[Cloudflare控制台](https://dash.cloudflare.com/)，注册并且登录Cloudflare账户

- 添加账户操作权限

    1、点击右上角账户图标 -> 点击配置文件， 进入个人账户配置页面
    2、个人简介页面点击左侧`API令牌`标签页, 点击`创建令牌`
    3、这里我们可以图方便的话选择`编辑Couldflare Workers`模板,也方便后续进行功能的添加

- 创建成功后会有一个`secret key`,十分重要,只有一次查看机会所以及时妥善保管不可外泄

    拿到`secret key`之后复制，并且将env文件中的`CLOUDFLARE_API_TOKEN`字段替换

> 当然也可以自己创建一个自定义令牌，需要注意的是以下是本项目必选项：
D1(编辑) - 使用cloudflare的d1数据库
Worker R2存储(编辑)  - 使用R2进行静态资源的存储

3. **安装 wrangler**

Wrangler 是 Cloudflare 官方提供的命令行工具，用于开发、测试和部署 Cloudflare 应用。

```bash
pnpm install -g wrangler
```

安装完成之后，使用wrangler登录你的Cloudflare账户
如果你在第二步已经将.env文件中的`CLOUDFLARE_API_TOKEN`字段替换了，则可以不需要登录

```bash
pnpm wrangler login
```

根据提示进行授权,授权完成之后,可以查看当前的账户的信息

```bash
pnpm wrangler whoami
```

信息会列出当前账户名和Account ID以及当前账户Token的权限范围

可以将Account ID复制，并且将.env文件中的`CLOUDFLARE_ACCOUNT_ID`字段替换

4. **创建 d1数据库**
使用wrangler创建一个d1数据库

```bash
pnpm wrangler d1 create your_database_name
```

执行完该命令后，wrangler 会帮你创建一个d1的数据库,下执行以下命令查看

```bash
pnpm wrangler d1 list
```
将d1 list列表中刚刚创建的数据库的uuid复制，并且将wrangler.jsonc中的databse_id替换
以及将.env文件中`DATABASE_NAME`和`DATABASE_ID`字段进行替换

创建完成后，需要
执行`pnpm db:g`，根据schema生成对应数据库迁移文件
执行`pnpm db:ml`根据迁移文件生成本地开发环境的数据库
执行`pnpm db:mr`根据迁移文件生成远程服务端的数据库
执行`pnpm db:sl`本地数据库表结构可视化
执行`pnpm db:sr`远程服务端数据库表结构可视化

执行完成以上的命令后，就已经创建好用户系统的数据库

5. **创建 r2 存储**
创建r2存储有一定的门槛条件,可以在控制台中找到r2的开通条件
r2的用途有两个

1、一个是静态文件(图片，数据...)的存储，每个月10G的限制
并且不限制出入流量，次数限制上对于一个个人小项目完全足够，如果比较大的话5刀/月的额度也足够

2、第二个就是给Nextjs ISR增量生成页面提供缓存，这个是Nextjs功能
```bash
# 创建Nextjs ISR增量生成页面存储桶，该桶可以让你的所有部署在Cloudflare的Nextjs共用一个
# binding 值必须要是 `NEXT_INC_CACHE_R2_BUCKET`,部署时，Opennext会自动去找到这个桶
pnpm wrangler r2 bucket create open-next-cache-template
# 创建项目的静态文件的存储桶，也可以所有项目公用同一个桶，后续文件划分用路径/template进行隔离
pnpm wrangler r2 bucket create template-bucket
```

6. **第三方鉴权信息配置**
首先在本地生成一个随机的secret并且将`AUTH_SECRET`字段替换

本项目模板使用`next-auth`进行账户鉴权的配置,用户相关数据表结构也是由`next-auth`进行定义
以最普遍的Google、Github以及Resend邮箱为例
只需要将项目中各第三方平台的`clientId`和`secret`替换掉.env文件中的值即可
后续需要新增其他的第三方鉴权集成，只需要到/src/lib/auth.ts 文件中进行配置即可

## Develop

Run the Next.js development server:

```bash
npm run dev
# or similar package manager command
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Preview

Preview the application locally on the Cloudflare runtime:

```bash
npm run preview
# or similar package manager command
```

## Deploy

Deploy the application to Cloudflare:

```bash
npm run deploy
# or similar package manager command
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
