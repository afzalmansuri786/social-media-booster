from app.db import get_connection

def run_schema_migrations():
    conn = get_connection()
    cur = conn.cursor()

    # Enable UUID extension
    cur.execute("""
        create extension if not exists "uuid-ossp";
    """)

    # Create campaigns table
    cur.execute("""
        create table if not exists campaigns (
            id uuid primary key default uuid_generate_v4(),
            name text not null,
            platform text not null,
            status text not null,
            budget numeric not null,
            spent numeric default 0,
            created_at timestamptz default now()
        );
    """)

    conn.commit()
    cur.close()
    conn.close()
