import { never } from 'rxjs'
import { startWith } from 'rxjs/operators'

const result = never().pipe(startWith(7))
result.subscribe(x => console.log(x), x => console.log(x), () => console.log('done'))
