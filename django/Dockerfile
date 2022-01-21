FROM python:3.9-buster as builder
ENV PYTHONUNBUFFERED=1
RUN mkdir app
WORKDIR /app
RUN mkdir -p tmp/sockets
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# init django
RUN django-admin startproject mysite .
COPY ./appdata .
COPY ./uwsgi.ini .
COPY ./settings.py mysite/
COPY ./urls.py mysite/

# runner
FROM python:3.9-slim-buster as production
ENV PYTHONUNBUFFERED=1
RUN mkdir app
WORKDIR /app
RUN mkdir -p tmp/sockets

RUN apt update \
  && apt install -y libpq5 libxml2 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=builder /usr/local/bin/uwsgi /usr/local/bin/uwsgi
COPY --from=builder /app /app

CMD uwsgi --ini uwsgi.ini