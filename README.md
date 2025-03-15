# 老马的小窝

这是一个个人网站项目，使用 HTML、CSS 和 JavaScript 构建。采用现代化的响应式设计，提供流畅的用户体验。

## 项目特点

- 响应式设计，适配各种设备尺寸
- 现代化的UI/UX设计
- 流畅的动画过渡效果
- 优雅的侧边栏导航
- 模块化的代码结构

## 主要功能

- 汉堡菜单动画效果
- Logo动态位移
- 页面内容平滑切换
- 背景图片视差效果
- 自适应布局设计
- RESTful API 接口服务
- Markdown文章动态解析
- 文章列表自动生成机制

## 项目结构

- `index.html`: 网站主页
- `css/`: CSS 样式文件夹
  - `style.css`: 主样式文件
- `js/`: JavaScript 文件夹
  - `main.js`: 主脚本文件
- `images/`: 图片资源文件夹
  - `background001.png`: 顶部背景图
  - `background-menu.png`: 侧边栏背景图
  - `logo.png`: 网站logo
  - `bg_01.jpg`: 主内容区背景图

## 样式特点

### 顶部区域
- 固定定位的logo
- 动态阴影效果
- 响应式标题布局

### 菜单按钮
- 优化的汉堡菜单按钮
  - 平滑的动画过渡
  - 增大的点击区域
  - 优雅的交叉动画

### 侧边栏
- 平滑滑入滑出效果
- 美观的背景设计
- 悬停动画效果
- 响应式布局适配

## 技术文档

### API接口说明
- `GET /api/articles` 获取文章列表
  - 返回格式：JSON数组
  - 字段说明：id, title, date, preview

- `GET /api/articles/:id` 获取单篇文章
  - 参数：文章ID
  - 返回格式：HTML格式的Markdown解析内容

### 文章列表生成机制
1. 自动扫描articles目录下.md文件
2. 解析文件名获取日期（格式：YYYY-MM-DD-标题）
3. 提取文章前200字作为预览
4. 支持中文字符过滤处理

## 开发指南

1. 克隆项目到本地
```bash
git clone https://github.com/你的用户名/machinaWeb.git
cd machinaWeb
npm install
```

2. 启动开发服务器
```bash
node server.js
```

3. 访问接口文档
http://localhost:4505/api/articles

4. 使用返回按钮功能：
- 在任何文章详情页点击"返回列表"按钮
- 自动保持当前分类筛选状态

## 更新日志

### 2025-03-15
- 完成前端界面视觉优化
- 新增Live2D看板娘交互功能

### 2025-02-24
- 优化了菜单按钮动画效果
- 添加了logo移动动画
- 更新了侧边栏背景样式
- 优化了移动端适配

### 2025-03-14
- 新增RESTful API接口文档
- 实现Markdown文章自动解析
- 增加返回列表按钮功能
- 完善开发环境配置说明

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License
