module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@config': './src/config',
                '@models': './src/models',
                '@controllers': './src/controllers',
                '@validations': './src/validations'
            }
        }],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
}