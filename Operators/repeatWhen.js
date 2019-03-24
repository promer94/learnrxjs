import { of, interval } from 'rxjs'
import { repeatWhen, delay } from 'rxjs/operators'

const source$ = of(1, 2, 3, 4)
const notifier1 = ob => ob.pipe(delay(3000)) // eslint-disable-line
const notifier2 = () => interval(1000)
const repeated$ = source$.pipe(repeatWhen(notifier2))

repeated$.subscribe(console.log)
