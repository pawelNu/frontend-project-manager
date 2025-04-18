import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { InfoModal } from './InfoModal';
import { ReactNode, useState } from 'react';
import { AxiosResponse } from 'axios';
import { usePostApi } from '../../hooks/usePostApi';
import { toast } from 'react-toastify';
import { HasId, objectToString } from '../common';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import Spinner from 'react-bootstrap/esm/Spinner';

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
    const { request, loading } = usePostApi(serviceFunction);
    const [info, setInfo] = useState<string | undefined>(undefined);
    const [extraInfo, setExtraInfo] = useState<ReactNode>(null);

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

    const handleFieldChange = (
        fieldName: string,
        setFieldValue: FormikHelpers<FormValuesType>['setFieldValue'],
        setFieldError: FormikHelpers<FormValuesType>['setFieldError'],
    ) => {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const target = e.target;

            const value =
                target.type === 'checkbox' && 'checked' in target ? (target as HTMLInputElement).checked : target.value;

            setFieldValue(fieldName, value);
            setFieldError(fieldName, '');
        };
    };

    const handleClose = () => {
        setShowInfoModal(false);
        setInfo(undefined);
    };

    const handleSubmit = async (
        values: FormValuesType,
        { setErrors, resetForm, setSubmitting }: FormikHelpers<FormValuesType>,
    ) => {
        const result = await request(values as ArgumentType);

        if (result.success) {
            console.log(' success:', result);
            const data = result.data as HasId<ResponseDataType>;
            console.log(objectToString(data));
            console.log(data.id);
            resetForm();
            const subInfo = (
                <p>
                    {data.message} <Link to={routes.company.details(data.id)}>Go to</Link>
                </p>
            );
            setExtraInfo(subInfo);
            setShowInfoModal(true);
            toast.success('Created item.');
        } else if ('errors' in result) {
            console.log(' errors:', result.errors);
            setErrors(result.errors);
        } else if ('error' in result) {
            console.log(' error:', result.error);
            setInfo(result.error);
            setShowInfoModal(true);
        }

        setSubmitting(false);
    };

    if (loading)
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );

    return (
        <>
            <div className="container mb-3">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}>
                    {({ errors, touched, isSubmitting, setFieldValue, setFieldError }) => (
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
                                                className={`form-select ${errors[field.name] && touched[field.name] ? 'is-invalid' : ''}`}
                                                onChange={handleFieldChange(field.name, setFieldValue, setFieldError)}>
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
                                                onChange={handleFieldChange(field.name, setFieldValue, setFieldError)}
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
                                                onChange={handleFieldChange(field.name, setFieldValue, setFieldError)}
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
            {(info || extraInfo) && (
                <InfoModal message={info} show={showInfoModal} handleClose={handleClose}>
                    {extraInfo}
                </InfoModal>
            )}
        </>
    );
};
