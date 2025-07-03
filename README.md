# 团队毕业夏日项目 商业评估AI

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)

通过结构化的问卷和智能分析，为企业提供数据驱动的商业洞察和成长建议。

## ✨ 主要功能

### 🎯 商业评估系统
- **7步评估流程**：从服务提供到成功工具箱的完整评估
- **智能进度跟踪**：实时保存评估进度，支持断点续评
- **数据验证**：确保每个步骤的完整性和准确性
- **个性化报告**：基于评估结果生成定制化商业建议

### 👥 用户管理系统
- **用户注册/登录**：安全的身份验证系统
- **会话管理**：基于 token 的安全会话控制
- **用户档案**：完整的用户信息管理
- **权限控制**：管理员和普通用户权限分离

### 📊 数据仪表板
- **商业指标展示**：关键业务数据的可视化展示
- **评估结果分析**：详细的评估报告和趋势分析
- **用户统计**：用户活跃度和注册数据统计
- **实时更新**：动态数据更新和实时反馈

### 🎨 现代化界面
- **响应式设计**：完美适配桌面和移动设备
- **深色/浅色主题**：支持主题切换，提升用户体验
- **无障碍设计**：符合 WCAG 标准的可访问性设计
- **流畅动画**：优雅的交互动画和过渡效果

## 🛠️ 技术栈

### 前端框架
- **[Next.js 15](https://nextjs.org/)** - React 全栈框架
- **[React 19](https://reactjs.org/)** - 用户界面库
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的 JavaScript

### UI 组件库
- **[Radix UI](https://www.radix-ui.com/)** - 无样式的可访问组件
- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[Lucide React](https://lucide.dev/)** - 现代化图标库
- **[next-themes](https://github.com/pacocoursey/next-themes)** - 主题切换功能

### 表单和验证
- **[React Hook Form](https://react-hook-form.com/)** - 高性能表单库
- **[Zod](https://zod.dev/)** - TypeScript 优先的数据验证
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - 表单验证解析器

### 数据可视化
- **[Recharts](https://recharts.org/)** - 基于 React 的图表库
- **[date-fns](https://date-fns.org/)** - 现代 JavaScript 日期工具库

### 通知和反馈
- **[Sonner](https://sonner.emilkowal.ski/)** - 优雅的 toast 通知组件

## 📁 项目结构

```
next-theme-setup/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   │   └── auth/          # 认证相关 API
│   ├── assessment/        # 评估页面
│   ├── dashboard/         # 仪表板页面
│   ├── admin/             # 管理员页面
│   └── users/             # 用户管理页面
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件
│   ├── assessment-flow.tsx
│   ├── login-form.tsx
│   └── business-dashboard.tsx
├── contexts/             # React Context
│   └── assessment-context.tsx
├── lib/                  # 工具库
│   ├── auth.ts          # 认证服务
│   ├── db.ts            # 数据库操作
│   └── utils.ts         # 工具函数
├── hooks/               # 自定义 Hooks
├── public/              # 静态资源
└── styles/              # 样式文件
```

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 pnpm 包管理器

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd next-theme-setup
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或使用 pnpm
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   # 或使用 pnpm
   pnpm dev
   ```

4. **打开浏览器**
   访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📖 使用指南

### 1. 用户注册和登录
- 访问首页，选择"Create an account"进行注册
- 填写个人信息，包括姓名、邮箱和密码
- 注册成功后，使用邮箱和密码登录

### 2. 开始评估
- 登录后自动跳转到评估页面
- 按照7个步骤完成商业评估
- 每个步骤都有详细的问题和选项
- 可以随时保存进度，稍后继续

### 3. 查看结果
- 完成所有评估步骤后，系统会生成分析报告
- 在仪表板中查看详细的评估结果
- 获取个性化的商业建议和成长策略

### 4. 管理功能
- 管理员可以查看所有用户数据
- 管理用户账户和权限
- 查看系统统计信息

## 🔧 开发指南

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 进行代码格式化

### 组件开发
- 所有组件都使用 TypeScript
- 遵循 React Hooks 最佳实践
- 使用 Tailwind CSS 进行样式设计

### 状态管理
- 使用 React Context 进行全局状态管理
- 本地状态使用 useState 和 useReducer
- 数据持久化使用 localStorage

## 🧪 测试

```bash
# 运行测试
npm test

# 运行类型检查
npm run type-check

# 运行代码检查
npm run lint
```

## 📦 部署

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署

### 其他平台
项目支持部署到任何支持 Node.js 的平台：
- Netlify
- Railway
- Heroku
- 自托管服务器

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request
