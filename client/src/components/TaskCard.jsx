import {useTaks} from '../context/TaskProvider'

function TaskCard({ task }) {
  const {deleteTask} = useTaks()

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.done == 1 ? "✔️" : "✖️"}</span>
      <span>{task.createAt}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button>Edit</button>
    </div>
  );
}

export default TaskCard;
