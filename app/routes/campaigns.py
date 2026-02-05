from fastapi import APIRouter
from app.db import get_connection

router = APIRouter()

@router.post("/")
def create_campaign(data: dict):
    conn = get_connection()
    cur = conn.cursor()

    query = """
    insert into campaigns (name, platform, status, budget, spent)
    values (%s, %s, %s, %s, %s)
    returning id;
    """

    cur.execute(query, (
        data["name"],
        data["platform"],
        data["status"],
        data["budget"],
        data.get("spent", 0)
    ))

    campaign_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {"id": campaign_id}


@router.get("/")
def list_campaigns():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("select * from campaigns order by created_at desc;")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    return rows


@router.get("/{campaign_id}")
def get_campaign(campaign_id: str):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("select * from campaigns where id=%s;", (campaign_id,))
    row = cur.fetchone()

    cur.close()
    conn.close()

    return row


@router.put("/{campaign_id}")
def update_campaign(campaign_id: str, data: dict):
    conn = get_connection()
    cur = conn.cursor()

    query = """
    update campaigns
    set name=%s, platform=%s, status=%s, budget=%s, spent=%s
    where id=%s;
    """

    cur.execute(query, (
        data["name"],
        data["platform"],
        data["status"],
        data["budget"],
        data["spent"],
        campaign_id
    ))

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Campaign updated"}


@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: str):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("delete from campaigns where id=%s;", (campaign_id,))
    conn.commit()

    cur.close()
    conn.close()

    return {"message": "Campaign deleted"}
