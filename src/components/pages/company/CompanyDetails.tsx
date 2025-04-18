import { useEffect, useState } from 'react';
import { Address, Company, Contact, ContactEmployee, getCompanyById } from '../../../services/company';
import { useParams } from 'react-router-dom';
import { ErrorResponse } from '../../common';
import { useGetApi } from '../../../hooks/useGetApi';

export const CompanyDetails = () => {
    const { id } = useParams();
    const [error, setError] = useState<ErrorResponse[]>([]);
    const [company, setCompany] = useState<Company | null>(null);

    const { data: companyData, loading, error: companyError, request: fetchCompany } = useGetApi(getCompanyById);

    useEffect(() => {
        if (!id) {
            setError([{ message: 'Missing id in params', type: 'Validation Error' }]);
            return;
        }

        fetchCompany(id);
    }, [id, fetchCompany]);

    useEffect(() => {
        if (companyData) {
            setCompany(companyData);
        }
        if (companyError) {
            setError((prev) => [...prev, { message: companyError, type: 'API Error' }]);
        }
    }, [companyData, companyError]);

    return (
        <>
            <div className="container">
                <h1>Company Details</h1>
                {loading && <p>Loading...</p>}
                {error &&
                    !company &&
                    error.map((err, i) => (
                        <p key={i} style={{ color: 'red' }}>
                            {err.type}: {err.message}
                        </p>
                    ))}
                {company && (
                    <>
                        <CompanyInfo company={company} />
                        <CompanyContactsDetails contacts={company.contacts} />
                        <AddressDetails addresses={company.addresses} />
                        <CompanyContactEmployeesDetails contactEmployees={company.contactEmployees} />
                    </>
                )}
            </div>
        </>
    );
};

const CompanyInfo = ({ company }: { company: Company }) => {
    return (
        <>
            <ul className="list-group">
                <li className="list-group-item">
                    <b>ID:</b> {company?.id}
                </li>
                <li className="list-group-item">
                    <b>Name:</b> {company?.name}
                </li>
                <li className="list-group-item">
                    <b>NIP:</b> {company?.nip}
                </li>
                <li className="list-group-item">
                    <b>REGON:</b> {company?.regon}
                </li>
                <li className="list-group-item">
                    <b>Website:</b>{' '}
                    <a href={company?.website} target="_blank">
                        {company?.website}
                    </a>
                </li>
            </ul>
        </>
    );
};

const CompanyContactsDetails = ({ contacts }: { contacts: Contact[] }) => {
    return (
        <>
            <div className="container my-3">
                <h1>Contacts Details</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
                    {contacts.map((contact, index) => (
                        <div key={index} className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{contact.type === 'phone' ? 'phone' : 'email'}</h5>
                                    {contact.type === 'email' ? (
                                        <div className="card-text">
                                            <a href={`mailto:${contact.value}`}>{contact.value}</a>
                                        </div>
                                    ) : (
                                        <div className="card-text">{contact.value}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const AddressDetails = ({ addresses }: { addresses: Address[] }) => {
    return (
        <>
            <div className="container my-3">
                <h1>Addresses Details</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
                    {addresses.map((address, index) => (
                        <div key={index} className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">City: {address.city}</h5>
                                    <div className="card-text">{address.street}</div>
                                    <div className="card-text">
                                        {address.postalCode} {address.city}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const CompanyContactEmployeesDetails = ({ contactEmployees }: { contactEmployees: ContactEmployee[] }) => {
    return (
        <>
            <div className="container my-3">
                <h1>Contact Employees Details</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
                    {contactEmployees.map((employee, index) => (
                        <div key={index} className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {employee.firstName} {employee.lastName}
                                    </h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{employee.position}</h6>
                                    <div className="card-text">{employee.phone}</div>
                                    <div className="card-text">
                                        <a href={`mailto:${employee.email}`}>{employee.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
