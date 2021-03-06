import chain from '../helpers/chain'
import {
  ValidationValue,
  PassworderInterface,
  Union,
  customPasswordResponse
} from '../types'
import {
  DEFAULT_PASSWORD_LENGTH,
  CHARSET,
} from '../consts'
import ValidationMethods from './ValidationMethods'
import { isLetter, toUpperCase, passwordOptions } from '../helpers/common'



export class Passworder extends ValidationMethods implements PassworderInterface {
  readonly charset: string = CHARSET

  constructor() {
    super()
  }

  generate(length: number = DEFAULT_PASSWORD_LENGTH): string {
    const filteredLength = length < DEFAULT_PASSWORD_LENGTH ? DEFAULT_PASSWORD_LENGTH : length

    let value = ''

    for (let i = 0, n = this.charset.length; i < filteredLength; ++i) {
      value += this.charset.charAt(Math.floor(Math.random() * n))
    }

    return value
  }

  generateCustom(...parameters: Union[]): customPasswordResponse  {
    const editedParameters = parameters
      .map((item) => {
        const string = item.toString()
        return isLetter(string) ? toUpperCase(string) : string
      })

    return passwordOptions(editedParameters)
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
