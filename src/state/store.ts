import { persistState } from '@storeon/localstorage'
import { createStoreon } from 'storeon'
import { storeonDevtools } from 'storeon/devtools'

import { GeneralEvents, GeneralState, generalModule } from './general'
import { UserEvents, UserState, userModule } from './user'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState extends GeneralState, UserState {}

export interface AppEvents extends GeneralEvents, UserEvents {}

declare module 'storeon' {
	export type IStoreonModule<State = AppState, Events = AppEvents> = (
		store: StoreonStore<State, Events>
	) => void
}
declare module 'storeon/react' {
	export function useStoreon(
		...keys: (keyof AppState)[]
	): useStoreon.StoreData<AppState, AppEvents>
}

export const store = createStoreon<AppState, AppEvents>(
	[
		generalModule,
		userModule,
		persistState<AppState>(['token']),
		process.env.NODE_ENV !== 'production' && storeonDevtools
	].filter(Boolean)
)
