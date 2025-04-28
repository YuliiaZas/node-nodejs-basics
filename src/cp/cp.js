import { fork } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
    const filePath = join(__dirname, 'files', 'script.js');

    const child = fork(filePath, args, {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
    child.stderr.on('data', (data) => {
        console.error(`Error from child process: ${data}`);
    });

    child
        .on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
        })
        .on('message', (message) => {
            console.log(`Message from child process: ${message}`);
        });
    
    process.stdin.on('end', () => {
        child.stdin.end();
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2', 3]);
