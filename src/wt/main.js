import { Worker } from 'worker_threads';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cpus } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = join(__dirname, 'worker.js');

const performCalculations = async () => {
    const initialNumber = 10;
    const numberOfWorkers = cpus().length;
    const workers = new Array(numberOfWorkers).fill(null).map(() => new Worker(workerPath));

    const promises = workers.map((worker, i) => {
        return new Promise(resolve => {
            worker.once('message', (data) => resolve({status: 'resolved', data, i}));
            worker.once('error', () => resolve({status: 'error', data: null}));
            worker.once('exit', (code) => {
                if (code !== 0) {
                    resolve({status: 'error', data: 1})
                }
            });
            worker.postMessage(initialNumber + i);
        })
    })
    console.log(await Promise.all(promises));
    process.exit(0);
};

await performCalculations();