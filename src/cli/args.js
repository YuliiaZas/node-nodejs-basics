const parseArgs = () => {
    const args = process.argv.slice(2);
    const parsedArgs = {};

    for(let i = 0; i < args.length; i++) {
        console.log('2', args[i]);
        if (args[i].startsWith('--')) {
            const key = args[i].slice(2);
            const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
            parsedArgs[key] = value;
        }
    }

    const parsedResult = Object.entries(parsedArgs)
        .map(([key, value]) => `${key} is ${value}`)
        .join(', ');
    console.log(parsedResult);
};

parseArgs();
