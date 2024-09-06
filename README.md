# Arte-UI 组件库
Arte-UI 是一个基于 Vite 的 React 组件库，旨在提供一系列常用组件，以便快速构建用户项目。此项目使用 TypeScript 和 SCSS 开发，支持按需加载，减少构建体积。
## 项目特点
- 基于 Vite 开发：利用 Vite 的快速构建和热更新能力，提升开发效率。
- 使用 pnpm 管理依赖：采用 pnpm 作为包管理工具，支持 monorepo 架构，将项目拆分为多个互相依赖的子包。
- 组件开发：支持复杂组件的开发，如表单组件（使用 useReducer 实现元素交互）、上传组件（使用 Axios 实现上传功能并支持拖动上传）。
- 单元测试：使用 React Testing Library 进行单元测试，测试交互事件和网络请求事件，确保组件的可靠性。
- CI/CD 流水线：使用 GitHub Actions 构建 CI/CD 流水线，实现持续集成与持续部署，简化开发流程。
- 脚手架支持：提供项目脚手架，用户可以快速拉取模板进行二次开发。
## 组件功能
- Button 组件: 按钮组件。
- Form 组件：支持实时获取用户输入数据，具备表单验证功能。
- Upload 组件：支持文件上传，包括拖动上传和上传进度显示。
- ...
## 使用说明
### 安装
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

### 构建项目
```bash
pnpm build
```

## 贡献
欢迎任何形式的贡献！如果您发现了 bug 或有新的想法，请提交 Issue 或直接发邮件至 artemisjie@formax.com。
