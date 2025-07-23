import React from 'react';
import { useRecordContext } from 'react-admin';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';

type ResourceName = Exclude<keyof typeof routes, 'page'>;

type NameLinkFieldProps = {
    label?: string;
    source?: string;
    resource?: ResourceName;
};

export const NameLinkField: React.FC<NameLinkFieldProps> = ({ source = 'name', resource = 'project' }) => {
    const record = useRecordContext();
    if (!record) return null;

    const to = record.id ? routes[resource].show(record.id) : '#';

    return (
        <Link to={to} style={{ color: '#90caf9' }}>
            {record[source]}
        </Link>
    );
};
