import puppeteer from 'puppeteer';
import axios from 'axios';

// 定义 API URL
const API_URL = 'https://news.topurl.cn/api';

// 获取每日新闻数据
export async function getDailyNews() {
    try {
        const response = await axios.get(API_URL);
        const data = response.data.data;
        
        if (!data?.newsList?.length) {
            throw new Error('新闻数据为空');
        }

        return {
            news: data.newsList.map(item => ({
                title: item.title,
                category: item.category
            })),
            history: data.historyList.map(item => item.event),
            calendar: data.calendar,
            weather: data.weather
        };

    } catch (error) {
        console.error('获取新闻失败:', error);
        return null;
    }
}

// 获取数据并生成图片
export async function generateImage() {
    try {
        // 调用 API 获取数据
        const response = await axios.get(API_URL);
        const data = response.data.data;

        // 生成 HTML 内容
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>每日新闻</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #eee;
                    }
                    .header h1 {
                        color: #333;
                        margin: 0;
                        font-size: 28px;
                    }
                    .header p {
                        color: #666;
                        margin: 10px 0 0;
                    }
                    .section {
                        margin-bottom: 30px;
                    }
                    .section h2 {
                        font-size: 24px;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    .news-item, .history-item {
                        margin-bottom: 15px;
                    }
                    .news-item a {
                        color: #007BFF;
                        text-decoration: none;
                    }
                    .news-item a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- 标题 -->
                    <div class="header">
                        <h1>今日新闻速览</h1>
                    </div>

                    <!-- 日历信息 -->
                    <div class="section">
                        <h2>日历信息</h2>
                        <p>农历：${data.calendar.yearCn} ${data.calendar.monthCn}${data.calendar.dayCn}</p>
                        <p>公历：${data.calendar.cYear}年${data.calendar.cMonth}月${data.calendar.cDay}日</p>
                        <p>星期：${data.calendar.ncWeek}</p>
                    </div>

                    <!-- 历史事件 -->
                    <div class="section">
                        <h2>历史上的今天</h2>
                        <div id="history-list">
                            ${data.historyList.map(item => `<div class="history-item"><p>${item.event}</p></div>`).join('')}
                        </div>
                    </div>

                    <!-- 新闻列表 -->
                    <div class="section">
                        <h2>新闻列表</h2>
                        <div id="news-list">
                            ${data.newsList.map(item => `<div class="news-item"><a href="${item.url}" target="_blank">${item.title}</a></div>`).join('')}
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // 启动浏览器
        const browser = await puppeteer.launch({
            args: ['--disable-web-security'], // 禁用跨域限制
        });
        const page = await browser.newPage();

        // 设置 HTML 内容
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0', // 等待网络空闲
        });

        // 直接生成 base64
        const base64Image = await page.screenshot({
            fullPage: true,
            type: 'png',
            encoding: 'base64'
        });

        // 关闭浏览器
        await browser.close();

        return base64Image;
    } catch (error) {
        console.error('生成图片时出错：', error);
        return null;
    }
}