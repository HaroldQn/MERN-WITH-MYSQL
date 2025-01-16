import { Form, Formik } from "formik";
import { useTaks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TasksForm() {
  const { createTask, getTask, updateTask } = useTaks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  })

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() =>{
    const loadTask = async () => {
      if (id) {
        const task = await getTask(id)
        console.log(task)
        setTask({
          title: task.title,
          description: task.description
        })
      }
    }
    loadTask()
  }, [])

  return (
    <div>
      <h1>{id ? "Update Task" : "Create Task"}</h1>

      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (id) {
            updateTask(id, values);
            navigate('/')
          }else{
            createTask(values);
          }
          setTask({
            title: "",
            description: "",
          });
          
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={values.title}
            />

            <label htmlFor="">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Description"
              onChange={handleChange}
              value={values.description}
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
