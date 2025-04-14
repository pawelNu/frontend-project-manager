import * as Yup from 'yup';
import { DynamicForm, FormConfig, TFormValues } from '../../common/Form';
import { createCompany } from '../../../client/company';

const handleDynamicFormSubmit = async (values: TFormValues) => {
    const result = await createCompany(values);
    if (result.success) {
        console.log(' handleDynamicFormSubmit   result:', JSON.stringify(result.data, null, 2));
    } else {
        alert(result.error);
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

export const CompanyEdit = () => {
    return (
        <div className="container">
            <h1>Company Edit Form</h1>
            <DynamicForm fields={formConfig.fields} onSubmit={handleDynamicFormSubmit} />
        </div>
    );
};
