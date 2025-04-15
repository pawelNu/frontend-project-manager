from fastapi import FastAPI, HTTPException
from typing import List
from models import Company

app = FastAPI()

# Fikcyjne dane
companies = [
    Company(id="1", name="Mock Sp. z o.o."),
    Company(id="2", name="Fikcyjna S.A."),
    Company(id="3", name="Fikcyjna S.A.")
]

@app.get("/api/companies", response_model=List[Company])
def get_companies():
    return companies

@app.post("/api/companies", response_model=Company)
def add_company(company: Company):
    if not company.name:
        raise HTTPException(status_code=400, detail="Brakuje pola name")
    company.id = str(len(companies) + 1)
    companies.append(company)
    return company
