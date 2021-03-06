import 'ts-jest'
import { LazyObservable, Closable } from '../src'

test('empty initialization value is undefine', () => {
    let lazy: LazyObservable<string> = new LazyObservable()

    expect(lazy.get()).toBeUndefined()
})

test('initialization value is set', () => {
    let lazy: LazyObservable<string> = new LazyObservable('value')

    expect(lazy.get()).toBe('value')
})

test('set different value fires listener', () => {
    let lazy: LazyObservable<string> = new LazyObservable()

    let result: string = ''
    lazy.connectFn((value: string) => {
        result = value
    })
    lazy.dispatch('value')

    expect(result).toBe('value')
})

test('closing listener does not fire listner on change', () => {
    let lazy: LazyObservable<string> = new LazyObservable()

    let result: string = ''
    const closable: Closable = lazy.connectFn((value: string) => {
        result = value
    })
    closable.close()
    lazy.dispatch('value')

    expect(result).toBe('')
})

test('setting same value does not fire listener', () => {
    let lazy: LazyObservable<string> = new LazyObservable('value')

    let result: string = ''
    lazy.connectFn((value: string) => {
        result = value
    })
    lazy.dispatch('value')

    expect(result).toBe('')
})
