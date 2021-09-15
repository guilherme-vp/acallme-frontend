import { createStoreon } from 'storeon'

import { GeneralEvents, GeneralState, generalModule } from './general'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState extends GeneralState {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppEvents extends GeneralEvents {}

declare module 'storeon' {
	export type IStoreonModule<State = AppState, Events = AppEvents> = (
		store: StoreonStore<State, Events>
	) => void
}

export const store = createStoreon<AppState, AppEvents>([generalModule])
