.PHONY: build-development
build-development: ## Build the development docker image.
	docker compose -f docker/development/docker-compose.yml build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker/development/docker-compose.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker/development/docker-compose.yml down

.PHONY: build-qa
build-qa: ## Build the qa docker image.
	docker compose -f docker/qa/docker-compose.yml build

.PHONY: start-qa
start-qa: ## Start the qa docker container.
	docker compose -f docker/qa/docker-compose.yml up -d

.PHONY: stop-qa
stop-qa: ## Stop the qa docker container.
	docker compose -f docker/qa/docker-compose.yml down
	
.PHONY: build-uat
build-uat: ## Build the uat docker image.
	docker compose -f docker/uat/docker-compose.yml build

.PHONY: start-uat
start-uat: ## Start the uat docker container.
	docker compose -f docker/uat/docker-compose.yml up -d

.PHONY: stop-uat
stop-uat: ## Stop the uat docker container.
	docker compose -f docker/uat/docker-compose.yml down
  
  
.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker/production/docker-compose.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/production/docker-compose.yml down