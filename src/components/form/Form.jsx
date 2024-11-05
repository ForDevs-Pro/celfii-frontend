import { SimpleForm } from "react-admin";
import { Formik, Form, ErrorMessage, validateYupSchema } from "formik";
import { AdminField, FormField } from "../field/Field";



export const AdminForm = ({ initialValues, fields, onSubmit, validationSchema }) => {
  const validateWithYup = (schema) => async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
      return {};
    } catch (error) {
      return error.inner.reduce((errors, err) => {
        errors[err.path] = err.message;
        return errors;
      }, {});
    }
  };
  return (
    <SimpleForm onSubmit={onSubmit} initialValues={initialValues} validate={validateWithYup(validationSchema)}>
      {fields.map((field, index) => (
        <div key={index}>
          <AdminField field={field} />
        </div>
      ))}
    </SimpleForm>
  );
};

export const GenericForm = ({
  initialValues,
  validationSchema,
  fields,
  onSubmit,
  buttonLabel,
  children,
}) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, ...form }) => (
        <Form>
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <FormField field={field} form={form} />
              <ErrorMessage name={field.name} component="div" />
            </div>
          ))}
          {children}
          <button type="submit" disabled={isSubmitting}>
            {buttonLabel}
          </button>
        </Form>
      )}
    </Formik>
  );
};
