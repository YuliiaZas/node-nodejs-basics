import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const initialPath = join(__dirname, 'files', 'fileToCompress.txt');
    const compressedPath = join(__dirname, 'files', 'archive.gz');

    try {
        await pipeline (
            createReadStream(initialPath),
            createGzip(),
            createWriteStream(compressedPath)
        );
        console.log('Compression completed successfully');
    } catch (error) {
        console.error('Pipeline failed:', error.message);
    }
};

await compress();
