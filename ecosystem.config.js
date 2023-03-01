module.exports = {
    apps: [
        {
            name: 'HerosApp',
            exec_mode: 'cluster',
            instances: '1', // Or a number of instances
            script: 'node_modules/next/dist/bin/next',
            args: 'dev',
        }
    ]
}