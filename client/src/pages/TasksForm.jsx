import { Form, Formik } from "formik";
import { useTaks } from '../context/TaskProvider'

function TasksForm() {
  const {createTask} = useTaks()

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={async (values, actions) => {
          await createTask(values);
          actions.resetForm();
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
