import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const readStream = createReadStream(filePath, { encoding: 'utf-8' });

    readStream
        .on('error', (error) => console.error('Error while reading file:', error.message))
        .on('end', () => {process.stdout.write('\n')});

    readStream.pipe(process.stdout);
};

await read();
