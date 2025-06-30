import { List, DatagridConfigurable, useListContext, TextInput, FunctionField, Link } from 'react-admin';
import { DropdownActions } from '../../components/common/DropdownActions';
import { routes } from '../../config/routes';
import { ListActions } from '../../components/common/ListActions';

const listFilters = [<TextInput source="name" label="Category Name" alwaysOn />];

const CategoryTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CategoryList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'name', order: 'ASC' }}
        actions={<ListActions />}
        title={<CategoryTitle />}>
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
            <FunctionField
                label="Category Name"
                render={(record) => (
                    <Link
                        to={routes.Category.show(record.id)} /*style={{ textDecoration: 'none', color: 'inherit' }}*/
                    >
                        {record.name}
                    </Link>
                )}
            />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
