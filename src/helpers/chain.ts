import { ChainInterface } from '../types'

export class Chain implements ChainInterface{
    value: string | boolean

    constructor(data: string) {
        this.value = data
    }

    next(fn) {
        this.value = fn(this.value)
        return this
    }
}


export default function chain(data): ChainInterface {
    return new Chain(data)
}
