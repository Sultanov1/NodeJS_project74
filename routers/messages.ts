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

export default messagesRouter;