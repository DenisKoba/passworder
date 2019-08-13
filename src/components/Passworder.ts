import chain from '../helpers/chain'
import { ValidationValue, PassworderInterface } from '../types'
import {
  DEFAULT_PASSWORD_LENGTH,
  CHARSET,
} from '../consts'
import ValidationMethods from './ValidationMethods'



export class Passworder extends ValidationMethods implements PassworderInterface {
  readonly charset: string = CHARSET

  constructor() {
    super()
  }

  generate(length: number = DEFAULT_PASSWORD_LENGTH): string {
    let value = ''
    for (let i = 0, n = this.charset.length; i < length; ++i) {
      value += this.charset.charAt(Math.floor(Math.random() * n))
    }
    return value
  }

  validate(password: string): ValidationValue {
    chain(password)
      .next(this.checkLength.bind(this))
      .next(this.checkStrength.bind(this))
    return {
      status: this.status,
      warning: this.warning,
    }
  }
}

export default new Passworder()
