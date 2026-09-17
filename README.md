# Life Places · 个人地点日记

基于 Next.js App Router 的个人生活打卡站（灵感来自 pengzhe.ng 的呈现方式，**不是**对方的身份克隆）。  
本仓库占位身份为「阿禾」，可随时在内容文件中改成你自己的名字与简介。

后续可推送到：`https://github.com/zedd18225055550-dotcom/hhh`

## 技术栈

- Next.js 15（App Router）
- TypeScript
- Tailwind CSS v4
- 主题 / 语言偏好：`localStorage`（客户端）

## 本地运行

```bash
cd hhh-life-site   # 或本仓库根目录
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

生产构建：

```bash
npm run build
npm start
```

## 路由

| 路径 | 说明 |
|------|------|
| `/` | 首页：头图、简介、上次出现、作品、社交链接 |
| `/places` | 横向滚动地点时间线 |
| `/api/check-in` | 打卡 Webhook 脚手架（v2，目前为 stub） |

## 如何编辑内容

所有文案与数据都在 `src/content/`：

| 文件 | 用途 |
|------|------|
| `profile.ts` | 姓名、简介、头图路径 |
| `works.ts` | 「作品」列表 |
| `socials.ts` | X / 领英 / Instagram / 邮件 |
| `places.ts` | 地点时间线条目（按时间**新→旧**排序） |
| `i18n.ts` | 界面固定文案（淺色/深色、返回等） |
| `types.ts` | 类型定义（含 `CheckInPayload`） |

中英文字段统一使用 `{ zh: "...", en: "..." }`。

### 新增一条地点

1. 在 `public/places/` 放入图片（可用 SVG / PNG / WebP；仓库已有粘土风 SVG 占位）。
2. 在 `src/content/places.ts` **数组最前面**插入一项：

```ts
{
  id: "2026-09-20-somewhere",
  date: "2026-09-20",
  title: { zh: "某地", en: "Somewhere" },
  companions: [{ zh: "朋友", en: "Friend" }],
  image: "/places/your-image.svg",
  // nightImage: "/places/your-image-night.svg", // 可选，预留给未来
},
```

3. 保存后刷新；首页的「上次出现在」会自动取数组第一条（最新）。

## 主题与语言

- **默认深色**；左下角药丸按钮切换 淺色 / 深色，写入 `localStorage` 键 `hhh-theme`。
- 右下角切换 English / 中文，键为 `hhh-locale`。
- 仅主题与语言相关组件为 Client Component；内容数据本身为静态模块。

## Webhook（v2 脚手架）

环境变量：

```bash
CHECK_IN_WEBHOOK_SECRET=your-long-random-secret
```

可参考仓库根目录 `.env.example`。

- `GET /api/check-in`：查看接口说明
- `POST /api/check-in`：校验 `x-check-in-secret` 头或 body 中的 `secret`，校验通过后返回 JSON

**当前不会写入磁盘。** Serverless / 只读部署上不适合直接改文件；生产环境建议用 Git（自动开 PR / 提交更新 `places.ts`）或外部存储。本 stub 只做鉴权与 payload 回显，避免半残自动化。

示例：

```bash
curl -X POST http://localhost:3000/api/check-in \
  -H "Content-Type: application/json" \
  -H "x-check-in-secret: your-long-random-secret" \
  -d '{"date":"2026-09-20","title":{"zh":"新地点","en":"New place"},"companions":[{"zh":"阿禾","en":"He"}]}'
```

## 图片说明

`public/places/` 下的 SVG 为本地生成的粘土微缩风占位图，**未外链**任何第三方站点图片。可直接替换为真实照片，保持路径一致即可。

## 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发服务器 |
| `npm run build` | 生产构建 |
| `npm start` | 启动生产服务 |
| `npm run lint` | ESLint |

## 许可证

私人项目；占位内容可随意替换。
