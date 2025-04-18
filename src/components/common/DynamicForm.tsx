import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { InfoModal } from './InfoModal';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import { usePostApi } from '../../hooks/usePostApi';
import { toast } from 'react-toastify';
import { HasId, objectToString } from '../common';
import { Link, useParams } from 'react-router-dom';
import { routes } from '../routes';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useGetApi } from '../../hooks/useGetApi';
import { useMemoizedServiceFunctions } from '../../hooks/useMemoizedServiceFunctions';

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

export type ServiceFunction<ArgumentType, ResponseDataType> = (
    id: string | undefined,
    values: ArgumentType,
) => Promise<AxiosResponse<ResponseDataType>>;

export type FormConfig<ArgumentType, ResponseDataType> = {
    fields: FieldConfig[];
    mode: 'create' | 'edit';
    postPutServiceFunction: ServiceFunction<ArgumentType, ResponseDataType>;
    getServiceFunction: (id: string) => Promise<AxiosResponse<ResponseDataType>>;
};

export type FormValuesType = {
    [key: string]: string | boolean | number;
};

export const DynamicForm = <ArgumentType extends FormValuesType, ResponseDataType>({
    fields,
    postPutServiceFunction,
    mode,
    getServiceFunction,
}: FormConfig<ArgumentType, ResponseDataType>) => {
    const { id } = useParams();
    const [formData, setFormData] = useState<FormValuesType | null>(null);
    const { memoizedPostPutServiceFunction, memoizedGetServiceFunction } = useMemoizedServiceFunctions(
        postPutServiceFunction,
        getServiceFunction,
    );
    // const { request, loading } = usePostApi(postPutServiceFunction);
    // const { data: apiData, error: apiError, request: fetchData } = useGetApi(getServiceFunction);
    const { request, loading } = usePostApi(memoizedPostPutServiceFunction);
    const { data: apiData, error: apiError, request: fetchData } = useGetApi(memoizedGetServiceFunction);
    const [info, setInfo] = useState<string | undefined>(undefined);
    const [extraInfo, setExtraInfo] = useState<ReactNode>(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const initialValues = useMemo(() => {
        return fields.reduce<FormValuesType>((values, field) => {
            values[field.name] = field.type === 'checkbox' ? false : '';
            return values;
        }, {});
    }, [fields]);

    const mapDataToFormValues = useCallback(
        (data: NonNullable<ResponseDataType>, fields: FieldConfig[]): FormValuesType => {
            return fields.reduce<FormValuesType>((acc, field) => {
                const value = data[field.name as keyof ResponseDataType];

                switch (field.type) {
                    case 'checkbox':
                        acc[field.name] = value === true || value === 'true';
                        break;
                    case 'select':
                    case 'text':
                    case 'email':
                    case 'number':
                        if (typeof value === 'string' || typeof value === 'number') {
                            acc[field.name] = value;
                        } else {
                            acc[field.name] = '';
                        }
                        break;
                    default:
                        acc[field.name] = '';
                        break;
                }

                return acc;
            }, {} as FormValuesType);
        },
        [],
    );

    useEffect(() => {
        if (mode === 'edit' && id && !apiData && !apiError) {
            fetchData(id);
        }
    }, [apiData, apiError, fetchData, id, mode]);

    useEffect(() => {
        if (apiData) {
            const mappedValues = mapDataToFormValues(apiData, fields);
            console.log(' useEffect   mappedValues:', mappedValues);
            const areEqual = JSON.stringify(mappedValues) === JSON.stringify(formData);
            console.log(' useEffect   formData:', formData);

            if (!areEqual) {
                setFormData(mappedValues);
            }
        } else if (formData === null) {
            setFormData(initialValues);
        }
    }, [apiData, fields, formData, initialValues, mapDataToFormValues]);

    const validationSchema = Yup.object(
        fields.reduce<{ [key: string]: Yup.Schema<YupSchemaType> }>((schema, field) => {
            if (field.validation) {
                schema[field.name] = field.validation;
            }
            return schema;
        }, {}),
    );

    const handleFieldChange = useCallback(
        (
            fieldName: string,
            setFieldValue: FormikHelpers<FormValuesType>['setFieldValue'],
            setFieldError: FormikHelpers<FormValuesType>['setFieldError'],
        ) => {
            return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                const target = e.target;

                const value =
                    target.type === 'checkbox' && 'checked' in target
                        ? (target as HTMLInputElement).checked
                        : target.value;

                setFieldValue(fieldName, value);
                setFieldError(fieldName, '');
            };
        },
        [],
    );

    const handleClose = () => {
        setShowInfoModal(false);
        setInfo(undefined);
    };

    const handleSubmit = async (
        values: FormValuesType,
        { setErrors, resetForm, setSubmitting }: FormikHelpers<FormValuesType>,
    ) => {
        const result = await request(mode === 'edit' ? id : undefined, values as ArgumentType);
        console.log(' values:', JSON.stringify(values, null, 2));
        console.log(' id:', id);
        console.log(' mode:', mode);

        if (result.success) {
            console.log(' success:', result);
            const data = result.data as HasId<ResponseDataType>;
            console.log(objectToString(data));
            console.log(data.id);
            resetForm();
            if (mode === 'edit' && id) {
                await fetchData(id);
            }
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

    return (
        <>
            <div className="container mb-3">
                {formData && (
                    <Formik
                        initialValues={formData != null ? formData : initialValues}
                        enableReinitialize={true}
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
                                                    onChange={handleFieldChange(
                                                        field.name,
                                                        setFieldValue,
                                                        setFieldError,
                                                    )}>
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
                                                    onChange={handleFieldChange(
                                                        field.name,
                                                        setFieldValue,
                                                        setFieldError,
                                                    )}
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
                                                    onChange={handleFieldChange(
                                                        field.name,
                                                        setFieldValue,
                                                        setFieldError,
                                                    )}
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
                                    {loading === true ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            Submit Form
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
            {(info || extraInfo) && (
                <InfoModal message={info} show={showInfoModal} handleClose={handleClose}>
                    {extraInfo}
                </InfoModal>
            )}
        </>
    );
};
