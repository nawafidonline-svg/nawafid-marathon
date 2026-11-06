# Static site for Railway: nginx serves the files and listens on Railway's $PORT
FROM nginx:1.27-alpine
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/nginx.conf.template /usr/share/nginx/html/DEPLOY.md /usr/share/nginx/html/.dockerignore
ENV PORT=8080
