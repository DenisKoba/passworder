import { ChainInterface, CommonType } from '../types'

export class Chain implements ChainInterface{
    value: CommonType

    constructor(data: string) {
        this.value = data
    }

    next(fn: any) {
        this.value = fn(this.value)
        return this
    }
}


export default function chain(data: any): ChainInterface {
    return new Chain(data)
}
