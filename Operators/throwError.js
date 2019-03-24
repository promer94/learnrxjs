import { throwError } from 'rxjs'
import { startWith } from 'rxjs/operators'

const result = throwError('something wrong').pipe(startWith(7))
result.subscribe(x => console.log(x), x => console.log(x))
