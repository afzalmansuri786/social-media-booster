from fastapi import APIRouter, HTTPException
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.get("/marketing-quote")
async def get_marketing_quote():
    url = os.getenv("marketing_qoutes_api")

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(url)
            response.raise_for_status()  # raises for 4xx/5xx
            data = response.json()

        return {
            "quote": data.get("content"),
            "author": data.get("author")
        }

    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="Quote service timed out"
        )

    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail="Quote service returned an error"
        )

    except httpx.RequestError:
        raise HTTPException(
            status_code=503,
            detail="Unable to reach quote service"
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Unexpected server error"
        )
