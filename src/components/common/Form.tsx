import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

type YupSchemaType = string | boolean | undefined;

type FieldConfig = {
    name: string;
    label: string;
    type: 'text' | 'select' | 'checkbox';
    options?: string[];
    validation?: Yup.Schema<YupSchemaType>;
};

export type FormConfig = {
    fields: FieldConfig[];
};

type FormValues = {
    [key: string]: string | boolean;
};

export const DynamicForm: React.FC<FormConfig> = ({ fields }) => {
    const initialValues = fields.reduce<FormValues>((values, field) => {
        values[field.name] = field.type === 'checkbox' ? false : '';
        return values;
    }, {} as FormValues);

    const validationSchema = Yup.object(
        fields.reduce<{ [key: string]: Yup.Schema<YupSchemaType> }>((schema, field) => {
            if (field.validation) {
                schema[field.name] = field.validation;
            }
            return schema;
        }, {}),
    );

    const fakeServerRequest = (values: FormValues) => {
        return new Promise<{ [key: string]: string }>((resolve, reject) => {
            const errors: { [key: string]: string } = {};

            if (values.username === 'existingUser') {
                errors.username = 'Username already exists';
            }
            if (values.zip === '12345') {
                errors.zip = 'Invalid Zip Code 2';
            }

            if (Object.keys(errors).length > 0) {
                reject(errors);
            } else {
                resolve({ message: 'Form submitted successfully' });
            }
        });
    };

    const handleSubmit = (values: FormValues, { setErrors, resetForm, setSubmitting }: FormikHelpers<FormValues>) => {
        console.log('Sending values to server:', JSON.stringify(values, null));

        fakeServerRequest(values)
            .then((response) => {
                console.log('Server response:', response);
                alert(response.message);
                resetForm();
                setSubmitting(false);
            })
            .catch((error) => {
                console.error('Server errors received:', error);
                setErrors(error);
                setSubmitting(false);
            });
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    {fields.map((field) => (
                        <div key={field.name} className="col-md-4 mb-3">
                            <label htmlFor={field.name} className="form-label">
                                {field.label}
                            </label>

                            {field.type === 'select' ? (
                                <>
                                    <Field
                                        as="select"
                                        name={field.name}
                                        className={`form-select ${errors[field.name] && touched[field.name] ? 'is-invalid' : ''}`}>
                                        <option value="" disabled>
                                            Choose...
                                        </option>
                                        {field.options?.map((option, idx) => (
                                            <option key={idx} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name={field.name} component="div" className="invalid-feedback" />
                                </>
                            ) : field.type === 'checkbox' ? (
                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name={field.name}
                                        className={`form-check-input ${errors[field.name] && touched[field.name] ? 'is-invalid' : ''}`}
                                        id={field.name}
                                    />
                                    <label htmlFor={field.name} className="form-check-label">
                                        {field.label}
                                    </label>
                                    <ErrorMessage name={field.name} component="div" className="invalid-feedback" />
                                </div>
                            ) : (
                                <>
                                    <Field
                                        type={field.type}
                                        name={field.name}
                                        className={`form-control ${errors[field.name] && touched[field.name] ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name={field.name} component="div" className="invalid-feedback" />
                                </>
                            )}
                        </div>
                    ))}

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Submit Form
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
