import { fromEvent, from, defer } from 'rxjs'
import { flatMap, startWith, map } from 'rxjs/operators'

const fetchFactor = () => from(fetch('https://api.github.com/repos/facebook/react').then(response => response.json()))
const clickStream$ = fromEvent(document.getElementById('button'), 'click').pipe(
  startWith('click'),
  map(() => defer(fetchFactor)),
  flatMap(data => data)
)
clickStream$.subscribe(data => console.log(data))
