import * as Yup from 'yup';
import { DynamicForm, FormConfig, FormValuesType } from '../../common/DynamicForm';
import { CompanyNotFull, createCompany, getCompanyById } from '../../../services/company';

export const CompanyCreate = () => {
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
        postPutServiceFunction: createCompany,
        mode: 'create',
        getServiceFunction: getCompanyById,
    };
    return (
        <div className="container">
            <h1>Company Create Form</h1>
            <DynamicForm config={formConfig} />
        </div>
    );
};
