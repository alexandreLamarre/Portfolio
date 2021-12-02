import PageManager from './index'
import { test, expect } from '@jest/globals'

test('Page State Manager Tests - Lookup', () => {
  const n = PageManager.pageArray.length
  expect(n).toBeGreaterThan(0)
  for (let i = 0; i < n; i++) {
    expect(PageManager.isHomePage(PageManager.pageArray[i].name)).toBe(i === 0)
    expect(PageManager.isEndPage(PageManager.pageArray[i].name)).toBe(i === n - 1)
    expect(PageManager.lookup(PageManager.pageArray[i].name)).toBe(i)
    expect(PageManager.step(i)).toBe(PageManager.pageArray[i].name)
  }
})

test('Page State Manager Tests - Transitions', () => {
  const n = PageManager.pageArray.length
  for (let i = 1; i < n; i++) {
    expect(PageManager.prev(PageManager.pageArray[i].name)).toBe(PageManager.pageArray[i - 1].name)
    expect(PageManager.next(PageManager.pageArray[i - 1].name)).toBe(PageManager.pageArray[i].name)
  }
})

test('Page State Manager Tests - Expected Errors', () => {
  const invalidLookup = () => {
    PageManager.lookup('invalid')
  }

  const invalidPrevPage = () => {
    PageManager.prev(PageManager.pageArray[0].name)
  }

  const invalidNextPage = () => {
    PageManager.next(PageManager.pageArray[PageManager.pageArray.length - 1].name)
  }
  expect(invalidLookup).toThrow("Invalid page lookup: '" + String('invalid') + "'")
  expect(invalidPrevPage).toThrow('Cannot transition to a page before the home page')
  expect(invalidNextPage).toThrow('Cannot transition to a page after the end page.')
})
