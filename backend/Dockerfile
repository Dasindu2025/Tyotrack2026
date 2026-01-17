FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create start script
RUN echo '#!/bin/bash\npython bootstrap.py\nuvicorn main:app --host 0.0.0.0 --port 8000 --reload' > /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
