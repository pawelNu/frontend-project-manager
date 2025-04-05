// import type { UUIDTypes } from 'uuid';

// export type Address = {
//   id: UUIDTypes;
//   street: string;
//   city: string;
//   postalCode: string;
// };

// export type Contact = {
//   id: UUIDTypes;
//   type: 'phone' | 'email';
//   value: string;
// };

// export type ContactEmployee = {
//   id: UUIDTypes;
//   firstName: string;
//   lastName: string;
//   position: string;
//   phone: string;
//   email: string;
// };

// export type Company = {
//   id: UUIDTypes;
//   name: string;
//   nip: string;
//   regon: string;
//   website: string;
//   addresses: Address[];
//   contacts: Contact[];
//   contactEmployees: ContactEmployee[];
// };

// export type CompanyNotFull = Pick<Company, 'id' | 'name' | 'nip' | 'website'>;

// export type CompanyAddress = {
//   id: UUIDTypes;
//   companyId: UUIDTypes;
//   addressId: UUIDTypes;
// };

// export type CompanyContact = {
//   id: UUIDTypes;
//   companyId: UUIDTypes;
//   contactId: UUIDTypes;
// };

// export type CompanyContactEmployee = {
//   id: UUIDTypes;
//   companyId: UUIDTypes;
//   contactEmployeeId: UUIDTypes;
// };

// // import axios from 'axios';
// // import { jsonServerApi } from '$lib/generator';

// // export const getCompanies = async () => {
// //   try {
// //     const url = jsonServerApi + 'companies';
// //     const response = await axios.get(url);
// //     console.log(response.data);
// //   } catch (error) {
// //     console.error('Błąd przy pobieraniu danych:', error);
// //   }
// // };

// // export const createCompany = async (companyData: unknown) => {
// //   try {
// //     const url = jsonServerApi + 'companies';
// //     const response = await axios.post(url, companyData);
// //     console.log('Stworzono firmę:', response.data);
// //   } catch (error) {
// //     console.error('Błąd przy tworzeniu firmy:', error);
// //   }
// // };

// // export const updateCompany = async (id: string, updatedData: unknown) => {
// //   try {
// //     const url = jsonServerApi + `/companies/${id}`;
// //     const response = await axios.put(url, updatedData);
// //     console.log('Zaktualizowano firmę:', response.data);
// //   } catch (error) {
// //     console.error('Błąd przy aktualizacji firmy:', error);
// //   }
// // };

// // export const deleteCompany = async (id: string) => {
// //   try {
// //     const url = jsonServerApi + `/companies/${id}`;
// //     const response = await axios.delete(url);
// //     console.log('Usunięto firmę:', response.data);
// //   } catch (error) {
// //     console.error('Błąd przy usuwaniu firmy:', error);
// //   }
// // };
