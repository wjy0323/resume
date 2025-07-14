# 吴嘉茵个人简历网站

## 项目简介

这是一个现代化的个人简历网站，展示了吴嘉茵（Jiayin）作为AI产品经理的专业背景和技能。网站采用响应式设计，具有现代化的UI/UX体验。

## 技术栈

- **前端**: HTML5, CSS3, JavaScript
- **设计**: 现代化UI设计，响应式布局
- **动画**: CSS动画和JavaScript交互
- **部署**: Vercel + 自定义域名

## 功能特性

- 🎨 现代化设计风格
- 📱 完全响应式布局
- ✨ 丰富的动画效果
- 🚀 快速加载
- 🎯 优化的用户体验
- 📊 技能展示轨道动画
- 💼 项目经验展示
- 🌐 自定义域名支持

## 项目结构

```
/
├── index.html                    # 主页面
├── vercel.json                   # Vercel部署配置
├── README.md                     # 项目说明
└── assets/
    ├── styles.css                # 样式文件
    ├── script.js                 # JavaScript文件
    ├── icon.jpg                  # 头像图片
    ├── internship.html           # 实习经历页面
    ├── SVG/                      # SVG图标文件夹
    └── 吴嘉茵-有产品经理经验-26届大三-可连续实习12个月.pdf  # 简历PDF
```

## 部署指南

### Vercel部署步骤

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **配置自定义域名**
   - 在Vercel控制台中添加域名 `jiayin.xin`
   - 配置DNS记录（见下方DNS配置说明）

### DNS配置（阿里云）

在阿里云DNS控制台中添加以下记录：

| 类型 | 主机记录 | 记录值 |
|------|----------|--------|
| CNAME | @ | cname.vercel-dns.com |
| CNAME | www | cname.vercel-dns.com |

### 自动部署

项目已配置为与GitHub仓库自动同步，每次推送到main分支都会自动触发Vercel部署。

## 访问地址

- **主域名**: https://jiayin.xin
- **GitHub仓库**: https://github.com/wjy0323/resume.git

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 联系方式

- 邮箱: 18075926434@163.com
- GitHub: [wjy0323](https://github.com/wjy0323)

## 许可证

MIT License 