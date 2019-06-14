export const loadPolyfills = async () => {
    if (typeof window.IntersectionObserver === 'undefined') {
      await import('intersection-observer')
    }
}