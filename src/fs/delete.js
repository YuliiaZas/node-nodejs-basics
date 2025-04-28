import { unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fsError } from './fs-error.js';

const remove = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await unlink(path);
    } catch (error) {
        if (error.code === 'ENOENT') throw fsError;
        throw error;
    }
};

await remove();
