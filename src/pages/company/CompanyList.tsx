import {
    List,
    DatagridConfigurable,
    TextField,
    useListContext,
    TextInput,
    UrlField,
    FunctionField,
    Link,
} from 'react-admin';
import { DropdownActions } from '../../components/common/DropdownActions';
import { routes } from '../../config/routes';
import { ListActions } from '../../components/common/ListActions';
import { NameLinkField } from '../../components/common/NameLinkField';

const listFilters = [
    <TextInput source="name" label="Company Name" alwaysOn />,
    <TextInput source="nip" label="NIP" />,
    <TextInput source="regon" label="REGON" />,
];

const CompanyTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CompanyList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'name', order: 'ASC' }}
        actions={<ListActions />}
        title={<CompanyTitle />}>
        <DatagridConfigurable
            rowClick={false}
            sx={{
                '& .column-nip': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-regon': {
                    display: { xs: 'none', md: 'table-cell' },
                },
            }}>
            <NameLinkField source="name" resource="company" />
            <TextField source="nip" label="NIP" />
            <TextField source="regon" label="REGON" />
            <UrlField source="website" label="Website" target="_blank" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
