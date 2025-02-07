# Wenxin Bot

[English](./README_en-US.md) | 简体中文

⚠️ **重要提示**：本机器人需要先安装 [NapCatQQ](https://github.com/NapNeko/NapCatQQ)。请确保在进行以下设置之前已经完成 NapCatQQ 的安装。

一个基于 [NapCatQQ](https://github.com/NapNeko/NapCatQQ) 和 [node-napcat-ts](https://github.com/huankong-team/node-napcat-ts) 的 QQ 群聊机器人，支持多个 AI 模型的对话。

## 功能特性

- 多模型支持：集成星火认知、DeepSeek 等多个 AI 模型
- 动态切换：随时切换不同的 AI 模型
- 提示词定制：支持为每个模型设置独立的系统提示词
- 简单易用：直观的命令系统，快速上手

### 前置条件
在使用 NapCat Bot 之前，你需要先安装 [NapCatQQ](https://github.com/NapNeko/NapCatQQ)。请按照 NapCatQQ 仓库中的安装说明进行操作。

## 快速开始

### 1. 安装
```bash
# 克隆项目
git clone https://github.com/wenxin1114/wenxin-bot.git
cd wenxin-bot

# 安装依赖
pnpm install
```

### 2. 配置
```bash
# 复制配置文件
cp .env.example .env
```

编辑 `.env` 文件，填入以下配置：
```env
# 星火认知 API 密钥
SPARK_API_KEY=YOUR_SPARK_API_KEY

# DeepSeek API 密钥
DEEPSEEK_API_KEY=YOUR_DEEPSEEK_API_KEY

# NapCat 机器人访问令牌
NAPCAT_ACCESS_TOKEN=YOUR_NAPCAT_ACCESS_TOKEN
```

### 3. 运行
```bash
node main.js
```

## 使用指南

### 基础命令
- `/菜单` - 显示所有可用命令
- `/模型` - 查看当前模型状态
- `/切换` - 快速切换AI模型
- `/提示词 <内容>` - 设置系统提示词
- `/问 <内容>` - 向当前模型提问
- `/图问 <内容>` - 以图片方式显示AI回答

### 模型管理
```
# 查看模型状态
/模型                    # 查看当前模型状态和可用模型列表

# 切换模型
/切换 spark            # 切换到 spark 模型
/切换 deepSeek        # 切换到 deepSeek 模型

# 设置系统提示词
/提示词 你好           # 设置当前模型的系统提示词

# 支持的模型
- spark (讯飞星火认知大模型)
- deepSeek (DeepSeek AI)
```

注意：使用 `/模型` 命令设置系统提示词时必须同时指定模型名称和提示词。如果只想切换模型，请使用 `/切换` 命令。

### 示例对话
```
User: /模型
Bot: [图片] 当前模型: spark
     系统提示词: 你是一个知识渊博的群友...

User: /切换 deepSeek
Bot: [图片] 切换成功
     当前模型: deepSeek

User: /图问 写一个冒泡排序
Bot: [图片]
     冒泡排序的实现:
     ```javascript
     function bubbleSort(arr) {
       // ... 代码实现 ...
     }
     ```
```

## 项目结构
```
wenxin-bot/
├── main.js              # 入口文件
├── config.js            # 配置管理
├── utils/
│   ├── ModelManager.js  # 模型管理器
│   └── CommandHandler.js# 命令处理器
├── .env                 # 环境配置（需自行创建）
└── .env.example         # 环境配置示例
```

## 支持的模型

| 模型名称 | 描述 | 配置项 |
|---------|------|--------|
| spark | 讯飞星火认知大模型 | SPARK_API_KEY |
| deepSeek | DeepSeek AI | DEEPSEEK_API_KEY |

## 依赖项

- `node-napcat-ts`: QQ 机器人框架
- `openai`: DeepSeek API 客户端
- `dotenv`: 环境变量管理
- `ws`: WebSocket 客户端

## 开发计划

- [ ] 支持更多 AI 模型
- [ ] 添加对话历史记录
- [ ] 支持多轮对话
- [ ] 添加权限管理系统

## 贡献指南

1. Fork 本项目
2. 创建新分支 `git checkout -b feature/amazing-feature`
3. 提交更改 `git commit -m 'Add amazing feature'`
4. 推送到分支 `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](../LICENSE) 文件了解详情

## 作者

Wenxin - [@wenxin1114](https://github.com/wenxin1114)

## 致谢

本项目基于以下开源项目开发：

- [NapCatQQ](https://github.com/NapNeko/NapCatQQ) - 现代化的基于 NTQQ 的 Bot 协议端实现
- [node-napcat-ts](https://github.com/huankong-team/node-napcat-ts) - NapCat 的 Node.js SDK
- [讯飞星火认知大模型](https://xinghuo.xfyun.cn/)
- [DeepSeek AI](https://deepseek.com/)

特别感谢 [NapNeko](https://github.com/NapNeko) 团队和 [huankong-team](https://github.com/huankong-team) 的开源贡献。 