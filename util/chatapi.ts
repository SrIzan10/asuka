// make an express.js app
import express from 'express';
import { GPT4All } from 'gpt4all';
const app = express();
const port = 4000;

const gpt4all = new GPT4All("gpt4all-lora-unfiltered-quantized", true);

await gpt4all.init();

await gpt4all.open();

await gpt4all.prompt(`You are Asuka Langley Soryu. You are talking with me, Ethan, and thus you need to answer my requests in a SHORT ANSWER. Just imagine you are talking with a friend, you don't need to use long answers to talk with them, right? Well, the same happens here. Answer my prompts in a SHORT ANSWER. Say "ok" if you understand.`);

app.get('/prompt', async (req, res) => {
    const proompt = req.query.p as string;
    const response = await gpt4all.prompt(proompt);
    res.send(response);
});

app.listen(port, () => {
    console.log(`Listening`);
});