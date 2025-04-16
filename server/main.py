from fastapi import FastAPI, Query, Response
from fastapi.responses import JSONResponse
import httpx
from fastapi.middleware.cors import CORSMiddleware

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


JSON_SERVER_URL = "http://localhost:5000/companies"


@app.get("/companies")
async def proxy_companies(
    _page: int = Query(1, alias="_page"),
    _per_page: int = Query(10, alias="_per_page"),
):
    async with httpx.AsyncClient() as client:
        try:

            resp = await client.get(
                JSON_SERVER_URL, params={"_page": _page, "_per_page": _per_page}
            )

            return Response(
                content=resp.content,
                # status_code=resp.status_code,
                status_code=401,
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
