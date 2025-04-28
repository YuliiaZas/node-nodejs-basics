import { createHash } from 'crypto';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const read = async (fileName) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filePath = join(__dirname, 'files', fileName);

    const data = await readFile(filePath, { encoding: 'utf-8' });
    return data;
}

const calculateHash = async () => {
    const hash = createHash('sha256')
        .update(await read('fileToCalculateHashFor.txt'))
        .digest('hex');
    console.log(hash);
};

await calculateHash();