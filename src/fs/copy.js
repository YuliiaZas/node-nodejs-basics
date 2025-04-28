import { cp, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fsError } from './fs-error.js';

const copyFiles = async (sourceDir, destDir) => {
    try {
        await cp(sourceDir, destDir, {
            recursive: true,
            force: false,
            errorOnExist: true,
        });
    } catch (error) {
        if (error.code === 'ENOENT') throw fsError;
        throw error;
    }
}

export const copy = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const sourceDir = join(__dirname, 'files');
    const destDir = join(__dirname, 'files_copy');

    try {
        const destDirFiles = await readdir(destDir);
        if (destDirFiles) throw fsError;
    } catch (error) {
        if (error.code === 'ENOENT') {
            
            await copyFiles(sourceDir, destDir);
            return;
        }
        throw error;
    }
};

await copy();
