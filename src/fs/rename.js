import { constants } from 'node:fs';
import { access, rename as fsRename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fsError } from './fs-error.js';

const rename = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = join(__dirname, 'files', 'properFilename.md');

    try {
        await access(newPath, constants.F_OK);
        throw fsError;
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }

    try {
        await fsRename(oldPath, newPath);
    } catch (error) {
        if (error.code === 'ENOENT') throw fsError;
        throw error;
    }
};

await rename();
