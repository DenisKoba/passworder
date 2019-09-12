import { customPasswordResponse } from '../types'

export const isLetter = (word: string): boolean => {
  return !/^\d+$/.test(word)
}

export const toUpperCase = (word: string): string => {
  const [ first ] = word
  return `${first.toUpperCase()}${word.slice(1)}`
}

export const passwordOptions = (params: string[]): customPasswordResponse => {
  return {
    first: params.join('').replace(/ /gi, ''),
    second: passwordWithSplittedNumber(params).replace(/ /gi, ''),
    third: params.reverse().join('').replace(/ /gi, ''),
  }
}

const passwordWithSplittedNumber = (params: string[]): string => {
  const splittedNumbers = params
    .filter(item => !isLetter(item))
    .map(item => item.match(new RegExp(`.{1,${Math.floor(item.length/2)}}`, 'g')))
    .flat()
  const arrayOfWords = params.filter(item => isLetter(item))

  splittedNumbers
    .splice(Math.floor(splittedNumbers.length/2), 0, ...arrayOfWords)

  return splittedNumbers.join('')
}
