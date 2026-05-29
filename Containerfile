FROM --platform=$BUILDPLATFORM node:alpine AS build
ARG TARGETPLATFORM
WORKDIR /alvaldi-docs
ADD https://github.com/gohugoio/hugo/releases/download/v0.161.1/hugo_0.161.1_Linux-64bit.tar.gz hugo.tar.gz
RUN echo "fae28bf7909c1a42d1365b89d2e9e3d4194fbe5968ae0dd5504f562381018a1d  hugo.tar.gz" | sha256sum -c
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
