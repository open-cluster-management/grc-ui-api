# Licensed Materials - Property of IBM
# (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
# Note to U.S. Government Users Restricted Rights:
# Use, duplication or disclosure restricted by GSA ADP Schedule
# Contract with IBM Corp.

#!/bin/bash
docker tag quay.io/open-cluster-management/grc-ui-api:${COMPONENT_VERSION}${COMPONENT_TAG_EXTENSION} quay.io/open-cluster-management/grc-ui-api:dev
docker push quay.io/open-cluster-management/grc-ui-api:dev