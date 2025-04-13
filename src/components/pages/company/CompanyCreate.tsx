import * as Yup from 'yup';
import { DynamicForm, FormConfig } from '../../common/Form';

// type FormValues = {
//     firstName: string;
//     lastName: string;
//     username: string;
//     city: string;
//     state: string;
//     zip: string;
//     terms: boolean;
// };

const formConfig: FormConfig = {
    fields: [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            validation: Yup.string().required('First name is required'),
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            validation: Yup.string().required('Last name is required'),
        },
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            validation: Yup.string().required('Username is required'),
        },
        {
            name: 'city',
            label: 'City',
            type: 'text',
            validation: Yup.string().required('City is required'),
        },
        {
            name: 'state',
            label: 'State',
            type: 'select',
            options: ['California', 'Texas', 'Florida'],
            validation: Yup.string().required('State is required'),
        },
        {
            name: 'zip',
            label: 'Zip Code',
            type: 'text',
            validation: Yup.string().required('Zip is required'),
        },
        {
            name: 'terms',
            label: 'Agree to terms',
            type: 'checkbox',
            validation: Yup.boolean().oneOf([true], 'You must agree to the terms'),
        },
    ],
};

export const CompanyCreate = () => {
    return (
        <div className="container">
            <h1>Company Create Form</h1>
            <DynamicForm fields={formConfig.fields} />
        </div>
    );
};
