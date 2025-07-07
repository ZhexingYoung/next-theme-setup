# 团队毕业夏日项目 商业评估AI

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688)](https://fastapi.tiangolo.com/)

通过结构化的问卷和智能分析，为企业提供数据驱动的商业洞察和成长建议。集成AI大语言模型，提供个性化的商业咨询和战略建议。

## ✨ 主要功能

### 🎯 智能商业评估系统
- **7步评估流程**：从服务提供到成功工具箱的完整评估
  - 服务提供 (Service Offering)
  - 成功基础 (Base Camp for Success)
  - 追踪进展 (Tracking the Climb)
  - 扩展要点 (Scaling Essentials)
  - 精简攀登 (Streamlining the Climb)
  - 团队组建 (Assembling the Team)
  - 成功工具箱 (Toolbox for Success)
- **智能进度跟踪**：实时保存评估进度，支持断点续评
- **数据验证**：确保每个步骤的完整性和准确性
- **AI驱动分析**：基于评估结果生成个性化商业建议

### 🤖 AI智能咨询
- **大语言模型集成**：连接后端AI服务，提供深度商业分析
- **个性化建议**：基于评估数据生成定制化商业策略
- **实时咨询**：即时获取AI生成的商业洞察和建议
- **建议缓存**：智能缓存AI建议，提升用户体验

### 👥 用户管理系统
- **用户注册/登录**：安全的身份验证系统
- **会话管理**：基于 token 的安全会话控制
- **用户档案**：完整的用户信息管理
- **权限控制**：管理员和普通用户权限分离
- **数据导出**：支持用户评估数据的JSON格式导出

### 📊 数据仪表板
- **商业指标展示**：关键业务数据的可视化展示
- **评估结果分析**：详细的评估报告和趋势分析
- **用户统计**：用户活跃度和注册数据统计
- **实时更新**：动态数据更新和实时反馈
- **AI建议展示**：突出显示AI生成的商业建议

### 🎨 现代化界面
- **响应式设计**：完美适配桌面和移动设备
- **深色/浅色主题**：支持主题切换，提升用户体验
- **无障碍设计**：符合 WCAG 标准的可访问性设计
- **流畅动画**：优雅的交互动画和过渡效果
- **加载状态**：完善的加载和错误状态处理

## 🛠️ 技术栈

### 前端框架
- **[Next.js 15](https://nextjs.org/)** - React 全栈框架，App Router
- **[React 19](https://reactjs.org/)** - 用户界面库
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的 JavaScript

### UI 组件库
- **[Radix UI](https://www.radix-ui.com/)** - 无样式的可访问组件
- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[Lucide React](https://lucide.dev/)** - 现代化图标库
- **[next-themes](https://github.com/pacocoursey/next-themes)** - 主题切换功能
- **[Sonner](https://sonner.emilkowal.ski/)** - 优雅的 toast 通知组件

### 表单和验证
- **[React Hook Form](https://react-hook-form.com/)** - 高性能表单库
- **[Zod](https://zod.dev/)** - TypeScript 优先的数据验证
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - 表单验证解析器

### 数据管理
- **[Prisma](https://www.prisma.io/)** - 现代数据库 ORM
- **localStorage** - 客户端数据缓存
- **JSON 数据存储** - 用户评估数据本地存储

### 后端集成
- **[FastAPI](https://fastapi.tiangolo.com/)** - 高性能Python Web框架
- **RESTful API** - 标准化的API接口
- **AI/LLM集成** - 大语言模型服务

## 📁 项目结构

```
next-theme-setup/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   │   └── llm-advice/    # AI建议接口
│   ├── assessment/        # 评估页面
│   ├── dashboard/         # 仪表板页面
│   └── admin/             # 管理员页面
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件库
│   ├── assessment-flow.tsx      # 评估流程组件
│   ├── assessment-sidebar.tsx   # 评估侧边栏
│   ├── business-dashboard.tsx   # 商业仪表板
│   ├── login-form.tsx          # 登录表单
│   ├── register-form.tsx       # 注册表单
│   ├── question-card.tsx       # 问题卡片
│   ├── theme-switcher.tsx      # 主题切换器
│   ├── theme-toggle.tsx        # 主题切换按钮
│   ├── theme-provider.tsx      # 主题提供者
│   ├── toaster.tsx             # Toast 通知组件
│   ├── terms-modal.tsx         # 条款模态框
│   ├── country-selector.tsx    # 国家选择器
│   ├── service-offering-questions.tsx    # 服务提供问卷
│   ├── base-camp-questions.tsx          # 成功基础问卷
│   ├── tracking-climb-questions.tsx     # 追踪进展问卷
│   ├── scaling-essentials-questions.tsx # 扩展要点问卷
│   ├── streamlining-climb-questions.tsx # 精简攀登问卷
│   ├── assembling-team-questions.tsx    # 团队组建问卷
│   └── toolbox-success-questions.tsx    # 成功工具箱问卷
├── contexts/             # React Context
│   └── assessment-context.tsx  # 评估上下文
├── lib/                  # 工具库
│   ├── auth.ts          # 认证服务
│   ├── utils.ts         # 工具函数
│   ├── score-calculator.ts     # 分数计算器
│   └── pillar-advice.json     # 支柱建议数据
├── hooks/               # 自定义 Hooks
│   └── use-toast.ts     # Toast 通知
├── data/                # 数据文件
│   └── scores/          # 分数数据
├── public/              # 静态资源
│   └── images/          # 图片资源
├── styles/              # 样式文件
├── user-exports/        # 用户数据导出
├── main.py              # Python 后端服务
├── test-json-format.html    # JSON格式测试页面
├── test-backend.html        # 后端测试页面
├── test-api.html            # API测试页面
└── BACKEND_INTEGRATION.md   # 后端集成文档
```

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- Python 3.8+ (用于后端AI服务)
- npm 或 pnpm 包管理器

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd next-theme-setup
   ```

2. **安装前端依赖**
   ```bash
   npm install
   # 或使用 pnpm
   pnpm install
   ```

3. **启动前端开发服务器**
   ```bash
   npm run dev
   # 或使用 pnpm
   pnpm dev
   ```

4. **启动后端AI服务** (可选)
   ```bash
   # 安装 Python 依赖
   pip install fastapi uvicorn
   
   # 启动后端服务
   python main.py
   ```

5. **打开浏览器**
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
- 支持访客模式快速体验

### 2. 开始智能评估
- 登录后自动跳转到评估页面
- 按照7个步骤完成商业评估：
  1. **服务提供** - 定义您的核心服务
  2. **成功基础** - 建立业务基础
  3. **追踪进展** - 监控业务指标
  4. **扩展要点** - 识别增长机会
  5. **精简攀登** - 优化业务流程
  6. **团队组建** - 构建高效团队
  7. **成功工具箱** - 完善业务工具
- 每个步骤都有详细的问题和选项
- 可以随时保存进度，稍后继续

### 3. 获取AI建议
- 完成所有评估步骤后，系统会生成分析报告
- 自动发送评估数据到后端AI服务
- 获取个性化的商业建议和成长策略
- AI建议会显示在仪表板的突出位置

### 4. 查看结果和管理
- 在仪表板中查看详细的评估结果
- 导出个人评估数据为JSON格式
- 管理员可以查看所有用户数据
- 管理用户账户和权限

## 🔧 开发指南

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 进行代码格式化
- 组件采用函数式编程风格

### 组件开发
- 所有组件都使用 TypeScript
- 遵循 React Hooks 最佳实践
- 使用 Tailwind CSS 进行样式设计
- 组件采用模块化设计

### 状态管理
- 使用 React Context 进行全局状态管理
- 本地状态使用 useState 和 useReducer
- 数据持久化使用 localStorage
- 评估进度实时保存

### 数据格式

#### 评估JSON格式
```json
{
  "user_id": "user@example.com",
  "assessment_date": "2024-01-01T00:00:00Z",
  "sections": {
    "service_offering": {
      "R1": {"answer": "A", "anwserselete": "A"},
      "R2": {"answer": "B", "anwserselete": "B"}
    },
    "base_camp_for_success": {
      "GTM1": {"answer": "A", "anwserselete": "A"},
      "GTM2": {"answer": "B", "anwserselete": "B"}
    }
  }
}
```

#### AI建议格式
```json
{
  "advice": "基于您的评估结果，我们建议...",
  "priority_areas": ["市场定位", "团队建设"],
  "next_steps": ["制定详细计划", "开始执行"]
}
```

## 🧪 测试

```bash
# 运行测试
npm test

# 运行类型检查
npm run type-check

# 运行代码检查
npm run lint

# 测试JSON生成
# 访问 http://localhost:3000/test-json-format.html

# 测试后端API
# 访问 http://localhost:3000/test-backend.html

# 测试API连接
# 访问 http://localhost:3000/test-api.html
```

## 📦 部署

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署

### 后端部署
```bash
# 使用 uvicorn 部署 FastAPI
uvicorn main:app --host 0.0.0.0 --port 8000

# 或使用 Docker
docker build -t business-assessment-api .
docker run -p 8000:8000 business-assessment-api
```

### 其他平台
项目支持部署到任何支持 Node.js 的平台：
- Netlify
- Railway
- Heroku
- 自托管服务器

## 🔗 API 集成

### 后端API规范
- **基础URL**: `http://localhost:8000`
- **AI建议接口**: `POST /api/llm-advice`
- **数据格式**: JSON

### 集成文档
详细的后端集成文档请参考 `BACKEND_INTEGRATION.md`

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 开发环境设置
```bash
# 克隆项目
git clone <repository-url>
cd next-theme-setup

# 安装依赖
npm install

# 设置开发环境
npm run dev
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

如有问题或建议，请通过以下方式联系：
- 项目 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 邮箱: your-email@example.com

---

**团队毕业夏日项目** - 用AI驱动商业成功 🚀
