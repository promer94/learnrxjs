import { of } from 'rxjs'
import { map, filter } from 'rxjs/operators'

const source$ = of(1, 2, 3, 4)
source$
  .pipe(
    map(v => v * 10),
    filter(v => v >= 20)
  )
  .subscribe(v => console.log('🐣of', v))
