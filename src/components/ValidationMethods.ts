import { ChainInterface, CommonType, ValidationMethodsInterface } from '../types'
import { ERROR, REG_EXP_DIGITS, REG_EXP_UPPER_CASE } from '../consts'
import chain from '../helpers/chain'

export default class ValidationMethods implements ValidationMethodsInterface {
  warning: string = ''
  status: boolean = false
  customLengthErrorMessage: string = ''
  customDigitErrorMessage: string = ''
  customUppercaseErrorMessage: string = ''

  checkLength(password: string): CommonType {
    if (password.length <= 8) {
      this.warning = this.customLengthErrorMessage || ERROR.SHORT
      this.status = false
      return false
    }

    return password
  }

  checkStrength(password: CommonType): ChainInterface | boolean {
    if (!password) {
      this.status = false
      return false
    }

    return chain(password)
      .next(this.testForUpperCase.bind(this))
      .next(this.testForNumbers.bind(this))
  }

  testForUpperCase(password: string): CommonType {
    const isUppercase = REG_EXP_UPPER_CASE.test(password)

    if (isUppercase) {
      this.status = isUppercase
      return password
    }

    this.warning = this.customUppercaseErrorMessage || ERROR.UPPERCASE
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
      this.warning = ''
      return isDigit
    }

    this.warning = this.customDigitErrorMessage || ERROR.DIGIT
    this.status = isDigit
    return isDigit
  }

  set lengthErrorMessage(message: string) {
    this.customLengthErrorMessage = message
  }

  set digitErrorMessage(message: string) {
    this.customDigitErrorMessage = message
  }

  set uppercaseErrorMessage(message: string) {
    this.customUppercaseErrorMessage = message
  }
}
