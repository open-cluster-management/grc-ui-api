# Copyright Contributors to the Open Cluster Management project

FROM registry.access.redhat.com/ubi8/nodejs-14:1 as builder

USER root
RUN yum install git -y

RUN mkdir -p /opt/app-root/src/grc-ui
WORKDIR /opt/app-root/src/grc-ui-api
COPY . .

RUN make install
RUN make build-prod
RUN make prune

FROM registry.ci.openshift.org/open-cluster-management/common-nodejs-parent:nodejs-14
RUN microdnf update
RUN ./install-npm.sh

RUN mkdir -p /opt/app-root/src/grc-ui-api
WORKDIR /opt/app-root/src/grc-ui-api

COPY --from=builder /opt/app-root/src/grc-ui-api /opt/app-root/src/grc-ui-api

ENV BABEL_DISABLE_CACHE=1 \
    NODE_ENV=production \
    USER_UID=1001

EXPOSE 4000

USER ${USER_UID}
CMD ["node", "./output/index.js"]
