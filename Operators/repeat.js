import { generate } from 'rxjs'
import { map, repeat } from 'rxjs/operators'

const source$ = generate(0, v => v < 10, v => v + 1, v => v)
source$
  .pipe(
    map(v => v),
    repeat(2)
  )
  .subscribe(v => console.log('🐣🐣', v), null, v => console.log('done'))
