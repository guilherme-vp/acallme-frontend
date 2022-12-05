import { StoreonModule } from 'storeon'

import { Locales } from '../locales'

export interface GeneralEvents {
	'language/change': Locales
	'drawer/set': boolean
	'loading/set': boolean
}

export interface GeneralState {
	language: Locales
	expanded: boolean
	loading: boolean
}

export const generalModule: StoreonModule<GeneralState, GeneralEvents> = store => {
	store.on('@init', () => ({ language: 'pt-BR', expanded: false }))
	store.on('loading/set', (_state, isLoading) => ({
		loading: isLoading
	}))
	store.on('language/change', (_state, choosenLanguage) => ({ language: choosenLanguage }))
	store.on('drawer/set', (_state, value) => ({ expanded: value }))
}
