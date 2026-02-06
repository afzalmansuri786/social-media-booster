from fastapi import APIRouter
from app.db import get_connection

router = APIRouter()

@router.get("/status-summary")
def campaign_status_summary():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        select status, count(*) 
        from campaigns
        group by status;
    """)

    data = cur.fetchall()

    cur.close()
    conn.close()

    return data


@router.get("/budget-summary")
def budget_summary():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        select 
            sum(budget) as total_budget,
            sum(spent) as total_spent
        from campaigns;
    """)

    data = cur.fetchone()

    cur.close()
    conn.close()

    return {
        "total_budget": data[0],
        "total_spent": data[1]
    }
