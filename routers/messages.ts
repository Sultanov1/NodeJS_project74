import express from 'express';
import { promises as fs } from 'fs';
import { join } from 'path';

const messagesRouter = express.Router();
const messagesDir =  join(__dirname ,'../messages');

messagesRouter.post('/', async (req, res) => {
    const { message } = req.body;
    const datetime = new Date().toISOString();
    const fileName = `${datetime}.txt`;
    const filePath = join(messagesDir, fileName);

    const data = {
        message,
        datetime,
    };

    try {
        await fs.writeFile(filePath, JSON.stringify(data));
        res.send(data);
    } catch (error) {
       console.error('Error creating message', error);
    }
});

messagesRouter.get('/', async (req, res) => {
    try {
        const files = await fs.readdir(messagesDir);
        const recentFiles = files.slice(-5).reverse();
        const messages = [];

        for (const file of recentFiles) {
            const content = await fs.readFile(join(messagesDir, file));
            messages.push(JSON.parse(content.toString()));
        }
        res.send(messages);
    } catch (error) {
        console.error('Error while creating message', error);
    }
});

export default messagesRouter;