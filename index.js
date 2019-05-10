import { fromEvent, from } from 'rxjs'
import { switchMap, filter } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'

const input = document.querySelector('.search')

const input$ = fromEvent(input, 'input')
const createQueryStreamByFromFetch = url => fromFetch(url).pipe(switchMap(response => response.json()))
const createQueryStreamByFrom = url => from(fetch(url).then(response => response.json()))

input$
  .pipe(
    filter(({ target: { value } }) => value !== ''),
    switchMap(({ target: { value } }) =>
      createQueryStreamByFromFetch(`https://hn.algolia.com/api/v1/search?query=${value}`)
    )
  )
  .subscribe(data => console.log('fromFetch', data))

input$
  .pipe(
    filter(({ target: { value } }) => value !== ''),
    switchMap(({ target: { value } }) => createQueryStreamByFrom(`https://hn.algolia.com/api/v1/search?query=${value}`))
  )
  .subscribe(data => console.log('from', data))
