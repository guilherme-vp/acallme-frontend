import { enLocales as en } from './en'
import { ptBrLocales as ptBr } from './pt-BR'
import { ILocale } from './ILocale'

export * from './available.locales'

export type Locales = 'en' | 'pt-BR'

export const locales: Record<Locales, ILocale> = {
	en,
	'pt-BR': ptBr
}
