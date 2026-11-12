import {Component} from 'react'

import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    editedTitle: '',
  }

  onDelete = () => {
    const {todoDetails, deleteTodo} = this.props
    const {id} = todoDetails
    deleteTodo(id)
  }

  onToggleComplete = () => {
    const {todoDetails, toggleTodoComplete} = this.props
    const {id} = todoDetails
    toggleTodoComplete(id)
  }

  onChangeEditedTitle = event => {
    this.setState({editedTitle: event.target.value})
  }

  onClickEdit = () => {
    const {todoDetails} = this.props
    const {title} = todoDetails
    this.setState({isEditing: true, editedTitle: title})
  }

  onClickSave = () => {
    const {todoDetails, updateTodoTitle} = this.props
    const {id} = todoDetails
    const {editedTitle} = this.state
    const trimmedTitle = editedTitle.trim()

    if (trimmedTitle !== '') {
      updateTodoTitle(id, trimmedTitle)
    }

    this.setState({isEditing: false})
  }

  render() {
    const {todoDetails} = this.props
    const {title, isCompleted} = todoDetails
    const {isEditing, editedTitle} = this.state

    const titleClassName = isCompleted ? 'title completed-title' : 'title'

    return (
      <li className="todo-item">
        <div className="todo-details-container">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={isCompleted}
            onChange={this.onToggleComplete}
          />
          {isEditing ? (
            <input
              type="text"
              className="edit-todo-input"
              value={editedTitle}
              onChange={this.onChangeEditedTitle}
            />
          ) : (
            <p className={titleClassName}>{title}</p>
          )}
        </div>
        <div className="todo-buttons-container">
          {isEditing ? (
            <button
              type="button"
              className="edit-btn"
              onClick={this.onClickSave}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="edit-btn"
              onClick={this.onClickEdit}
            >
              Edit
            </button>
          )}
          <button type="button" className="delete-btn" onClick={this.onDelete}>
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
