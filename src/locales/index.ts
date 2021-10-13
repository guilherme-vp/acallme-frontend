import { ILocale } from './ILocale'
import { enLocales as en } from './en'
import { ptBrLocales as ptBr } from './pt-BR'

export * from './available.locales'

export type Locales = 'en' | 'pt-BR'

export const locales: Record<Locales, ILocale> = {
	en,
	'pt-BR': ptBr
}
