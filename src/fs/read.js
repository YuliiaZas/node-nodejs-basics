import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fsError } from './fs-error.js';

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = join(__dirname, 'files', 'fileToRead.txt');

    try {
        const file = await readFile(path, { encoding: 'utf-8' });
        if (file) console.log(file);
    } catch (error) {
        if (error.code === 'ENOENT') throw fsError;
        throw error;
    }
};

await read();
