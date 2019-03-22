import { generate, empty } from 'rxjs'
import { map, repeat } from 'rxjs/operators'

const source$ = empty()
source$.subscribe(v => console.log('🐣🐣', v), null, v => console.log('done'))
