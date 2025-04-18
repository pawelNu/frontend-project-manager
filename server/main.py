from uuid import UUID
from fastapi import FastAPI, HTTPException, Path, Query, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import httpx
from fastapi.middleware.cors import CORSMiddleware

from models import Address, Company, Company2, Company3, Contact, ContactEmployee
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
async def get_all_companies(
    _page: int = Query(1, alias="_page"),
    _per_page: int = Query(10, alias="_per_page"),
):
    async with httpx.AsyncClient() as client:
        try:

            resp = await client.get(
                f"{JSON_SERVER_URL}/companies",
                params={"_page": _page, "_per_page": _per_page},
            )
            # resp.status_code = 500
            if resp.status_code == 500:
                return JSONResponse(
                    content={"error": "Not found companies data"},
                    status_code=resp.status_code,
                )

            return Response(
                content=resp.content,
                status_code=resp.status_code,
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


@app.get("/companies/{company_id}")
async def get_company_by_id(company_id: UUID):
    async with httpx.AsyncClient() as client:
        try:

            company_res = await client.get(f"{JSON_SERVER_URL}/companies/{company_id}")
            if company_res.status_code == 404:
                return JSONResponse(
                    content={"error": f"Not found company with id: {str(company_id)}"},
                    status_code=company_res.status_code,
                )
            company_data = company_res.json()

            company_addresses_res = await client.get(
                f"{JSON_SERVER_URL}/company-addresses?companyId={company_id}"
            )
            company_addresses_data = company_addresses_res.json()

            address_ids = []
            for ca in company_addresses_data:
                address_ids.append(ca["addressId"])
            log.info(address_ids)

            addresses_data = []
            for id in address_ids:
                res = await client.get(f"{JSON_SERVER_URL}/addresses/{id}")
                log.info(res.url)
                addresses_data.append(res.json())

            company_contacts_res = await client.get(
                f"{JSON_SERVER_URL}/company-contacts?companyId={company_id}"
            )
            company_contacts_data = company_contacts_res.json()

            contact_ids = []
            for cc in company_contacts_data:
                contact_ids.append(cc["contactId"])

            contacts_data = []
            for id in contact_ids:
                res = await client.get(f"{JSON_SERVER_URL}/contacts/{id}")
                log.info(res.url)
                contacts_data.append(res.json())

            company_contact_employees_res = await client.get(
                f"{JSON_SERVER_URL}/company-contact-employees?companyId={company_id}"
            )
            company_contact_employees_data = company_contact_employees_res.json()

            contact_employee_ids = []
            for cce in company_contact_employees_data:
                contact_employee_ids.append(cce["contactEmployeeId"])

            contact_employees_data = []
            for id in contact_employee_ids:
                res = await client.get(f"{JSON_SERVER_URL}/contact-employees/{id}")
                log.info(res.url)
                contact_employees_data.append(res.json())

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

            # company = Company(
            #     id=company_data["id"],
            #     name=company_data["name"],
            #     nip=company_data["nip"],
            #     regon=company_data["regon"],
            #     website=company_data["website"],
            #     addresses=addresses,
            #     contacts=contacts,
            #     contactEmployees=contact_employees,
            # )
            # log.info(company)
            company = Company2(
                id=company_data["id"],
                name=company_data["name"],
                nip=company_data["nip"],
                regon=company_data["regon"],
                website=company_data["website"],
            )
            # log.info(company)

            return JSONResponse(content=jsonable_encoder(company), status_code=200)

        except httpx.RequestError as e:
            raise HTTPException(
                status_code=500, detail=f"Error connecting to JSON Server: {str(e)}"
            )


@app.delete("/companies/{company_id}")
async def delete_company_by_id(company_id: UUID):

    url = f"{JSON_SERVER_URL}/companies/{company_id}"

    async with httpx.AsyncClient() as client:
        response = await client.delete(url)

    if response.status_code == 200:
        return Response(
            content=response.content,
            status_code=response.status_code,
            headers={
                key: value
                for key, value in response.headers.items()
                if key.lower() in {"content-type", "cache-control"}
            },
        )
    elif response.status_code == 404:
        return JSONResponse(
            content={"error": f"Not found company with id: {str(company_id)}"},
            status_code=response.status_code,
        )
    else:
        return JSONResponse(
            content={"error": f"Unexpected error"},
            status_code=500,
        )


@app.post("/companies")
async def create_company(company: Company2):
    url = f"{JSON_SERVER_URL}/companies"
    errors = {}
    if company.name == "t":
        errors["name"] = errors.get("name", []) + ["Name cannot be 't'."]

    if company.nip == "t":
        errors["nip"] = ["Invalid NIP format."]

    if company.website == "t" or not company.website.startswith("http"):
        errors["website"] = ["Website URL is invalid."]

    if errors:
        error_content = {"success": False, "errors": errors}
        log.error(error_content)
        return JSONResponse(content=error_content, status_code=400)

    if company.name == "e":
        error = {"error": "Unexpected error: testing single error message"}
        log.error(error)
        return JSONResponse(
            content=error,
            status_code=500,
        )

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=company.model_dump())
            response.raise_for_status()

            data = response.json()
            data["message"] = (
                f"Company [name: {data["name"]} nip: {data["nip"]}] created successfully"
            )
            log.success(data)
            return JSONResponse(
                content=data,
                status_code=response.status_code,
                headers={
                    key: value
                    for key, value in response.headers.items()
                    if key.lower() in {"content-type", "cache-control"}
                },
            )
        except httpx.HTTPStatusError as e:
            log.error(e)
            return JSONResponse(
                content={"error": f"Upstream error: {str(e)}"},
                status_code=e.response.status_code,
            )
        except Exception as e:
            log.error(e)
            return JSONResponse(
                content={"error": f"Unexpected error: {str(e)}"},
                status_code=500,
            )


@app.put("/companies/{id}")
async def edit_company_by_id(id: UUID, company: Company3):
    log.info(id)
    log.info(company)
    url = f"{JSON_SERVER_URL}/companies/{id}"
    errors = {}
    if company.name == "t":
        errors["name"] = errors.get("name", []) + ["Name cannot be 't'."]

    if company.nip == "t":
        errors["nip"] = ["Invalid NIP format."]

    if company.website == "t" or not company.website.startswith("http"):
        errors["website"] = ["Website URL is invalid."]

    if errors:
        error_content = {"success": False, "errors": errors}
        log.error(error_content)
        return JSONResponse(content=error_content, status_code=400)

    if company.name == "e":
        error = {"error": "Unexpected error: testing single error message"}
        log.error(error)
        return JSONResponse(
            content=error,
            status_code=500,
        )

    async with httpx.AsyncClient() as client:
        try:
            response = await client.put(url, json=company.model_dump())
            response.raise_for_status()

            data = response.json()
            data["message"] = (
                f"Company [name: {data["name"]} nip: {data["nip"]}] updated successfully"
            )
            log.success(data)
            return JSONResponse(
                content=data,
                status_code=response.status_code,
                headers={
                    key: value
                    for key, value in response.headers.items()
                    if key.lower() in {"content-type", "cache-control"}
                },
            )
        except httpx.HTTPStatusError as e:
            log.error(e)
            return JSONResponse(
                content={"error": f"Upstream error: {str(e)}"},
                status_code=e.response.status_code,
            )
        except Exception as e:
            log.error(e)
            return JSONResponse(
                content={"error": f"Unexpected error: {str(e)}"},
                status_code=500,
            )
