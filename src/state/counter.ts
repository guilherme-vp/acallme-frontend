import { StoreonModule } from 'storeon'

export interface CounterEvents {
	'counter/increment': void
	'counter/decrement': void
	'counter/show': number
}

export interface CounterState {
	counter: number
}

export const counterModule: StoreonModule<CounterState, CounterEvents> = store => {
	store.on('@init', () => ({ counter: 0 }))
	store.on('counter/increment', ({ counter }) => ({ counter: counter + 1 }))
	store.on('counter/decrement', ({ counter }) => ({ counter: counter - 1 }))
	store.on('counter/show', ({ counter }) => ({ counter }))
}
