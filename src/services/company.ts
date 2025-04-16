import { UUIDTypes } from 'uuid';
import { PaginatedResponse, Result } from '../components/common';
import axios from 'axios';
import { api } from '../components/routes';
import { TFormValues } from '../components/common/Form';
import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '../config/axiosInstance';

export type Address = {
    id: UUIDTypes;
    street: string;
    city: string;
    postalCode: string;
};

export type Contact = {
    id: UUIDTypes;
    type: 'phone' | 'email';
    value: string;
};

export type ContactEmployee = {
    id: UUIDTypes;
    firstName: string;
    lastName: string;
    position: string;
    phone: string;
    email: string;
};

export type Company = {
    id: UUIDTypes;
    name: string;
    nip: string;
    regon: string;
    website: string;
    addresses: Address[];
    contacts: Contact[];
    contactEmployees: ContactEmployee[];
};

export type CompanyNotFull = Pick<Company, 'id' | 'name' | 'nip' | 'regon' | 'website'>;

export type CompanyAddress = {
    id: UUIDTypes;
    companyId: UUIDTypes;
    addressId: UUIDTypes;
};

export type CompanyContact = {
    id: UUIDTypes;
    companyId: UUIDTypes;
    contactId: UUIDTypes;
};

export type CompanyContactEmployee = {
    id: UUIDTypes;
    companyId: UUIDTypes;
    contactEmployeeId: UUIDTypes;
};

const errors = {
    general: {
        get_data: () => 'Błąd przy pobieraniu danych.',
    },
};

// TODO change to https://github.com/riyons/centralized-error-handling-react/blob/main/src/services/productServices.js

export const getCompanies = (pageNumber: number, pageSize: number) => {
    return axiosInstance.get<PaginatedResponse<Company>>(api.company.list(pageNumber, pageSize));
};

export const getCompanyById = async (id: UUIDTypes): Promise<Result<Company>> => {
    try {
        const response = await axios.get(api.company.id(id.toString()));
        return { success: true, data: response.data };
    } catch (error) {
        const msg = errors.general.get_data();
        console.error(msg, error);
        return {
            success: false,
            error: {
                message: msg,
                type: error instanceof Error ? error.message : msg,
            },
        };
    }
};

export const getCompanyAddressesByCompanyId = async (id: UUIDTypes | undefined): Promise<Result<Address[]>> => {
    if (id === undefined) {
        throw Error('Id undefined');
    }
    try {
        const listOfAddresses = await axios.get(api.companyAddresses.companyId(id.toString()));
        const addressIds: string[] = listOfAddresses.data.map((item: CompanyAddress) => item.addressId);
        const addresses: Address[] = [];
        for (const id of addressIds) {
            const response = await axios.get(api.addresses.id(id));
            addresses.push(response.data);
        }
        return { success: true, data: addresses };
    } catch (error) {
        const msg = errors.general.get_data();
        console.error(msg, error);
        return {
            success: false,
            error: {
                message: msg,
                type: error instanceof Error ? error.message : msg,
            },
        };
    }
};

export const getCompanyContactsByCompanyId = async (id: UUIDTypes | undefined): Promise<Result<Contact[]>> => {
    if (id === undefined) {
        throw Error('Id undefined');
    }
    try {
        const listOfAddresses = await axios.get(api.companyContacts.companyId(id.toString()));
        const contactIds: string[] = listOfAddresses.data.map((item: CompanyContact) => item.contactId);
        const addresses: Contact[] = [];
        for (const id of contactIds) {
            const response = await axios.get(api.contacts.id(id));
            addresses.push(response.data);
        }
        return { success: true, data: addresses };
    } catch (error) {
        const msg = errors.general.get_data();
        console.error(msg, error);
        return {
            success: false,
            error: {
                message: msg,
                type: error instanceof Error ? error.message : msg,
            },
        };
    }
};

export const getCompanyContactEmployeesByCompanyId = async (
    id: UUIDTypes | undefined,
): Promise<Result<ContactEmployee[]>> => {
    if (id === undefined) {
        throw Error('Id undefined');
    }
    try {
        const listOfAddresses = await axios.get(api.companyContactEmployees.companyId(id.toString()));
        const contactEmployeeIds: string[] = listOfAddresses.data.map(
            (item: CompanyContactEmployee) => item.contactEmployeeId,
        );
        const addresses: ContactEmployee[] = [];
        for (const id of contactEmployeeIds) {
            const response = await axios.get(api.contactEmployees.id(id));
            addresses.push(response.data);
        }
        return { success: true, data: addresses };
    } catch (error) {
        const msg = errors.general.get_data();
        console.error(msg, error);
        return {
            success: false,
            error: {
                message: msg,
                type: error instanceof Error ? error.message : msg,
            },
        };
    }
};

export const createCompany = async (companyData: TFormValues): Promise<Result<CompanyNotFull>> => {
    try {
        const companyWithId = { ...companyData, id: uuidv4() };
        const response = await axios.post(api.company.create(), companyWithId);
        const responseData = response.data;
        console.log('Stworzono firmę:', JSON.stringify(responseData, null, 2));
        return { success: true, data: responseData };
    } catch (error) {
        const msg = 'Błąd przy tworzeniu firmy';
        console.error(msg, error);
        return {
            success: false,
            error: {
                message: msg,
                type: error instanceof Error ? error.message : msg,
            },
        };
    }
};

// export const createCompany2 = async (companyData: TFormValues): Promise<CompanyNotFull | undefined> => {
//     const companyWithId = { ...companyData, id: uuidv4() };

//     const config = {
//         method: 'POST',
//         url: api.company.create(),
//         data: companyWithId,
//     };

//     // Wywołanie httpRequest, bezpośrednie zwrócenie danych lub błędu
//     const result = await httpRequest<CompanyNotFull>(config);

//     if (result.statusCode === 201) {
//         console.log('Stworzono firmę:', JSON.stringify(result.data, null, 2));
//         return result.data; // Zwrócenie danych firmy
//     } else {
//         console.error('Błąd przy tworzeniu firmy:', result.error);
//         throw new Error(result.error); // Rzucenie błędu, jeśli operacja się nie powiedzie
//     }
// };

export const updateCompany = async (id: string, updatedData: unknown) => {
    try {
        const response = await axios.put(api.company.edit(id), updatedData);
        console.log('Zaktualizowano firmę:', response.data);
    } catch (error) {
        console.error('Błąd przy aktualizacji firmy:', error);
    }
};

export const deleteCompany = async (id: string): Promise<Result<CompanyNotFull>> => {
    try {
        const response = await axios.delete(api.company.delete(id));
        const responseData = response.data;
        console.log('Usunięto firmę:', JSON.stringify(responseData, null, 2));
        return { success: true, data: responseData };
        // TODO think about better error handling
    } catch (error) {
        const msg = 'Błąd przy usuwaniu firmy';
        console.log(msg, error);
        return {
            success: false,
            error: {
                message: msg,
                type: error instanceof Error ? error.message : msg,
            },
        };
    }
};

export const handleDeleteCompany = async (id: string) => {
    const result = await deleteCompany(id);
    if (result.success) {
        console.log(' handleDeleteCompany   result:', JSON.stringify(result.data, null, 2));
        return { success: true };
    } else {
        alert(result.error.message);
        return { success: false, errors: `${result.error.type}: ${result.error.message}` };
    }
    // TODO validation form server not tested, json-server does not throw errors
};
