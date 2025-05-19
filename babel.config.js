module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      
        [
          'module:react-native-dotenv',
          {
            moduleName: '@env',
            path: '.env',
            blocklist: null,
            allowlist: ['GEMINI_API_KEY'],
            safe: false,
            allowUndefined: true,
          },
        ],
                
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],
    ],
  }
}
