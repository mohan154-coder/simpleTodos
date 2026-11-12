import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isCompleted: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isCompleted: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isCompleted: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isCompleted: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    userInput: '',
    nextTodoId: 9,
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onAddTodo = () => {
    const {userInput, todosList, nextTodoId} = this.state

    const trimmedInput = userInput.trim()

    if (trimmedInput !== '') {
      const words = trimmedInput.split(' ')
      const lastWord = words[words.length - 1]

      let todoTitle = trimmedInput
      let todosCount = 1

      const lastNumber = Number(lastWord)

      if (words.length > 1 && lastNumber > 0 && lastNumber % 1 === 0) {
        todosCount = lastNumber

        words.pop()

        todoTitle = words.join(' ')
      }

      const newTodos = []

      let newId = nextTodoId

      for (let i = 1; i <= todosCount; i += 1) {
        const newTodo = {
          id: newId,
          title: todoTitle,
          isCompleted: false,
        }

        newTodos.push(newTodo)

        newId += 1
      }

      this.setState({
        todosList: [...todosList, ...newTodos],
        userInput: '',
        nextTodoId: newId,
      })
    }
  }

  deleteTodo = id => {
    const {todosList} = this.state

    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({todosList: updatedTodosList})
  }

  toggleTodoComplete = id => {
    const {todosList} = this.state

    const updatedTodosList = todosList.map(eachTodo => {
      if (eachTodo.id === id) {
        return {
          ...eachTodo,
          isCompleted: !eachTodo.isCompleted,
        }
      }

      return eachTodo
    })

    this.setState({todosList: updatedTodosList})
  }

  updateTodoTitle = (id, newTitle) => {
    const {todosList} = this.state

    const updatedTodosList = todosList.map(eachTodo => {
      if (eachTodo.id === id) {
        return {
          ...eachTodo,
          title: newTitle,
        }
      }

      return eachTodo
    })

    this.setState({todosList: updatedTodosList})
  }

  render() {
    const {todosList, userInput} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>

          <div className="add-todo-container">
            <input
              type="text"
              className="add-todo-input"
              placeholder="Add a todo"
              value={userInput}
              onChange={this.onChangeUserInput}
            />

            <button
              type="button"
              className="add-todo-btn"
              onClick={this.onAddTodo}
            >
              Add
            </button>
          </div>

          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleTodoComplete={this.toggleTodoComplete}
                updateTodoTitle={this.updateTodoTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
