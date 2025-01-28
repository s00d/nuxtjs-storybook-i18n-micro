import type { StorybookConfig } from '@storybook-vue/nuxt'
import fs from 'node:fs'
import path from 'node:path'

type TranslationValue = string | number | boolean | TranslationStructure | unknown | null
interface TranslationStructure {
  [key: string]: TranslationValue
}

const localesRoot = 'locales'

function mergeAllTranslations(target: TranslationStructure, ...sources: TranslationStructure[]): TranslationStructure {
  return sources.reduce((acc, source) => {
    for (const [key, value] of Object.entries(source)) {
      acc[key] = value
    }
    return acc
  }, target)
}

const getLocales = (): string[] => {
  const localesDir = path.join(__dirname, '../', localesRoot)
  try {
    return fs.readdirSync(localesDir)
      .filter(file => file.endsWith('.json'))
      .map(file => path.basename(file, '.json'))
  }
  catch (error) {
    console.error('Error reading locales directory:', error)
    return []
  }
}

const mergeTranslations = () => {
  const localesDir = path.join(__dirname, '../', localesRoot)
  const outputDir = path.join(__dirname, '../storybook_locales/_locales/general')
  const locales = getLocales()

  const collectAllTranslations = (dir: string, lang: string): TranslationStructure => {
    let translations: TranslationStructure = {}
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        translations = mergeAllTranslations(translations, collectAllTranslations(entryPath, lang))
      }
      else if (entry.isFile() && entry.name === `${lang}.json`) {
        const content = JSON.parse(fs.readFileSync(entryPath, 'utf-8'))
        translations = mergeAllTranslations(translations, content)
      }
    }
    return translations
  }

  locales.forEach((lang) => {
    // 1. Собираем все страничные переводы
    let merged = collectAllTranslations(path.join(localesDir, 'pages'), lang)

    // 2. Добавляем общие переводы с приоритетом
    const generalFilePath = path.join(localesDir, `${lang}.json`)
    if (fs.existsSync(generalFilePath)) {
      const generalContent = JSON.parse(fs.readFileSync(generalFilePath, 'utf-8'))
      merged = mergeAllTranslations(merged, generalContent)
    }

    // 3. Сохраняем результат
    const outputPath = path.join(outputDir, `${lang}/data.json`)
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2))
  })
}

mergeTranslations()

const config: StorybookConfig = {
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  staticDirs: ['../storybook_locales'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  }
}
export default config
