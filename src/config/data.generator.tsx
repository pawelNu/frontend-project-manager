import axios from 'axios';
import {
    Address,
    Contact,
    ContactEmployee,
    Company,
    CompanyNotFull,
    CompanyAddress,
    CompanyContact,
    CompanyContactEmployee,
} from '../services/company';
import { v4 as uuidv4 } from 'uuid';
import { faker, simpleFaker } from '@faker-js/faker';
import { api, jsonServerApi } from '../components/routes';

const generateAddress = (): Address => ({
    id: uuidv4(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    postalCode: faker.location.zipCode(),
});

const generateContact = (): Contact => {
    const type = faker.helpers.arrayElement(['phone', 'email']) as 'phone' | 'email';

    const value = type === 'phone' ? faker.phone.number() : faker.internet.email();

    return {
        id: uuidv4(),
        type,
        value,
    };
};

const generateContactEmployee = (): ContactEmployee => ({
    id: uuidv4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    position: faker.person.jobTitle(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
});

const generateCompany = (): Company => ({
    id: uuidv4(),
    name: faker.company.name(),
    nip: simpleFaker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
    regon: simpleFaker.number.int({ min: 100000000, max: 999999999 }).toString(),
    website: faker.internet.url(),
    addresses: [generateAddress(), generateAddress()],
    contacts: [generateContact(), generateContact()],
    contactEmployees: [generateContactEmployee(), generateContactEmployee()],
});

const createCompany = async (company: CompanyNotFull) => {
    try {
        const response = await axios.post(jsonServerApi + api.company.create(), company);
        console.log('Created company:', response.data);
    } catch (error) {
        console.error('Error creating company:', error);
    }
};

const createAddress = async (address: Address) => {
    try {
        const response = await axios.post(jsonServerApi + api.addresses.create(), address);
        console.log('Created address:', response.data);
    } catch (error) {
        console.error('Error creating address:', error);
    }
};

const createCompanyAddress = async (address: CompanyAddress) => {
    try {
        const response = await axios.post(jsonServerApi + api.companyAddresses.create(), address);
        console.log('Added address to company:', response.data);
    } catch (error) {
        console.error('Error adding address:', error);
    }
};

const createContact = async (contact: Contact) => {
    try {
        const response = await axios.post(jsonServerApi + api.contacts.create(), contact);
        console.log('Created contact:', response.data);
    } catch (error) {
        console.error('Error creating contact:', error);
    }
};

const createCompanyContact = async (contact: CompanyContact) => {
    try {
        const response = await axios.post(jsonServerApi + api.companyContacts.create(), contact);
        console.log('Added contact to company:', response.data);
    } catch (error) {
        console.error('Error adding contact:', error);
    }
};

const createContactEmployee = async (contact: ContactEmployee) => {
    try {
        const response = await axios.post(jsonServerApi + api.contactEmployees.create(), contact);
        console.log('Created contact employee:', response.data);
    } catch (error) {
        console.error('Error creating contact:', error);
    }
};

const createCompanyContactEmployee = async (contact: CompanyContactEmployee) => {
    try {
        const response = await axios.post(jsonServerApi + api.companyContactEmployees.create(), contact);
        console.log('Added contact employee to company:', response.data);
    } catch (error) {
        console.error('Error adding contact employee:', error);
    }
};

export const generateData = (numOfCompanies: number): Company[] => {
    const companies: Company[] = [];
    for (let i = 0; i < numOfCompanies; i++) {
        companies.push(generateCompany());
    }

    companies.forEach((company) => {
        const companyNotFull: CompanyNotFull = {
            id: company.id,
            name: company.name,
            nip: company.nip,
            regon: company.regon,
            website: company.website,
        };
        createCompany(companyNotFull);
        company.addresses.forEach((address) => {
            createAddress(address);
            createCompanyAddress({ id: uuidv4(), companyId: companyNotFull.id, addressId: address.id });
        });
        company.contacts.forEach((contact) => {
            createContact(contact);
            createCompanyContact({ id: uuidv4(), companyId: companyNotFull.id, contactId: contact.id });
        });
        company.contactEmployees.forEach((contactEmp) => {
            createContactEmployee(contactEmp);
            createCompanyContactEmployee({
                id: uuidv4(),
                companyId: companyNotFull.id,
                contactEmployeeId: contactEmp.id,
            });
        });
    });

    return companies;
};
