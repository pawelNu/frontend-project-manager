import * as Yup from 'yup';
import { DynamicForm, FormConfig, SubmitResponse, TFormValues } from '../../common/Form';
import { createCompany } from '../../../services/company';
import axios from 'axios';

// TODO refactor this function
const handleDynamicFormSubmit = async (values: TFormValues): Promise<SubmitResponse> => {
    try {
        const result = await createCompany(values);
        console.log(' handleDynamicFormSubmit   result:', JSON.stringify(result.data, null, 2));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(' handleDynamicFormSubmit   error:', error);

            if (error.response?.data?.errors) {
                const errorData = error.response?.data.errors;
                const formattedErrors: { [key: string]: string } = {};

                Object.keys(errorData).forEach((field) => {
                    formattedErrors[field] = errorData[field].join(', ');
                });

                console.log(' handleDynamicFormSubmit   formattedErrors:', formattedErrors);
                return { success: false, errors: formattedErrors };
            }

            const message = `${error.message}: ${error.response?.data?.error}`;
            console.log(' handleDynamicFormSubmit   message:', message);
            return { success: false, error: message };
        }
    }

    return { success: true };
};

const formConfig: FormConfig = {
    fields: [
        {
            name: 'name',
            label: 'Company Name',
            type: 'text',
            validation: Yup.string().required('Company Name is required'),
        },
        {
            name: 'nip',
            label: 'NIP',
            type: 'text',
            validation: Yup.string().required('NIP is required'),
        },
        {
            name: 'regon',
            label: 'REGON',
            type: 'text',
            validation: Yup.string().required('REGON is required'),
        },
        {
            name: 'website',
            label: 'Website',
            type: 'text',
            validation: Yup.string().required('Website is required'),
        },
    ],
    onSubmit: handleDynamicFormSubmit,
};

export const CompanyCreate = () => {
    return (
        <div className="container">
            <h1>Company Create Form</h1>
            <DynamicForm fields={formConfig.fields} onSubmit={handleDynamicFormSubmit} />
        </div>
    );
};
