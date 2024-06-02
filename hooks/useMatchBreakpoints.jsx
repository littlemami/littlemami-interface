import { useState, useEffect, useLayoutEffect } from 'react'

export const useAppEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export const breakpointMap = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1280,
  nav: 1440
}

const mediaQueries = (() => {
  let prevMinWidth = 0

  return Object.keys(breakpointMap).reduce((accum, size, index) => {
    // Largest size is just a min-width of second highest max-width
    if (index === Object.keys(breakpointMap).length - 1) {
      return { ...accum, [size]: `(min-width: ${prevMinWidth}px)` }
    }

    const minWidth = prevMinWidth
    const breakpoint = breakpointMap[size]

    // Min width for next iteration
    prevMinWidth = breakpoint + 1

    return { ...accum, [size]: `(min-width: ${minWidth}px) and (max-width: ${breakpoint}px)` }
  }, {})
})()

const getKey = (size) => `is${size.charAt(0).toUpperCase()}${size.slice(1)}`

const getState = () => {
  const s = Object.keys(mediaQueries).reduce((accum, size) => {
    const key = getKey(size)
    if (typeof window === 'undefined') {
      return {
        ...accum,
        [key]: false
      }
    }

    const mql = typeof window?.matchMedia === 'function' ? window.matchMedia(mediaQueries[size]) : null
    return { ...accum, [key]: mql?.matches ?? false }
  }, {})
  return s
}

export const useMatchBreakpoints = () => {
  const [state, setState] = useState(() => getState())

  useAppEffect(() => {
    const handlers = Object.keys(mediaQueries).map((size) => {
      let mql
      let handler

      if (typeof window?.matchMedia === 'function') {
        mql = window.matchMedia(mediaQueries[size])

        handler = (matchMediaQuery) => {
          const key = getKey(size)
          setState((prevState) => ({
            ...prevState,
            [key]: matchMediaQuery.matches
          }))
        }

        // Safari < 14 fix
        if (mql.addEventListener) {
          mql.addEventListener('change', handler)
        }
      }

      return () => {
        // Safari < 14 fix
        if (mql?.removeEventListener) {
          mql.removeEventListener('change', handler)
        }
      }
    })

    setState(getState())

    return () => {
      handlers.forEach((unsubscribe) => {
        unsubscribe()
      })
    }
  }, [])

  return {
    ...state,
    isMobile: state.isXs || state.isSm,
    isTablet: state.isMd || state.isLg,
    isDesktop: state.isXl || state.isXxl
  }
}
