import { generate } from 'rxjs'
import { map } from 'rxjs/operators'

const source$ = generate(0, v => v < 10, v => v + 1, v => v)
source$.pipe(map(v => v)).subscribe(v => console.log('🐣🐣', v))
