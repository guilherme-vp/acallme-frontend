import React, { ReactNode } from 'react'

import { useIntl as useBaseIntl, IntlShape as Shape } from 'react-intl'

import { ILocale } from '../locales/ILocale'
import { ptBrLocales } from '../locales/pt-BR'

interface MessageDescriptor {
	id: keyof ILocale
	description?: object
}

export interface IntlShape extends Omit<Shape, 'formatMessage'> {
	formatMessage(
		descriptor: MessageDescriptor,
		values?: Parameters<Shape['formatMessage']>[1]
	): string
	formatMessage(
		descriptor: MessageDescriptor,
		values?: Parameters<Shape['formatMessage']>[1]
	): ReactNode
}

export const useIntl = (): IntlShape => {
	const { formatMessage, ...intl } = useBaseIntl()
	return {
		...intl,
		// @ts-ignore
		formatMessage: (
			descriptor: MessageDescriptor,
			values?: Parameters<IntlShape['formatMessage']>[1]
		): ReturnType<IntlShape['formatMessage']> =>
			formatMessage(
				{ ...descriptor, defaultMessage: ptBrLocales[descriptor.id] },
				{ bold: str => <strong>{str}</strong>, linebreak: <br />, ...values }
			)
	}
}

export type { ILocale }

export default useIntl
