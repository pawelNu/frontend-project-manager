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
