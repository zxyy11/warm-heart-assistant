# 暖心小助手 - 部署指南

## 🚀 一键部署到 Render

### 步骤：

1. **访问 Render 网站**：
   - 打开 https://render.com/
   - 使用 GitHub 账号登录

2. **创建新服务**：
   - 点击 "New +" → "Web Service"
   - 选择 "Build and deploy from a Git repository"
   - 粘贴你的 GitHub 仓库地址

3. **配置服务**：
   - Name: `warm-heart-assistant`
   - Region: 选择离你近的地区（如 Asia Pacific）
   - Branch: `main`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **设置环境变量**：
   - 点击 "Advanced" → "Add Environment Variable"
   - 添加 `PORT`: `10000`

5. **部署**：
   - 点击 "Create Web Service"
   - 等待部署完成（约 2-3 分钟）

6. **访问应用**：
   - 部署成功后，你会得到一个网址，类似：`https://warm-heart-assistant-abc123.onrender.com`
   - 打开这个网址就能使用暖心小助手了！

---

## 📋 本地开发

### 启动开发服务器：

```bash
# 进入后端目录
cd backend

# 安装依赖（首次运行）
npm install

# 启动服务器
npm start
```

### 访问地址：
- 前端页面：http://localhost:3000
- API 健康检查：http://localhost:3000/api/health
- API 聊天接口：http://localhost:3000/api/chat

---

## 📝 配置 API Key

用户首次打开应用时，需要配置 DeepSeek API Key：

1. 点击小助手头像 → 设置
2. 输入你的 DeepSeek API Key
3. 点击保存

**获取 API Key：**
- 访问 https://platform.deepseek.com/
- 注册账号并获取 API Key

---

## 🔧 技术架构

```
┌─────────────────────────────────────┐
│         用户浏览器                   │
│  HTML + CSS + JavaScript            │
│  (手机/电脑/平板都能访问)            │
└────────────────┬────────────────────┘
                 │ HTTP/HTTPS
                 ▼
┌─────────────────────────────────────┐
│      Render Cloud Server            │
│  Node.js + Express                  │
│  ✅ CORS 跨域处理                   │
│  ✅ API 请求转发                    │
│  ✅ 静态文件托管                     │
└────────────────┬────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────┐
│      DeepSeek API                   │
│  (大语言模型服务)                    │
└─────────────────────────────────────┘
```

---

## ⚠️ 注意事项

1. **API Key 安全**：不要把 API Key 写在代码里，让用户在设置中输入
2. **免费额度**：DeepSeek 有免费额度，超出后需要付费
3. **Render 免费限制**：免费服务有流量限制，每月约 750 小时运行时间
4. **语音功能**：语音识别和合成使用浏览器原生 API，完全免费

---

## 📱 使用说明

### 给老年人的使用指南：

1. **打开浏览器**：在手机上打开微信或浏览器
2. **输入网址**：输入部署好的网址
3. **配置一次**：首次使用点击头像 → 设置 → 输入 API Key → 保存
4. **开始使用**：
   - 首页：点击打卡按钮记录日常
   - 小助手：按住说话按钮，松开后小暖会回复
   - 我的日常：查看聊天和打卡记录
5. **紧急呼叫**：长按 SOS 按钮 2 秒触发紧急求助
