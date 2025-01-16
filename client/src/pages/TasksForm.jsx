import { Form, Formik } from "formik";
import { useTaks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TasksForm() {
  const { createTask, getTask, updateTask } = useTaks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const task = await getTask(id);
        console.log(task);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (id) {
            updateTask(id, values);
          } else {
            createTask(values);
          }
          navigate("/");
          setTask({
            title: "",
            description: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-md p-4 rounded-md mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {id ? "Update Task" : "Create Task"}
            </h1>
            <label htmlFor="" className="block">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={values.title}
              className="px-2 py-1 rounded-sm w-full"
            />

            <label htmlFor="" className="block">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Description"
              onChange={handleChange}
              value={values.description}
              className="px-2 py-1 rounded-sm w-full"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 rounded-md text-white w-full"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
