import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fsError } from './fs-error.js';

const create = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', 'fresh.txt');

    try {
        await writeFile(filePath, 'I am fresh and young', { flag: 'wx' });
    } catch (error) {
        throw error.code === 'EEXIST' ? fsError : error;
    }
};

await create();
