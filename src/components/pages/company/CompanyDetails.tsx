import { useCallback, useEffect, useState } from 'react';
import {
    Address,
    Company,
    Contact,
    ContactEmployee,
    getCompanyAddressesByCompanyId,
    getCompanyById,
    getCompanyContactEmployeesByCompanyId,
    getCompanyContactsByCompanyId,
} from '../../../client/company';
import { useParams } from 'react-router-dom';
import { ErrorResponse } from '../../common';

export const CompanyDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactEmployees, setContactEmployees] = useState<ContactEmployee[]>([]);

    const getCompany = useCallback(
        async (id: string | undefined) => {
            setLoading(true);
            setError(null);
            if (!id) {
                setError({ message: 'Missing id in params', type: 'Validation Error' });
                return;
            }
            try {
                const companyData = await getCompanyById(id);
                if (companyData.success) {
                    setCompany(companyData.data);
                } else {
                    setError(companyData.error);
                }
                const companyAddressesData = await getCompanyAddressesByCompanyId(company?.id);
                if (companyAddressesData.success) {
                    setAddresses(companyAddressesData.data);
                }
                const companyContactsData = await getCompanyContactsByCompanyId(company?.id);
                if (companyContactsData.success) {
                    setContacts(companyContactsData.data);
                }
                const companyContactEmployeesData = await getCompanyContactEmployeesByCompanyId(company?.id);
                if (companyContactEmployeesData.success) {
                    setContactEmployees(companyContactEmployeesData.data);
                }
            } catch (err) {
                setError({ message: String(err), type: 'Error Type' });
            } finally {
                setLoading(false);
            }
        },
        [company?.id],
    );

    useEffect(() => {
        getCompany(id);
    }, [getCompany, id]);
    return (
        <>
            <div className="container">
                <h1>Company Details</h1>
                {loading && <p>Loading...</p>}
                {error && !company && (
                    <p style={{ color: 'red' }}>
                        {error.type}: {error.message}
                    </p>
                )}
                {company && (
                    <>
                        <CompanyInfo company={company} />
                        <CompanyContactsDetails contacts={contacts} />
                        <AddressDetails addresses={addresses} />
                        <CompanyContactEmployeesDetails contactEmployees={contactEmployees} />
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
