import os
from celery import Celery
from reports import ReportGenerator
import asyncio

REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", "")
REDIS_URL = f"redis://:{REDIS_PASSWORD}@redis:6379/0"

celery_app = Celery(
    "tyotrack_tasks",
    broker=REDIS_URL,
    backend=REDIS_URL
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery_app.task(name="generate_report_task")
def generate_report_task(report_type, data):
    """
    Background task to generate complex reports.
    """
    if report_type == "pdf":
        return ReportGenerator.generate_pdf("Enterprise Report", data).hex()
    elif report_type == "excel":
        return ReportGenerator.generate_excel(data).hex()
    return None
