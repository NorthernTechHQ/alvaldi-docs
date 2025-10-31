FROM --platform=$BUILDPLATFORM node:alpine AS build
ARG TARGETPLATFORM
WORKDIR /alvaldi-docs
ADD https://github.com/gohugoio/hugo/releases/download/v0.152.2/hugo_0.152.2_Linux-64bit.tar.gz hugo.tar.gz
RUN echo "52b6eda6c00f4449d96f0cbfd7300e834c26179c4fe68e0510ef566db52dba04  hugo.tar.gz" | sha256sum -c
RUN tar -zxvf hugo.tar.gz
RUN mv hugo /usr/local/bin/hugo && chmod +x /usr/local/bin/hugo

COPY ./ /alvaldi-docs

RUN apk add --no-cache git
RUN git submodule update --init --recursive
RUN mv -n /alvaldi-docs/nt-docs/* /alvaldi-docs/

RUN npm ci
RUN npm run build:all
RUN find public -type f -regex '^.*\.\(svg\|css\|html\|xml\|gif\)$' -size +1k -exec gzip -k '{}' \;

FROM nginx:stable-alpine
RUN apk add --no-cache nodejs npm
RUN npm i -g forever
COPY --from=build /alvaldi-docs/redirects.txt /etc/nginx/conf.d/
COPY --from=build /alvaldi-docs/public /usr/share/nginx/html
COPY --from=build /alvaldi-docs/scripts/search /usr/share/search
COPY ./entrypoint.sh /entrypoint.sh
COPY ./nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT /entrypoint.sh
