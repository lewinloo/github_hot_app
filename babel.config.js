module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // babel-plugin-module-resolver 插件用来解析路径
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/components': './src/components',
          '@/assets': './src/assets',
          '@/config': './src/config',
          '@/models': './src/models',
          '@/navigator': './src/navigator',
          '@/pages': './src/pages',
          '@/utils': './src/utils',
        },
      },
    ],
  ],
};
