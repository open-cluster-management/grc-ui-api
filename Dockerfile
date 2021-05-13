# Copyright Contributors to the Open Cluster Management project

FROM registry.access.redhat.com/ubi8/nodejs-14:1 as builder

USER root
WORKDIR /opt/app-root/src/grc-ui-api
COPY . .

RUN npm ci 
RUN make lint
RUN make build-prod
RUN make prune

FROM registry.access.redhat.com/ubi8/nodejs-14:1
USER root
RUN yum -y remove nodejs-nodemon
RUN yum -y update

RUN mkdir -p /opt/app-root/src/grc-ui-api
WORKDIR /opt/app-root/src/grc-ui-api

COPY --from=builder /opt/app-root/src/grc-ui-api /opt/app-root/src/grc-ui-api

ENV BABEL_DISABLE_CACHE=1 \
    NODE_ENV=production \
    USER_UID=1001

EXPOSE 4000

USER ${USER_UID}
CMD ["node", "./output/index.js"]
