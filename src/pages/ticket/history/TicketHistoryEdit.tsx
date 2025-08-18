import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    useEditContext,
    useDefaultTitle,
    useGetList,
    AutocompleteInput,
    DateInput,
} from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../components/common/ShowActions';
import { useWatch } from 'react-hook-form';
import { parseDateToISOString, formatISOStringToDate } from '../../../components/shared';

const TicketHistoryTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Ticket History'}</span>
        </>
    );
};

const TicketHistoryFormContent = () => {
    const categories = useGetList(routes.categoryValue.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'stringValue', order: 'ASC' },
        filter: { categoryName: 'ticket status' },
    });

    const projects = useGetList(routes.project.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'name', order: 'ASC' },
    });

    const priorities = useGetList(routes.categoryValue.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'numericValue', order: 'ASC' },
        filter: { categoryName: 'ticketHistory priority' },
    });

    const projectId = useWatch({ name: 'projectId' });

    const projectSteps = useGetList(
        routes.projectStep.name(),
        {
            pagination: { page: 1, perPage: 9999 },
            sort: { field: 'lastName', order: 'ASC' },
            filter: projectId ? { projectId: projectId } : {},
        },
        {
            enabled: Boolean(projectId),
        },
    );

    return (
        <>
            <TextInput source="title" label="Ticket History Title" validate={required()} fullWidth />

            <AutocompleteInput
                source="categoryValueId"
                label="Category"
                choices={categories.data ?? []}
                optionText={(record) => `${record.stringValue}`}
                optionValue="id"
                validate={required()}
                fullWidth
                isLoading={categories.isLoading}
            />

            <DateInput
                source="deadline"
                label="Deadline"
                validate={required()}
                fullWidth
                parse={parseDateToISOString}
                format={formatISOStringToDate}
            />

            <AutocompleteInput
                source="priorityValueId"
                label="Priority"
                choices={priorities.data ?? []}
                optionText={(record) => `${record.numericValue} - ${record.stringValue}`}
                optionValue="id"
                validate={required()}
                fullWidth
                isLoading={priorities.isLoading}
            />

            <AutocompleteInput
                source="projectId"
                label="Project"
                choices={projects.data ?? []}
                optionText={(record) => `${record.name}`}
                optionValue="id"
                validate={required()}
                fullWidth
                isLoading={projects.isLoading}
            />

            <AutocompleteInput
                source="projectStepId"
                label="Project Step"
                choices={projectSteps.data ?? []}
                optionText={(record) => `${record.name}`}
                optionValue="id"
                validate={required()}
                fullWidth
                isLoading={projectSteps.isLoading}
                disabled={!projectId}
            />

            <TextInput
                source="additionalDetails"
                label="Additional Details"
                validate={required()}
                fullWidth
                multiline
            />
        </>
    );
};

export const TicketHistoryEdit = () => {
    const onError = useNotFoundErrorHandler(routes.ticketHistory.list());
    return (
        <Edit title={<TicketHistoryTitle />} actions={<ShowActions />} mutationMode="pessimistic" queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TicketHistoryFormContent />
            </SimpleForm>
        </Edit>
    );
};
