export type ValidationValue = {
  status: boolean
  warning: string
}

export type CommonType = string | boolean

export interface PassworderInterface {
  charset: string

  generate(length: number): string

  validate(password: string): ValidationValue
}

export interface ValidationMethodsInterface {
  warning: string
  status: boolean
  customLengthErrorMessage: string
  customDigitErrorMessage: string
  customUppercaseErrorMessage: string
  lengthErrorMessage: string
  digitErrorMessage: string
  uppercaseErrorMessage: string

  checkLength(password: string): CommonType

  checkStrength(password: CommonType): any

  testForUpperCase(password: string): CommonType

  testForNumbers(password: string): boolean
}

export interface ChainInterface {
  value: string | boolean
  next(fn: any): ChainInterface
}

