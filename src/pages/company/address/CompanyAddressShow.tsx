import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../components/common/ShowActions';

const CompanyAddressShowTitle = () => {
    const record = useRecordContext();
    return <span>Company: {record?.name}</span>;
};

export const CompanyAddressShow = () => {
    const onError = useNotFoundErrorHandler(routes.companyAddress.list());
    return (
        <Show
            title={<CompanyAddressShowTitle />}
            actions={<ShowActions />}
            queryOptions={{ onError }}
            emptyWhileLoading>
            <SimpleShowLayout>
                <TextField source="companyName" />
                <TextField source="street" />
                <TextField source="streetNumber" />
                <TextField source="city" />
                <TextField source="zipCode" />
                <TextField source="country" />
                <TextField source="phoneNumber" />
                <TextField source="emailAddress" />
                <TextField source="addressType" />
            </SimpleShowLayout>
        </Show>
    );
};
