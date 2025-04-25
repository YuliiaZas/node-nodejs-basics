import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fsError } from './fs-error.js';

const list = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const sourceDir = join(__dirname, 'files');

    try {
        const files = await readdir(sourceDir);
        if (files) console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') throw fsError;
        throw error;
    }
};

await list();
