module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      'root': ['./src'],
      'alias': {
        '@images': './src/assets/images',
        '@icons': './src/assets/icons',
        '@components': './src/components',
        '@constants': './src/constants',
        '@hooks': './src/hooks',
        '@navigations': './src/navigations',
        '@scenes': './src/scenes',
        '@utils': './src/utils',
        '@colors': './src/styles/colors',
        "@redux": "./src/redux",
        "@libs": "./src/libs"
      },
    }],
    ['module:react-native-dotenv', {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true
    }]
  ],
};
