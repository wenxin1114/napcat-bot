import dotenv from "dotenv";
dotenv.config();

export const config = {
  currentModel: "spark",
  model: {
    spark: {
      apiKey: process.env.SPARK_API_KEY,
      systemPrompt:
        "你是一个知识渊博的群友，模仿人类的聊天风格，进行聊天，不要长篇大论，回答要精简有效",
    },
    deepSeek: {
      apiKey: process.env.DEEPSEEK_API_KEY,
      systemPrompt:
        "你是一个知识渊博的群友，模仿人类的聊天风格，进行聊天，不要长篇大论，回答要精简有效",
    },
  },
  napcat: {
    protocol: "ws",
    accessToken: process.env.NAPCAT_ACCESS_TOKEN,
    host: process.env.NAPCAT_HOST,
    port: process.env.NAPCAT_PORT,
    throwPromise: true,
    reconnection: {
      enable: true,
      attempts: 10,
      delay: 5000,
    },
  },
};
