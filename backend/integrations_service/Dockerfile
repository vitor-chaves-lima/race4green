FROM python:3.12

RUN pip install poetry
WORKDIR /usr/src

COPY . .
RUN pip install -r requirements.txt
