import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  async viteFinal(config, { configType }) {
    config.server = {
      ...config.server,
      proxy: {
        '/_locales': {
          target: 'http://localhost:3000', // Укажите URL вашего Nuxt-сервера
          changeOrigin: true,
          secure: false,
        },
      },
    };

    return config;
  },
  webpackFinal: async (config, { configType }) => {
    config.devServer = {
      ...config.devServer,
      proxy: {
        '/_locales': {
          target: 'http://localhost:3000', // Укажите URL вашего Nuxt-сервера
          changeOrigin: true,
          secure: false,
        },
      },
    };

    return config;
  },
}
export default config
