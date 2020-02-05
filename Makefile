###############################################################################
# Licensed Materials - Property of IBM Copyright IBM Corporation 2017, 2019. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP
# Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation - initial API and implementation
###############################################################################

include Configfile

init::
-include $(shell curl -H 'Authorization: token ${GITHUB_TOKEN}' -H 'Accept: application/vnd.github.v4.raw' -L https://api.github.com/repos/open-cluster-management/build-harness-extensions/contents/templates/Makefile.build-harness-bootstrap -o .build-harness-bootstrap; echo .build-harness-bootstrap)

.PHONY: run
run: 
ifeq ($(ARCH), x86_64)
	# Both containers grc-ui and grc-ui-api must be on the same network.
	docker network create --subnet 10.10.0.0/16 $(NETWORK_NAME)
	make docker:info DOCKER_NETWORK_OP=$(NETWORK_OP) DOCKER_NETWORK=$(NETWORK_NAME)
	make docker:run DOCKER_NETWORK_OP=$(NETWORK_OP) DOCKER_NETWORK=$(NETWORK_NAME)
endif

.PHONY: unit-test
unit-test:
	if [ ! -d "test-output" ]; then \
		mkdir test-output; \
	fi
	npm test
