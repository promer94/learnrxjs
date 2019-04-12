import { fromEvent } from 'rxjs'
import { concatAll, takeUntil, map, withLatestFrom } from 'rxjs/operators'

const dragDOM = document.getElementById('drag')

function render(pos) {
  requestAnimationFrame(() => {
    dragDOM.style.left = `${pos.x}px`
    dragDOM.style.top = `${pos.y}px`
  })
}

const mouseDown$ = fromEvent(dragDOM, 'mousedown')
const mouseUp$ = fromEvent(document.body, 'mouseup')
const mouseMove$ = fromEvent(document.body, 'mousemove')

const start$ = mouseDown$.pipe(map(({ target: { offsetLeft, offsetTop } }) => ({ offsetLeft, offsetTop })))

const move$ = mouseDown$.pipe(
  map(downEvent =>
    mouseMove$.pipe(
      map(moveEvent => ({ start: downEvent, end: moveEvent })),
      takeUntil(mouseUp$)
    )
  ),
  concatAll(),
  map(({ start: { clientX, clientY }, end }) => ({
    moveX: end.clientX - clientX,
    moveY: end.clientY - clientY
  }))
)
move$
  .pipe(
    withLatestFrom(start$, ({ moveX, moveY }, { offsetLeft, offsetTop }) => ({
      x: offsetLeft + moveX,
      y: offsetTop + moveY
    }))
  )
  .subscribe(render)
