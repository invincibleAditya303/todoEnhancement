import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList.map(eachTodo => ({
      ...eachTodo,
      id: uuidv4(),
      taskCompleted: false,
      editing: false,
      updatedTitle: '',
    })),

    inputText: '',
  }

  onClickDelete = id => {
    const {todosList} = this.state
    const filteredTodoList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({todosList: filteredTodoList})
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onAddTodo = () => {
    const {inputText} = this.state

    if (inputText !== '') {
      const newTodo = {
        id: uuidv4(),
        title: inputText,
        taskCompleted: false,
      }
      console.log(newTodo)

      this.setState(prevState => ({
        todosList: [...prevState.todosList, newTodo],
      }))
    }
  }

  onCheckedTask = todoId => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(eachTodo => {
        if (eachTodo.id === todoId) {
          return {...eachTodo, taskCompleted: !eachTodo.taskCompleted}
        }
        return eachTodo
      }),
    }))
  }

  onChangeTitle = (todoId, e) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo => {
        if (todo.id === todoId) {
          return {...todo, updatedTitle: e}
        }
        return todo
      }),
    }))
  }

  onClickEdit = todoId => {
    const {todosList} = this.state
    const currentItem = todosList.filter(todo => todo.id === todoId)
    const isEditing = currentItem[0].editing

    if (isEditing) {
      this.setState(prevState => ({
        todosList: prevState.todosList.map(todo => {
          if (todo.id === todoId) {
            return {...todo, title: todo.updatedTitle, editing: false}
          }
          return todo
        }),
      }))
    } else {
      this.setState(prevState => ({
        todosList: prevState.todosList.map(eachTodo => {
          if (eachTodo.id === todoId) {
            return {...eachTodo, editing: true}
          }
          return eachTodo
        }),
      }))
    }
  }

  render() {
    const {todosList, inputText} = this.state
    console.log(todosList)

    return (
      <div className="todo-bg-container">
        <div className="todo-item-container">
          <div className="input-container">
            <input
              type="text"
              className="input-text"
              placeholder="Enter Todo"
              value={inputText}
              onChange={this.onChangeInput}
            />
            <button
              className="add-button"
              type="button"
              onClick={this.onAddTodo}
            >
              Add
            </button>
          </div>
          <h1 className="todo-heading">Simple Todos</h1>
          <ul className="todo-list">
            {todosList.map(eachTodo => (
              <TodoItem
                todoDetails={eachTodo}
                onClickDelete={this.onClickDelete}
                onCheckedTask={this.onCheckedTask}
                onClickEdit={this.onClickEdit}
                onChangeTitle={this.onChangeTitle}
                key={eachTodo.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
