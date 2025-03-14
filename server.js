const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');
const cors = require('cors');

const app = express();
const PORT = 4505;

// 启用CORS
app.use(cors());

// 文章目录
const ARTICLES_DIR = path.join(__dirname, 'articles');

// 获取文章列表
app.get('/api/articles', async (req, res) => {
    try {
        const files = await fs.readdir(ARTICLES_DIR);
        const articles = await Promise.all(
            files
                .filter(file => file.endsWith('.md'))
                .map(async file => {
                    const content = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf-8');
                    const lines = content.split('\n');
                    const titleLine = lines.find(line => line.trim().startsWith('#') && line.trim().length > 1);
const rawTitle = file.replace(/^\d{4}-\d{2}-\d{2}-/i, '').replace(/\.md$/, '');
const title = rawTitle;
                    const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})[-_]/i);
const date = dateMatch ? 
    `${dateMatch[0].substring(0,4)}-${dateMatch[0].substring(5,7)}-${dateMatch[0].substring(8,10)}` : 
    new Date().toISOString().split('T')[0]; // 增强日期匹配
                    return {
                        id: encodeURIComponent(file.replace('.md', '')), // URL规范化处理
                        title,
                        date,
                        preview: content.replace(/[^\u4e00-\u9fff]/g, '').substring(0, 200) + '...'
                    };
                })
        );
        res.json(articles);
    } catch (error) {
        console.error('Error reading articles:', error);
        res.status(500).json({ error: '获取文章列表失败' });
    }
});

// 获取单篇文章内容
app.get('/api/articles/:id', async (req, res) => {
    try {
        const filePath = path.join(ARTICLES_DIR, `${req.params.id}.md`);
        const content = await fs.readFile(filePath, 'utf-8');
        const htmlContent = marked.parse(content);
        res.json({ content: htmlContent });
    } catch (error) {
        console.error('Error reading article:', error);
        res.status(500).json({ error: '获取文章内容失败' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});