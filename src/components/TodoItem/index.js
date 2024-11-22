import './index.css'

const TodoItem = props => {
  const {
    todoDetails,
    onClickDelete,
    onCheckedTask,
    onClickEdit,
    onChangeTitle,
  } = props
  const {id, title, taskCompleted, editing, updatedTitle} = todoDetails

  const onDelete = () => onClickDelete(id)
  const onCompleteTask = () => onCheckedTask(id)
  const onEdit = () => onClickEdit(id)
  const onChangeText = event => onChangeTitle(id, event.target.value)

  const striked = taskCompleted ? 'strike' : ''
  const buttonText = editing ? 'Save' : 'Edit'

  return (
    <li className="item-container">
      {!editing && (
        <div className="todo-text-container">
          <input
            type="checkbox"
            className="checkbox"
            checked={taskCompleted}
            onChange={onCompleteTask}
          />
          <p className={`item-details ${striked}`}>{title}</p>
        </div>
      )}
      {editing && (
        <div>
          <input
            type="text"
            className="title-text"
            value={updatedTitle}
            onChange={onChangeText}
          />
        </div>
      )}
      <div>
        <button type="button" className="delete-button" onClick={onEdit}>
          {buttonText}
        </button>
        <button type="button" className="delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
