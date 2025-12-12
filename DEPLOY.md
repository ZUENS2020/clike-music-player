# 部署与打包指南

此文档说明如何在本地运行该 Electron 应用，以及如何将其打包为 Windows 可执行程序以便分发。

## 前置要求

- Node.js（推荐 v18+）和 npm 已安装并在 `PATH` 可用。
- Git（可选，用于克隆仓库）。

## 本地运行（开发模式）

1. 在项目根目录打开终端。
2. 安装依赖：

```
npm install
```

3. 启动应用：

```
npm start
```

应用会运行 `electron .` 并打开桌面窗口。修改源代码后可直接刷新窗口查看效果。

## 打包为 Windows 可执行（示例）

下面列出了两种常见工具的示例：`electron-packager` 和 `electron-builder`。任选其一。

### 使用 electron-packager（快速生成可执行目录）

1. 安装打包工具（项目本地安装或使用 npx）：

```
npm install --save-dev electron-packager
```

2. 运行打包（示例，生成 x64 Windows 版本）：

```
npx electron-packager . clike-music-player --platform=win32 --arch=x64 --out=dist --overwrite
```

3. 打包完成后，`dist` 目录下会包含生成的可执行程序文件夹，直接将该文件夹分发或压缩发布即可。

### 使用 electron-builder（生成安装程序/安装包）

1. 安装：

```
npm install --save-dev electron-builder
```

2. 在 `package.json` 中添加或确认 `build` 配置与打包脚本。例如：

```
"scripts": {
  "start": "electron .",
  "pack": "electron-builder --dir",
  "dist": "electron-builder"
}
```

3. 运行生成安装包：

```
npm run dist
```

4. 打包完成后，输出文件通常位于 `dist` 目录，包含 `.exe` 安装程序或 `.zip` 文件，视配置而定。

## Windows 特殊注意事项

- 代码签名：若要避免 SmartScreen 警告，请对可执行文件进行代码签名（需要证书）。
- 防病毒误报：首次发布时可能遇到误报，建议上传到 Virustotal 检查并在 README 中说明。

## 常见问题与排查

- 如果运行 `npm start` 报错 "electron: command not found"，请确保已正确安装依赖并使用本地安装的 electron（使用 `npx electron .` 或 `npm start`）。
- 若打包后出现缺失文件或资源，检查 `package.json` 中的 `files`/`build` 配置，以及应用中使用的相对路径是否正确。

## 额外建议

- 在发布前先在干净的 Windows 虚拟机或容器中测试打包好的安装包。
- 若需要自动化持续集成（CI）打包，可使用 GitHub Actions、AppVeyor 等服务，在 CI 环境中调用 `npm ci` + `npm run dist` 来生成发行版。
