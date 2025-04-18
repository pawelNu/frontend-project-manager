from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel


class Company(BaseModel):
    id: UUID
    name: str
    nip: str
    regon: str
    website: str


class PaginatedResponse(BaseModel):
    first: int
    prev: Optional[int] = None
    next: Optional[int] = None
    last: int
    pages: int
    items: int
    data: List[Company]


class Address(BaseModel):
    id: UUID
    street: str
    city: str
    postalCode: str


class Contact(BaseModel):
    id: UUID
    type: str
    value: str


class ContactEmployee(BaseModel):
    id: UUID
    firstName: str
    lastName: str
    position: str
    phone: str
    email: str


class Company(BaseModel):
    id: UUID
    name: str
    nip: str
    regon: str
    website: str
    addresses: List[Address]
    contacts: List[Contact]
    contactEmployees: List[ContactEmployee]

class Company2(BaseModel):
    id: str
    name: str
    nip: str
    regon: str
    website: str

class Company3(BaseModel):
    name: str
    nip: str
    regon: str
    website: str
