import {
    AutocompleteArrayInput,
    AutocompleteInput,
    Create,
    SimpleForm,
    required,
    useCreateContext,
    useDefaultTitle,
    useGetList,
} from 'react-admin';
import { ShowActions } from '../../../../components/common/ShowActions';

const EmployeeAuthorityTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const EmployeeAuthorityCreate = () => {
    const employees = useGetList('employees', {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'id', order: 'ASC' },
    });

    const authorities = useGetList('authorities', {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'id', order: 'ASC' },
    });
    return (
        <Create title={<EmployeeAuthorityTitle />} actions={<ShowActions />} mutationMode="pessimistic">
            <SimpleForm sx={{ maxWidth: 500 }}>
                <AutocompleteInput
                    source="employeeId"
                    label="Employee"
                    choices={employees.data ?? []}
                    optionText={(record) => `${record.firstName} ${record.lastName} - ${record.username}`}
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={employees.isLoading}
                />
                <AutocompleteArrayInput
                    source="authorityIds"
                    label="Authority"
                    choices={authorities.data ?? []}
                    optionText="name"
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={authorities.isLoading}
                />
            </SimpleForm>
        </Create>
    );
};
