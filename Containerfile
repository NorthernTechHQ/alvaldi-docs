FROM --platform=$BUILDPLATFORM node:alpine AS build
ARG TARGETPLATFORM
WORKDIR /alvaldi-docs
ADD https://github.com/gohugoio/hugo/releases/download/v0.143.0/hugo_0.143.0_Linux-64bit.tar.gz hugo.tar.gz
RUN echo "b8948388d739399c59ac71219c1b6099cb8c462d69619e7fd4947c88dce54738  hugo.tar.gz" | sha256sum -c
RUN tar -zxvf hugo.tar.gz
COPY ./ /alvaldi-docs
RUN npm install less
RUN npx -p less lessc --compress /alvaldi-docs/themes/alvaldi/styles/alvaldi.less /alvaldi-docs/themes/alvaldi/static/css/style.min.css
RUN npm install --prefix /alvaldi-docs/themes/alvaldi/static/fonts bootstrap-icons  @fontsource/red-hat-display @fontsource/red-hat-text @fontsource/red-hat-mono @fontsource/roboto
RUN npm install --prefix /alvaldi-docs/scripts/search/index
RUN npm install --prefix /alvaldi-docs/scripts/search/server
RUN node /alvaldi-docs/scripts/menuBuilder.js
RUN node /alvaldi-docs/scripts/search/index/createIndex.js
RUN ./hugo --logLevel info
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
