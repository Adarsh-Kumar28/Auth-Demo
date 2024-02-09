const webpack = require('webpack');

module.exports = {
    webpack: function(config, env) {
        config.resolve = {
            ...config.resolve,
            fallback: {
                ...config.resolve.fallback,
                'crypto': require.resolve('crypto-browserify'),
                'stream': require.resolve('stream-browserify'),
                'buffer': require.resolve('buffer/'),
                'http': require.resolve('stream-http'),
                'https': require.resolve('https-browserify'),
                'url': require.resolve('url/'),
                'zlib': require.resolve('browserify-zlib'),
                'assert': require.resolve('assert/'),
            },
        };

        config.plugins = [
            ...config.plugins,
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
        ];

        config.module.rules = config.module.rules.map(rule => {
            if (rule.oneOf instanceof Array) {
                rule.oneOf[rule.oneOf.length - 1].exclude = [
                    /\.(js|mjs|jsx|cjs|ts|tsx)$/,
                    /\.html$/,
                    /\.json$/,
                ];
            }
            return rule;
        });
        return config;
    },
}; 