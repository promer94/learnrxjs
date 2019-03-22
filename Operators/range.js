import { range } from 'rxjs'
import { map, filter } from 'rxjs/operators'

const source$ = range(1, 5)
source$
  .pipe(
    map(v => v * 10),
    filter(v => v >= 20)
  )
  .subscribe(v => console.log('🐣range', v))
