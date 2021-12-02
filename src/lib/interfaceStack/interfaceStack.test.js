import INTERFACE_STACK from './interfaceStack'
import { test, expect } from '@jest/globals'

test('Global variable INTERFACE_STACK', () => {
  const n = INTERFACE_STACK.num()
  expect(INTERFACE_STACK.size()).toBe(0)
  expect(n).toBe(2)
  expect(INTERFACE_STACK.empty()).toBe(true)

  const someIndex = Math.floor(n / 2)
  INTERFACE_STACK.add(someIndex)
  expect(INTERFACE_STACK.has(someIndex)).toBe(true)
  for (let i = 0; i < 4; i++) {
    INTERFACE_STACK.add(someIndex)
  }
  expect(INTERFACE_STACK.size()).toBe(1)
  INTERFACE_STACK.remove(someIndex)
  expect(INTERFACE_STACK.size()).toBe(0)
  expect(INTERFACE_STACK.has(someIndex)).toBe(false)
  expect(INTERFACE_STACK.top()).toBe('')

  for (let i = 0; i < 6; i++) {
    INTERFACE_STACK.remove(someIndex)
  }
  expect(INTERFACE_STACK.size()).toBe(0)
  expect(INTERFACE_STACK.has(someIndex)).toBe(false)
  expect(INTERFACE_STACK.top()).toBe('')

  for (let i = 0; i < INTERFACE_STACK.num(); i++) {
    INTERFACE_STACK.add(i)
  }

  expect(INTERFACE_STACK.size() === INTERFACE_STACK.num()).toBe(true)
  expect(INTERFACE_STACK.top()).toBe('resume')
})
