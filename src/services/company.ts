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

// TODO change to https://github.com/riyons/centralized-error-handling-react/blob/main/src/services/productServices.js

export const getCompanies = (pageNumber: number, pageSize: number) => {
    return axiosInstance.get<PaginatedResponse<Company>>(api.company.list(pageNumber, pageSize));
};

export const getCompanyById = async (id: string) => {
    return axiosInstance.get<Company>(api.company.id(id.toString()));
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

export const updateCompany = async (id: string, updatedData: unknown) => {
    try {
        const response = await axios.put(api.company.edit(id), updatedData);
        console.log('Zaktualizowano firmę:', response.data);
    } catch (error) {
        console.error('Błąd przy aktualizacji firmy:', error);
    }
};

export const deleteCompany = async (id: string) => {
    return axiosInstance.delete<CompanyNotFull>(api.company.delete(id));
};

export const handleDeleteCompany = async (id: string) => {
    try {
        await deleteCompany(id);
        return { success: true };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = `${error.message}: ${error.response?.data?.error}`;
            return { success: false, error: message };
        }

        return { success: false, error: 'Unexpected error occurred' };
    }
};
