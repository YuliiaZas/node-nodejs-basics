import { createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const writeStream = createWriteStream(filePath, { encoding: 'utf-8' });

    writeStream.on('error', (error) => {
        console.error('Error while writing file:', error.message);
    });

    process.stdin.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Data has been written successfully.');
    });
};

await write();
