from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import campaigns, dashboard, external_api
from app.schema import run_schema_migrations

app = FastAPI(title="Campaign Tracker API")

# ✅ CORS CONFIG
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev
        "http://127.0.0.1:5173",
        # add prod frontend URL later (Vercel/Netlify)
        # "https://your-frontend.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    run_schema_migrations()

app.include_router(campaigns.router, prefix="/campaigns", tags=["Campaigns"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(external_api.router, prefix="/external", tags=["Third Party"])

@app.get("/")
def health_check():
    return {"status": "API is running"}
