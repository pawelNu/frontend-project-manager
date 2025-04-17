import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { InfoModal } from './InfoModal';
import { useState } from 'react';

type YupSchemaType = string | boolean | undefined;
type FieldType = 'text' | 'select' | 'checkbox' | 'email' | 'number';

type FieldConfig = {
    name: string;
    label: string;
    type: FieldType;
    options?: string[];
    validation?: Yup.Schema<YupSchemaType>;
};

export type SubmitResponse =
    | { success: true }
    | { success: false; errors: { [key: string]: string } }
    | { success: false; error: string };

export type FormConfig = {
    fields: FieldConfig[];
    onSubmit: (values: TFormValues) => Promise<SubmitResponse>;
};

export type TFormValues = {
    [key: string]: string | boolean;
};

export const DynamicForm: React.FC<FormConfig> = ({ fields, onSubmit }) => {
    const [error, setError] = useState<string>('');
    const [showInfoModal, setShowInfoModal] = useState(false);
    const initialValues = fields.reduce<TFormValues>((values, field) => {
        values[field.name] = field.type === 'checkbox' ? false : '';
        return values;
    }, {} as TFormValues);

    const validationSchema = Yup.object(
        fields.reduce<{ [key: string]: Yup.Schema<YupSchemaType> }>((schema, field) => {
            if (field.validation) {
                schema[field.name] = field.validation;
            }
            return schema;
        }, {}),
    );

    const handleClose = () => {
        setShowInfoModal(false);
        setError('');
    };

    const handleSubmit = async (
        values: TFormValues,
        { setErrors, resetForm, setSubmitting }: FormikHelpers<TFormValues>,
    ) => {
        console.log('Sending values to server:', JSON.stringify(values, null, 2));

        try {
            const response = await onSubmit(values);
            console.log(' response:', response);

            if (!response.success) {
                if ('errors' in response) {
                    console.log(' errors:', response.errors);
                    setErrors(response.errors);
                } else if ('error' in response) {
                    console.log('error ', response.error);
                    setError(response.error);
                    setShowInfoModal(true);
                }
            } else {
                resetForm();
            }
        } catch (error) {
            console.error('Unexpected error during submission:', error);
            alert('Unexpected error during submission');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="container mb-3">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ errors, touched, isSubmitting }) => (
                        <Form autoComplete="off">
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
                                            <ErrorMessage
                                                name={field.name}
                                                component="div"
                                                className="invalid-feedback"
                                            />
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
                                            <ErrorMessage
                                                name={field.name}
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <Field
                                                type={field.type}
                                                name={field.name}
                                                className={`form-control ${errors[field.name] && touched[field.name] ? 'is-invalid' : ''}`}
                                            />
                                            <ErrorMessage
                                                name={field.name}
                                                component="div"
                                                className="invalid-feedback"
                                            />
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
            </div>
            {error && <InfoModal message={error} show={showInfoModal} handleClose={handleClose} />}
        </>
    );
};
