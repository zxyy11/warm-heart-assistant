const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

const SYSTEM_PROMPT = `你是小暖，一个专为老年人设计的贴心助手。你的性格温暖、亲切、耐心。

请遵循以下规则：
1. 称呼用户为"爷爷"（始终称呼用户为爷爷，不要称呼奶奶）
2. 语气要温暖、亲切、耐心
3. 语速慢一点，让老人听得清楚
4. 使用简单常用的词，不要用专业术语
5. 回答自然流畅，像真人聊天一样
6. 重要的事情可以多说一遍
7. 讲故事要丰富有趣，包括多种类型

你可以帮老人做以下事情：
- 叫车出行
- 聊天陪伴
- 讲故事（小动物的故事、七零八零年代的趣事、生活趣事、幽默笑话、新闻趣事）
- 健康知识
- 紧急呼叫家人

讲故事规则：
- 故事类型丰富多样，每次讲不同类型的故事：
  1. 小动物故事：小猫、小狗、小鸟、小松鼠等可爱动物的趣事
  2. 七零八零年代故事：那个年代的生活趣事、上学故事、工作经历
  3. 生活趣事：身边发生的有趣事情、街坊邻居的故事
  4. 幽默笑话：简短有趣的笑话，适合老年人
  5. 新闻趣事：最近发生的有趣新闻事件
  6. 民间传说：简短的民间小故事
- 故事要有情节，有开头有结尾，讲得生动一些
- 语言口语化，像聊天一样自然，不要像朗读课文
- 故事长度适中，大约3-5分钟能讲完
- 每次讲不同的故事，不要重复
- 不要讲过于煽情或感人的故事，保持轻松有趣`;

app.post('/api/chat', async (req, res) => {
    try {
        const { message, apiKey } = req.body;
        
        if (!apiKey) {
            return res.json({
                success: false,
                message: '请先配置 API Key'
            });
        }

        const response = await axios.post(
            'https://api.deepseek.com/v1/chat/completions',
            {
                model: 'deepseek-v4-flash',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                ],
                max_tokens: 300,
                temperature: 0.7
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                timeout: 30000
            }
        );

        if (response.data.choices && response.data.choices[0]) {
            res.json({
                success: true,
                content: response.data.choices[0].message.content
            });
        } else {
            res.json({
                success: false,
                message: 'API响应错误'
            });
        }
    } catch (error) {
        console.error('API Error:', error.message);
        res.json({
            success: false,
            message: 'API调用失败，请稍后重试',
            error: error.message
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: '暖心小助手服务器运行正常'
    });
});

app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon, city } = req.query;
        let url;
        
        if (lat && lon) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=746902354e5bc781f1b58871637a870f&units=metric&lang=zh_cn`;
        } else if (city) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=746902354e5bc781f1b58871637a870f&units=metric&lang=zh_cn`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=Beijing&appid=746902354e5bc781f1b58871637a870f&units=metric&lang=zh_cn`;
        }

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.json({
            success: false,
            message: '获取天气失败'
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 暖心小助手服务器运行在 http://localhost:${PORT}`);
    console.log(`📱 前端页面：http://localhost:${PORT}`);
});
