FROM --platform=$BUILDPLATFORM ghcr.io/gohugoio/hugo:v0.170.0@sha256:90663d477d1fe08c85643d5752bbf1f4e6391e83f95f85e9942b702649d16cb2 AS build
ARG TARGETPLATFORM

ARG SEARCH_ENGINES_DISABLED
ENV HUGO_PARAMS_SEARCHENGINES_DISABLED=$SEARCH_ENGINES_DISABLED

WORKDIR /alvaldi-docs
COPY --chown=hugo:hugo ./ /alvaldi-docs

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
