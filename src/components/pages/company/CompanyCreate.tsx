import * as Yup from 'yup';
import { DynamicForm, FormConfig, TFormValues } from '../../common/Form';
import { createCompany } from '../../../services/company';
import axios from 'axios';

// TODO test form after changes
// TODO add validation from server
const handleDynamicFormSubmit = async (values: TFormValues) => {
    try {
        const result = await createCompany(values);
        console.log(' handleDynamicFormSubmit   result:', JSON.stringify(result.data, null, 2));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = `${error.message}: ${error.response?.data?.error}`;
            return { success: false, error: message };
        }
    }
    // TODO validation form server not tested, json-server does not throw errors

    return { message: 'Form submitted successfully!' };
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
