import { interval, timer } from 'rxjs'
import { map } from 'rxjs/operators'

const result$ = interval(1000).pipe(map(x => x + 1))

const fn = result$.subscribe(x => console.log(x), x => console.log(x), () => console.log('done'))
timer(5000).subscribe(() => fn.unsubscribe())
