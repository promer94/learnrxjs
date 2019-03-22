/**
 *
 *
 * @param {function} transformFn
 * @returns Observable
 */
function map(transformFn) {
  const inputObservable = this
  const outputObservable = createObservable(outputObserver => {
    inputObservable.subscribe({
      next: x => {
        const y = transformFn(x)
        outputObserver.next(y)
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    })
  })
  return outputObservable
}
/**
 *
 *
 * @param {function} conditionFn
 * @returns Observable
 */
function filter(conditionFn) {
  const inputObservable = this
  const outputObservable = createObservable(outputObserver => {
    inputObservable.subscribe({
      next: x => {
        if (conditionFn(x)) {
          outputObserver.next(x)
        }
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    })
  })
  return outputObservable
}
/**
 *
 *
 * @param {number} period
 * @returns
 */
function delay(period) {
  const inputObservable = this
  const outputObservable = createObservable(outputObserver => {
    inputObservable.subscribe({
      next: x => setTimeout(() => outputObserver.next(x), period),
      error: e => outputObserver.error(e),
      complete: () => setTimeout(() => outputObserver.complete(), period)
    })
  })
  return outputObservable
}
/**
 *
 *
 * @param {function} subscribe how data will be send to observer
 * @returns
 */
function createObservable(subscribe) {
  return {
    subscribe,
    map,
    filter,
    delay
  }
}

const arrayObservable = createObservable(observer => {
  ;[1, 2, 3, 4, 5].forEach(v =>
    setTimeout(() => {
      observer.next(v)
    }, 200)
  )
  setTimeout(() => {
    observer.complete()
  }, 200)
})

arrayObservable
  .map(e => e * 10)
  .filter(e => e >= 20)
  .delay(1000)
  .subscribe({
    next: function nextCallBack(data) {
      console.log(data)
    },
    error: function errorCallback(err) {
      console.error(err)
    },
    complete: function completeCallback() {
      console.log('done')
    }
  })
