import { StoreonModule } from 'storeon'
import { Locales } from '../locales'

export interface GeneralEvents {
	'language/change': Locales
}

export interface GeneralState {
	language: Locales
}

export const generalModule: StoreonModule<GeneralState, GeneralEvents> = store => {
	store.on('@init', () => ({ language: 'pt-BR' }))
	store.on('language/change', (_state, choosenLanguage) => ({ language: choosenLanguage }))
}
