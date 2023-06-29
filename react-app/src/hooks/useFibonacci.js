import { useWebworker, useDisposableWebworker } from './useWebworker'
import { getNthFobonacciNumber } from '../functions/get-nth-fibonacci-number'

export const useFibonacci = () => {
    return useDisposableWebworker(getNthFobonacciNumber)
}