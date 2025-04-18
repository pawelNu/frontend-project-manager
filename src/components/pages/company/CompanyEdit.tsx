import * as Yup from 'yup';
import { DynamicForm, FormConfig, FormValuesType } from '../../common/DynamicForm';
import { CompanyNotFull, updateCompany } from '../../../services/company';

const formConfig: FormConfig<FormValuesType, CompanyNotFull> = {
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
    serviceFunction: updateCompany,
    mode: 'edit',
};

// TODO fix Edit form
// TODO added fetching data from api
export const CompanyEdit = () => {
    return (
        <div className="container">
            <h1>Company Edit Form</h1>
            <DynamicForm
                fields={formConfig.fields}
                serviceFunction={formConfig.serviceFunction}
                mode={formConfig.mode}
            />
        </div>
    );
};
