import { List, DatagridConfigurable, TextField, useListContext, TextInput, FunctionField } from 'react-admin';
import { DropdownActions } from '../../../components/common/DropdownActions';
import { ListActions } from '../../../components/common/ListActions';

const listFilters = [
    <TextInput source="companyName" label="Company Name" alwaysOn />,
    <TextInput source="city" label="City" />,
    <TextInput source="street" label="Street" />,
];

const CompanyAddressTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CompanyAddressList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'companyName', order: 'ASC' }}
        actions={<ListActions />}
        title={<CompanyAddressTitle />}>
        <DatagridConfigurable
            rowClick="expand"
            sx={{
                '& .column-nip': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-regon': {
                    display: { xs: 'none', md: 'table-cell' },
                },
            }}>
            <TextField source="companyName" />
            <TextField source="street" />
            <TextField source="streetNumber" />
            <TextField source="city" />
            <TextField source="zipCode" />
            <TextField source="country" />
            <TextField source="phoneNumber" />
            <TextField source="emailAddress" />
            <TextField source="addressType" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
