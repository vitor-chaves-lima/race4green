FROM python:3.12

RUN pip install poetry
WORKDIR /usr/src

COPY pyproject.toml poetry.lock* ./

RUN poetry install --only main

COPY ./integrations-service .
