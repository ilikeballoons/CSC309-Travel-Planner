import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default function WithDragDropContext (DecoratedClass) {
  return DragDropContext(HTML5Backend)(DecoratedClass)
}
