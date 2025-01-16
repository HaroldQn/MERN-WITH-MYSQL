import { useNavigate } from "react-router-dom";
import { useTaks} from '../context/TaskProvider'

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTaks();
  const navigate = useNavigate();

  const handleDone = async() => {
    await toggleTaskDone(task.id);
  };
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.done == 1 ? "✔️" : "✖️"}</span>
      <span>{task.createAt}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
      <button onClick={() => handleDone(task.done)}>Toggle Task</button>
      <hr />
    </div>
  );
}

export default TaskCard;
// 