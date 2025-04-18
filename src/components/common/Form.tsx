import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { InfoModal } from './InfoModal';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { usePostApi } from '../../hooks/usePostApi';

type YupSchemaType = string | boolean | undefined;
type FieldType = 'text' | 'select' | 'checkbox' | 'email' | 'number';

type FieldConfig = {
    name: string;
    label: string;
    type: FieldType;
    options?: string[];
    validation?: Yup.Schema<YupSchemaType>;
};

export type SubmitResponse<ResponseDataType> =
    | { success: true; data: ResponseDataType }
    | { success: false; errors: Record<string, string> }
    | { success: false; error: string };

export type FormConfig<ArgumentType, ResponseDataType> = {
    fields: FieldConfig[];
    serviceFunction: (values: ArgumentType) => Promise<AxiosResponse<ResponseDataType>>;
};

export type FormValuesType = {
    [key: string]: string | boolean;
};

export const DynamicForm = <ArgumentType extends FormValuesType, ResponseDataType>({
    fields,
    serviceFunction,
}: FormConfig<ArgumentType, ResponseDataType>) => {
    const { request } = usePostApi(serviceFunction);
    const [error, setError] = useState<string | null>(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const initialValues = fields.reduce<FormValuesType>((values, field) => {
        values[field.name] = field.type === 'checkbox' ? false : '';
        return values;
    }, {} as FormValuesType);

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
        setError(null);
    };

    const handleSubmit = async (
        values: FormValuesType,
        { setErrors, resetForm, setSubmitting }: FormikHelpers<FormValuesType>,
    ) => {
        const result = await request(values as ArgumentType);

        if (result.success) {
            console.log(' success:', result.success);
            resetForm();
        } else if ('errors' in result) {
            console.log(' errors:', result.errors);
            setErrors(result.errors);
        } else if ('error' in result) {
            console.log(' error:', result.error);
            setError(result.error);
            setShowInfoModal(true);
        }

        setSubmitting(false);
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
