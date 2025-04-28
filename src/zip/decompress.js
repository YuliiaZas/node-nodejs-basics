import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const initialPath = join(__dirname, 'files', 'archive.gz');
    const decompressedPath = join(__dirname, 'files', 'fileToCompress.txt');

    try {
        await pipeline(
            createReadStream(initialPath),
            createGunzip(),
            createWriteStream(decompressedPath)
        );
        console.log('Decompression completed successfully');
    } catch (error) {
        console.error('Pipeline failed:', error.message);
    }
};

await decompress();
