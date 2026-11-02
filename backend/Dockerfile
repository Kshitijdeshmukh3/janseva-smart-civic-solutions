FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies for Pillow and image processing
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run DB seeding and start production uvicorn
EXPOSE 8000

CMD ["sh", "-c", "python seed_data.py && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 4"]
