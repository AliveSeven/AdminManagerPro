# 工程简介

前后端分离的管理系统，纯手写，采用的技术栈基本都是新的，前端在master分支，后端在spring-dev分支

前端链接：https://github.com/AliveSeven/AdminManagerPro

后端链接：https://github.com/AliveSeven/AdminManagerPro/tree/spring-dev

## 技术栈

**前端：** Vue3.2全家桶 + Vite + TypeScript + Pinia + Element-Plus + Echarts + Less

**后端：** SpringBoot2 + Mybatis-Plus + Hutool + Redis + JWT + MySql

## 实现功能

- 登录注册
- 基于RBAC的权限模型（可分配角色和菜单权限）
- 单表增删改查（包括分页模糊查询）
- 文件上传
- 导入导出
- 树形表格（树形菜单管理分配使用）
- JWT权限
- 整合Echarts图表
- 集成富文本、Markdown
- 待办事项，项目管理
- 加入收藏夹，个人动态
- 集成Redis缓存
- 等等

## 说明

如果你觉得本项目对你有帮助的话，请点个 Star 支持一下吧，谢谢你哦

在学习该项目的过程中，如果你遇到任何问题都可以联系我。

> 注：本项目仅供学习交流使用，未经作者同意，禁止转载或作其他用途

# 运行事项

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```
