import { createHash } from 'crypto';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fsError } from '../fs/fs-error.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const read = async (fileName) => {
    const filePath = join(__dirname, 'files', fileName);

    try {
        return await readFile(filePath, { encoding: 'utf-8' });
    } catch (error) {
        if (error.code === 'ENOENT') throw fsError;
        throw error;
    }
}

const calculateHash = async () => {
    const hash = createHash('sha256')
        .update(await read('fileToCalculateHashFor.txt'))
        .digest('hex');
    console.log(hash);
};

await calculateHash();