import * as fs from 'fs'
import * as path from 'path'
import {createRequire} from 'module'
import type {InApp, Slash} from './types'
import {fileURLToPath} from 'url'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export enum AppLocale {
    EnglishUS = 'en-US',
    Russian = 'ru',
    Ukrainian = 'uk'
}

export interface Language {
    emoji: string
    name: string
    code: AppLocale
}

export const Language: Language[] = [
    {emoji: '🇺🇸', name: 'English, US', code: AppLocale.EnglishUS},
    {emoji: '🇷🇺', name: 'Русский', code: AppLocale.Russian},
    {emoji: '🇺🇦', name: 'Українська', code: AppLocale.Ukrainian}
]

type AppRecord<T> = Record<AppLocale, T>

function importLocalizationFiles<T>(dir: string, fileType: string): AppRecord<T> {
    const files: AppRecord<T> = {} as AppRecord<T>
    const dirArray = dir.split(path.sep)
    const language = dirArray[dirArray.length - 1] as AppLocale
    if (!files[language]) files[language] = {} as T
    function readDirRecursive(currentPath: string, relativePath: string) {
        const entries = fs.readdirSync(currentPath)
        entries.forEach(entry => {
            const entryPath = path.join(currentPath, entry)
            const entryRelativePath = path.join(relativePath, entry)
            if (fs.statSync(entryPath).isDirectory()) {
                readDirRecursive(entryPath, entryRelativePath)
            } else if (path.extname(entry) === '.json' && entryRelativePath.startsWith(fileType)) {
                const key = entryRelativePath
                    .replace(`${fileType}${path.sep}`, '')
                    .replace('.json', '');
                (files[language] as any)[key] = require(entryPath)
            }
        })
    }
    readDirRecursive(dir, '')
    return files as AppRecord<T>
}

const localizationDirs = Language.map(i => path.join(__dirname, i.code))

export const inAppLocalization: AppRecord<InApp> = localizationDirs
    .reduce((acc, dir) => {
        const localizations: AppRecord<InApp> = importLocalizationFiles<InApp>(dir, 'in-app')
        return { ...acc, ...localizations }
    }, {} as AppRecord<InApp>)

export const slashLocalization: AppRecord<Slash> = localizationDirs
    .reduce((acc, dir) => {
        const localizations: AppRecord<Slash> = importLocalizationFiles<Slash>(dir, 'slash')
        return { ...acc, ...localizations }
    }, {} as AppRecord<Slash>)