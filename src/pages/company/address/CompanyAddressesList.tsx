import {
    List,
    DatagridConfigurable,
    TextField,
    TopToolbar,
    ExportButton,
    SelectColumnsButton,
    FilterButton,
    useListContext,
    TextInput,
    CreateButton,
    FunctionField,
} from 'react-admin';
import { DropdownActions } from '../../../components/common/DropdownActions';

const listFilters = [<TextInput source="city" label="City" alwaysOn />, <TextInput source="street" label="Street" />];

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
        <SelectColumnsButton />
        <ExportButton />
    </TopToolbar>
);

const CompanyTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CompanyAddressesList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'city', order: 'ASC' }}
        actions={<ListActions />}
        title={<CompanyTitle />}>
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
