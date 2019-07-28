import {DEFAULT_PASSWORD_LENGTH, REG_EXP_DIGITS, REG_EXP_UPPER_CASE} from '../consts'
import chain from '../helpers/chain'

export type ValidationValue = {
  status: boolean
  warning: string
}

export type CommonType = string | boolean

export interface PassworderInterface {
  warning: string
  status: boolean
  charset: string

  generate(): string

  validate(password: string): ValidationValue

  checkLength(password: string): CommonType

  checkStrength(password: CommonType)

  testForUpperCase(password: string): CommonType

  testForNumbers(password: string): boolean
}

export interface ChainInterface {
  value: string | boolean
  next(fn): ChainInterface


}
