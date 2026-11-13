import hashlib
import json
import os
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(os.environ.get("CHEMEASE_DOCKING_DATA", Path(__file__).resolve().parents[1] / ".data")).resolve()


def now():
    return datetime.now(timezone.utc).isoformat()


def digest(text: str):
    return hashlib.sha256(text.encode()).hexdigest()


def connection():
    ROOT.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(ROOT / "docking.sqlite", timeout=30)
    db.execute("PRAGMA journal_mode=WAL")
    db.execute("CREATE TABLE IF NOT EXISTS records(id TEXT PRIMARY KEY, scope TEXT NOT NULL, kind TEXT NOT NULL, data TEXT NOT NULL)")
    return db


def write(record):
    with connection() as db:
        db.execute("INSERT INTO records VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data", (record["id"], record["scope"], record["kind"], json.dumps(record, allow_nan=False)))


def create(scope, kind, **data):
    record = {"id": uuid.uuid4().hex, "scope": scope, "kind": kind, "createdAt": now(), **data}
    write(record)
    folder(record["id"]).mkdir(parents=True)
    return record


def get(identifier, scope=None, kind=None):
    if not isinstance(identifier, str) or len(identifier) != 32 or any(c not in "0123456789abcdef" for c in identifier):
        raise ValueError("Invalid record ID.")
    with connection() as db:
        row = db.execute("SELECT data FROM records WHERE id=?", (identifier,)).fetchone()
    if not row:
        raise KeyError("Record not found.")
    record = json.loads(row[0])
    if (scope is not None and record["scope"] != scope) or (kind is not None and record["kind"] != kind):
        raise KeyError("Record not found in this workspace.")
    return record


def update(identifier, **data):
    record = get(identifier)
    record.update(data, updatedAt=now())
    write(record)
    return record


def records(scope=None, kind="job"):
    with connection() as db:
        if scope is None:
            rows = db.execute("SELECT data FROM records WHERE kind=?", (kind,)).fetchall()
        else:
            rows = db.execute("SELECT data FROM records WHERE kind=? AND scope=?", (kind, scope)).fetchall()
    return sorted([json.loads(row[0]) for row in rows], key=lambda r: r["createdAt"], reverse=True)


def folder(identifier):
    # IDs originate from UUIDs; callers retrieving files must authorize the record first.
    if len(identifier) != 32 or any(c not in "0123456789abcdef" for c in identifier):
        raise ValueError("Invalid record ID.")
    return ROOT / identifier


def public(record):
    hidden = {"scope", "request"}
    if record["kind"] == "job" and record.get("status") != "completed":
        hidden.update(("result", "files"))
    return {k: v for k, v in record.items() if k not in hidden}
