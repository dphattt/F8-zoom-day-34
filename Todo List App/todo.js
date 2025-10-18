const $ = document.querySelector.bind(document);
const { useState } = React;

function TodoForm({ inputValue, handleSubmit, handleInputChange }) {
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Add new task here..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="btn-add" type="submit">
        Add
      </button>
    </form>
  );
}

function RenderNewTask({ task, handleCheck, handleDelete }) {
  return (
    <li className="new-task">
      <input
        id={task.id}
        type="checkbox"
        checked={task.completed}
        onChange={handleCheck}
      />
      <label htmlFor={task.id} className="task-label">
        {task.text}
      </label>
      <button className="btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

function EmptyTask() {
  return (
    <div className="empty-task">
      "There are currently no tasks. Create a new one."
    </div>
  );
}

let uniqId = 0;

function TodoApp() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: ++uniqId, text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };
  const handleCheck = (e, id) => {
    const completed = e.target.checked;
    setTodos(
      todos.map((task) => {
        return task.id === id ? { ...task, completed: completed } : task;
      })
    );
  };

  const handleDelete = (id) => {
    const isConfirm = window.confirm("Do you really want to delete this task?");
    if (isConfirm) {
      setTodos(todos.filter((task) => task.id !== id));
    }
  };

  const handleCompleteCount = () => {
    return todos.filter((task) => task.completed).length;
  };
  const handleRemainingCount = () => {
    return todos.filter((task) => !task.completed).length;
  };
  const handleTotalCount = () => {
    return todos.length;
  };
  return (
    <div className="todo">
      <h1> Todo List</h1>
      <TodoForm
        inputValue={inputValue}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />

      {todos.length === 0 ? <EmptyTask /> : ""}

      <ul className="tasks-wrapper">
        {todos.map((task) => (
          <RenderNewTask
            key={task.id}
            task={task}
            handleCheck={(e) => handleCheck(e, task.id)}
            handleDelete={() => handleDelete(task.id)}
          />
        ))}
      </ul>
      <ul className="status">
        <li className="status-total">Total: {handleTotalCount()} tasks</li>
        <li className="status-complete">
          Complete: {handleCompleteCount()} tasks
        </li>
        <li className="status-remaining">
          Remaining: {handleRemainingCount()} tasks
        </li>
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot($("#root"));
root.render(<TodoApp />);
