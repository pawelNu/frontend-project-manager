from uuid import UUID
from fastapi import FastAPI, HTTPException, Path, Query, Response
from fastapi.responses import JSONResponse
import httpx
from fastapi.middleware.cors import CORSMiddleware

from models import Address, Company, Contact, ContactEmployee
from utils import log_config

log = log_config()
app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


JSON_SERVER_URL = "http://localhost:5000"


@app.get("/companies")
async def proxy_companies(
    _page: int = Query(1, alias="_page"),
    _per_page: int = Query(10, alias="_per_page"),
):
    async with httpx.AsyncClient() as client:
        try:

            resp = await client.get(
                f"{JSON_SERVER_URL}/companies",
                params={"_page": _page, "_per_page": _per_page},
            )

            return Response(
                content=resp.content,
                status_code=resp.status_code,
                # status_code=401,
                headers={
                    "X-Total-Count": resp.headers.get("X-Total-Count", ""),
                    "Content-Type": resp.headers.get(
                        "Content-Type", "application/json"
                    ),
                },
            )
        except httpx.RequestError as e:
            return JSONResponse(
                content={"error": f"JSON Server error: {str(e)}"}, status_code=502
            )


@app.get("/companies2/{company_id}")
async def proxy_company_by_id(company_id: str = Path(..., description="UUID firmy")):
    url = f"{JSON_SERVER_URL}/{company_id}"

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url)

            return Response(
                content=resp.content,
                status_code=resp.status_code,
                headers={
                    "Content-Type": resp.headers.get("Content-Type", "application/json")
                },
            )
        except httpx.RequestError as e:
            return JSONResponse(
                content={"error": f"JSON Server error: {str(e)}"},
                status_code=502,
            )


@app.get("/companies/{company_id}", response_model=Company)
async def get_company_by_id(company_id: UUID):
    async with httpx.AsyncClient() as client:
        try:
            # Pobieramy firmę
            company_res = await client.get(f"{JSON_SERVER_URL}/companies/{company_id}")
            company_data = company_res.json()

            if not company_data:
                raise HTTPException(status_code=404, detail="Company not found")

            # Pobieramy powiązane adresy (pośrednio przez company-addresses)
            company_addresses_res = await client.get(
                f"{JSON_SERVER_URL}/company-addresses?companyId={company_id}"
            )
            company_addresses_data = company_addresses_res.json()

            # Tworzymy listę addressIds za pomocą klasycznej pętli
            address_ids = []
            for ca in company_addresses_data:
                address_ids.append(ca["addressId"])
            log.info(address_ids)

            # Pobieramy szczegóły adresów
            addresses_data = []
            for id in address_ids:
                res = await client.get(f"{JSON_SERVER_URL}/addresses/{id}")
                log.info(res.url)
                addresses_data.append(res.json())

            # Pobieramy powiązane kontakty (pośrednio przez company-contacts)
            company_contacts_res = await client.get(
                f"{JSON_SERVER_URL}/company-contacts?companyId={company_id}"
            )
            company_contacts_data = company_contacts_res.json()

            # Tworzymy listę contactIds za pomocą klasycznej pętli
            contact_ids = []
            for cc in company_contacts_data:
                contact_ids.append(cc["contactId"])

            contacts_data = []
            for id in contact_ids:
                res = await client.get(f"{JSON_SERVER_URL}/contacts/{id}")
                log.info(res.url)
                contacts_data.append(res.json())

            # Pobieramy powiązanych pracowników kontaktowych (pośrednio przez company-contact-employees)
            company_contact_employees_res = await client.get(
                f"{JSON_SERVER_URL}/company-contact-employees?companyId={company_id}"
            )
            company_contact_employees_data = company_contact_employees_res.json()

            # Tworzymy listę contactEmployeeIds za pomocą klasycznej pętli
            contact_employee_ids = []
            for cce in company_contact_employees_data:
                contact_employee_ids.append(cce["contactEmployeeId"])

            contact_employees_data = []
            for id in contact_employee_ids:
                res = await client.get(f"{JSON_SERVER_URL}/contact-employees/{id}")
                log.info(res.url)
                contact_employees_data.append(res.json())

            # Łączenie danych w obiektach Pydantic
            addresses = []
            for addr in addresses_data:
                log.info(addr)
                addresses.append(Address(**addr))

            contacts = []
            for cont in contacts_data:
                contacts.append(Contact(**cont))

            contact_employees = []
            for ce in contact_employees_data:
                contact_employees.append(ContactEmployee(**ce))

            # Tworzymy obiekt firmy
            company = Company(
                id=company_data["id"],
                name=company_data["name"],
                nip=company_data["nip"],
                regon=company_data["regon"],
                website=company_data["website"],
                addresses=addresses,
                contacts=contacts,
                contactEmployees=contact_employees,
            )

            return company

        except httpx.RequestError as e:
            raise HTTPException(
                status_code=500, detail=f"Error connecting to JSON Server: {str(e)}"
            )
