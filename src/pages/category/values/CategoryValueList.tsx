import { List, DatagridConfigurable, useListContext, TextInput, FunctionField, TextField } from 'react-admin';
import { DropdownActions } from '../../../components/common/DropdownActions';
import { ListActions } from '../../../components/common/ListActions';
import { NameLinkField } from '../../../components/common/NameLinkField';

const listFilters = [<TextInput source="categoryName" label="Category Value Name" alwaysOn />];

const CategoryValueTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CategoryValueList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'name', order: 'ASC' }}
        actions={<ListActions />}
        title={<CategoryValueTitle />}>
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
            <NameLinkField source="categoryName" resource="categoryValue" />
            <TextField source="numericValue" label="Numeric Value" />
            <TextField source="stringValue" label="String Value" />
            <TextField source="dateValue" label="Date Value" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
