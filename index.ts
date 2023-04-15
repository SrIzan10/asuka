import axios from 'axios';
import 'dotenv/config'
import { randomstring } from './util/randomstring.js';
import fs from 'fs'
import { execa } from 'execa';
import * as colorette from 'colorette';

while (true) {
	const stt = await execa('python', ['./python/stt.py']).then(out => out.stdout.split('\n').slice(-1).join('\n'))
	console.log(`${colorette.green('USER')} Heard "${stt}".`)

	const prompt = await axios.get('http://localhost:4000/prompt?p=' + stt).then(res => res.data as string)
	const [noInstructionsPrompt, ] = prompt.replace('����', '').replace('[1m[32m[0m', '').split(RegExp('###\s?Instructions'))
	console.log(`${colorette.blue('GPT')} Responded "${noInstructionsPrompt}.`)

	const tts = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/MF3mGyEYCl7XYWbV9V6O/stream', {
			"text": noInstructionsPrompt,
			"voice_settings": {
				"stability": 0,
				"similarity_boost": 0
			}
		},
		{
			headers: { 'xi-api-key': process.env.ELEVENLABS },
			responseType: 'arraybuffer',
		}
	).then(res => res.data)

	const randomfilename = `./audios/asuka-${randomstring(4)}.mp3`
	await fs.promises.writeFile(randomfilename, tts)

	await execa('mpg123', [randomfilename])
	await fs.promises.unlink(randomfilename)
}
