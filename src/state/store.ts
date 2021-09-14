import { createStoreon } from 'storeon'

import { CounterEvents, CounterState, counterModule } from './counter'
import { GeneralEvents, GeneralState, generalModule } from './general'

export interface AppState extends CounterState, GeneralState {}

export interface AppEvents extends CounterEvents, GeneralEvents {}

declare module 'storeon' {
	export type IStoreonModule<State = AppState, Events = AppEvents> = (
		store: StoreonStore<State, Events>
	) => void
}

export const store = createStoreon<AppState, AppEvents>([counterModule, generalModule])
