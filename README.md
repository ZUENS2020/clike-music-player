# clike-music-player

## 项目简介

`clike-music-player` 是一个受 musicforprogramming.net 启发的轻量级桌面音乐播放器（基于 Electron）。该项目演示了如何使用简单的前端与 Electron 主/渲染进程搭建一个可运行的本地音乐播放器。

## 功能

- 播放本地或通过 RSS/URL 获取的音频流（依赖 `rss-parser`）。
- 简洁的界面（HTML/CSS/JS），主进程与渲染进程分离。
- 支持在本地以开发模式运行并封装为桌面应用。

## 快速开始（开发运行）

1. 安装 Node.js（建议 v18+）并确认已安装 `npm`。
2. 克隆仓库并进入项目目录。
3. 安装依赖：

```
npm install
```

4. 启动应用（开发模式）：

```
npm start
```

应用会使用 `electron .` 启动主进程，打开桌面窗口并加载 `index.html`。

## 目录结构（简要）

- `main.js`：Electron 主进程入口。
- `preload.js`：预加载脚本，负责在主/渲染进程之间安全地暴露接口。
- `renderer.js`：渲染进程脚本，控制 UI 行为。
- `index.html` / `assets/style.css`：界面文件与样式。

## 部署与打包

详细的打包与发布步骤见仓库根目录的部署说明文件： [DEPLOY.md](DEPLOY.md)

## 贡献

欢迎提交 Issue 与 Pull Request。贡献前请先描述你的改动意图并确保功能在开发模式下可运行。

## 许可证

本项目遵循仓库根目录下的 `LICENSE` 文件中的许可条款。
