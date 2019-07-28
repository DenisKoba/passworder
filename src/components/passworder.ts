import chain from '../helpers/chain'
import { ValidationValue, CommonType, PassworderInterface } from '../types'
import {
  DEFAULT_PASSWORD_LENGTH,
  REG_EXP_UPPER_CASE,
  REG_EXP_DIGITS,
} from '../consts'



class Passworder implements PassworderInterface{
  warning: string = ''
  status: boolean = false
  charset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*+?@~"

  generate(length: number = DEFAULT_PASSWORD_LENGTH): string {
    let value = ''
    for (let i = 0, n = this.charset.length; i < length; ++i) {
      value += this.charset.charAt(Math.floor(Math.random() * n))
    }
    return value
  }

  validate(password: string): ValidationValue {
    chain(password)
      .next(this.checkLength)
      .next(this.checkStrength)
    return {
      status: this.status,
      warning: this.warning,
    }
  }

  checkLength(password: string): CommonType {
    if (password.length <= 8) {
      this.warning = 'The password is to short'
      this.status = false
      return false
    }

    return password
  }

  checkStrength(password: CommonType) {
    if (!password) {
      this.status = false
      return false
    }

    return chain(password)
      .next(this.testForUpperCase)
      .next(this.testForNumbers)
  }

  testForUpperCase(password: string): CommonType {
    const isUppercase = REG_EXP_UPPER_CASE.test(password)

    if (isUppercase) {
      this.status = isUppercase
      return password
    }

    this.warning = 'Your password should contain at least one uppercase letter'
    return false
  }

  testForNumbers(password: string): boolean {
    if (!password) {
      this.status = false
      return false
    }

    const isDigit = REG_EXP_DIGITS.test(password)
    if (isDigit) {
      this.status = isDigit
      return isDigit
    }

    this.warning = 'Your password should contain at least one digit character'
    return isDigit
  }
}

export default new Passworder()
