import { Form, Formik } from "formik";
import { createTaskRequest } from "../api/tasks.api";
function TasksForm() {
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={async (values) => {
          try {
            const response = await createTaskRequest(values);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
            />

            <label htmlFor="">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Description"
              onChange={handleChange}
            />

            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
