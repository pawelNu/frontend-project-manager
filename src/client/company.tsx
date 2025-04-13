import { UUIDTypes } from 'uuid';
import { PaginatedResponse, Result } from '../components/common';
import axios from 'axios';
import { jsonServerApi } from '../config/data.generator';
import { api } from '../components/routes';

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

export const getCompanies = async (
    pageNumber: number,
    pageSize: number,
): Promise<Result<PaginatedResponse<Company>>> => {
    try {
        const url = jsonServerApi + api.company.list(pageNumber, pageSize);
        const response = await axios.get(url);
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

export const getCompanyById = async (id: UUIDTypes): Promise<Result<Company>> => {
    try {
        const url = jsonServerApi + api.company.id(id.toString());
        const response = await axios.get(url);
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
        const url = jsonServerApi + api.companyAddresses.companyId(id.toString());
        const listOfAddresses = await axios.get(url);
        const addressIds: string[] = listOfAddresses.data.map((item: CompanyAddress) => item.addressId);
        const addresses: Address[] = [];
        for (const id of addressIds) {
            const url = jsonServerApi + api.addresses.id(id);
            const response = await axios.get(url);
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
        const url = jsonServerApi + api.companyContacts.companyId(id.toString());
        const listOfAddresses = await axios.get(url);
        const contactIds: string[] = listOfAddresses.data.map((item: CompanyContact) => item.contactId);
        const addresses: Contact[] = [];
        for (const id of contactIds) {
            const url = jsonServerApi + api.contacts.id(id);
            const response = await axios.get(url);
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
        const url = jsonServerApi + api.companyContactEmployees.companyId(id.toString());
        const listOfAddresses = await axios.get(url);
        const contactEmployeeIds: string[] = listOfAddresses.data.map(
            (item: CompanyContactEmployee) => item.contactEmployeeId,
        );
        const addresses: ContactEmployee[] = [];
        for (const id of contactEmployeeIds) {
            const url = jsonServerApi + api.contactEmployees.id(id);
            const response = await axios.get(url);
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

export const createCompany = async (companyData: unknown) => {
    try {
        const url = jsonServerApi + 'companies';
        const response = await axios.post(url, companyData);
        console.log('Stworzono firmę:', response.data);
    } catch (error) {
        console.error('Błąd przy tworzeniu firmy:', error);
    }
};

export const updateCompany = async (id: string, updatedData: unknown) => {
    try {
        const url = jsonServerApi + `/companies/${id}`;
        const response = await axios.put(url, updatedData);
        console.log('Zaktualizowano firmę:', response.data);
    } catch (error) {
        console.error('Błąd przy aktualizacji firmy:', error);
    }
};

export const deleteCompany = async (id: string) => {
    try {
        const url = jsonServerApi + `/companies/${id}`;
        const response = await axios.delete(url);
        console.log('Usunięto firmę:', response.data);
    } catch (error) {
        console.error('Błąd przy usuwaniu firmy:', error);
    }
};
