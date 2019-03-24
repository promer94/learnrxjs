import { fromEvent, from } from 'rxjs'
import { flatMap, startWith } from 'rxjs/operators'

const clickStream$ = fromEvent(document.getElementById('button'), 'click').pipe(
  startWith('click'),
  flatMap(() => from(fetch('https://api.github.com/repos/facebook/react').then(response => response.json())))
)
clickStream$.subscribe(data => console.log(data))
