build: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app)
build: ## [*] Build or rebuild one or all service containers
	docker compose build --force-rm --pull $(service)

up reload: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app)
up reload: recreate ?=
up reload: ## [*] Up/Reload one or all service containers
	docker compose up -d --remove-orphans $(recreate) $(service)

start: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app)
start: ## [*] Start one or all service containers
	docker compose start $(service)

restart: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app)
restart: ## [*] Restart one or all service containers
	docker compose restart $(service)

stop: ## [*] Stop or or all service containers
	docker compose stop $(service)

remove: ## [*] Stop and Remove one or all service containers
	docker compose rm --force --stop $(service)

down d: ## [*] Down one or all service container[s], network[s] and volume[s]
	docker compose down $(service)

status ps s: ## [*] Show status of services
	docker compose ps $(service)

cli exec: bash ?= ash
cli exec: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app) 
cli exec: tty ?= 
cli exec: ## [*] Execute commands in service containers, use "command"  argument to send the command. By Default enter the shell.
	docker compose exec $(tty) $(service) $(bash) $(command)

run: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app)
run: bash ?= ash
run: ports ?=
run: ## [*] Run commands in a new service container
	docker compose run --rm $(ports) $(service) $(bash) $(command)

logs log l: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app)
logs log l: follow ?= -f
logs log l: ## [*] Show logs. Usage: make logs [service=app]
	docker compose logs $(follow) $(service)

copy: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app)
copy: path ?= /app/yarn.lock
copy: destination ?= .
copy: | up ## [*] Copy app files/directories from service container to host
	docker compose cp $(service):$(path) $(destination)

sync: service ?= $(if ${DEFAULT_SERVICE},${DEFAULT_SERVICE},app)
sync: ## [*] Copy packages files generated inside service container to host
	make copy service=$(service)
	make copy path=/app/package.json service=$(service)
	make copy path=/app/node_modules service=$(service)
	make copy path=/app/.yarn service=$(service)
	make copy path=/app/.yarnrc.yml service=$(service)

linter lint: ## [*] Lint code
	make exec bash="" command="yarn lint"

storybook sb: ## [*] Reload or UP storybook service
	make up service="storybook"

cfcm.download: dirname ?= $(if ${CONTENTFUL_ENVIRONMENT},${CONTENTFUL_ENVIRONMENT},master)
cfcm.download: token ?= $(if ${CONTENTFUL_MANAGEMENT_API_TOKEN},${CONTENTFUL_MANAGEMENT_API_TOKEN},-)
cfcm.download: space ?= $(if ${CONTENTFUL_SPACE_ID},${CONTENTFUL_SPACE_ID},-)
cfcm.download: environment ?= $(if ${CONTENTFUL_ENVIRONMENT},${CONTENTFUL_ENVIRONMENT},master)
cfcm.download: ## [*] Export contentful space content model
ifeq ($(space), -)
	$(error Space id is not set)
endif
ifeq ($(token), -)
	$(error Token Management API is not set)
endif
	$(info Exporting contentful space content model ...)
	mkdir -p doc/contentful
	make exec bash="" command="mkdir -p /app/doc/contentful/$(dirname)"
	make exec bash="" command="contentful space export --space-id $(space) --environment-id $(environment) --management-token $(token) --export-dir /app/doc/contentful/$(dirname) --skip-content --skip-roles --skip-webhooks"
	make copy path="/app/doc/contentful/$(dirname)" destination="./doc/contentful/"

cfcm.backup: dirname ?= $(if ${CONTENTFUL_ENVIRONMENT},${CONTENTFUL_ENVIRONMENT},master)
cfcm.backup: token ?= $(if ${CONTENTFUL_MANAGEMENT_API_TOKEN},${CONTENTFUL_MANAGEMENT_API_TOKEN},-)
cfcm.backup: space ?= $(if ${CONTENTFUL_SPACE_ID},${CONTENTFUL_SPACE_ID},-)
cfcm.backup: environment ?= $(if ${CONTENTFUL_ENVIRONMENT},${CONTENTFUL_ENVIRONMENT},master)
cfcm.backup: ## [*] Export full contentful space backup
ifeq ($(space), -)
	$(error Space id is not set)
endif
ifeq ($(token), -)
	$(error Token Management API is not set)
endif
	$(info Exporting full contentful space backup ...)
	mkdir -p doc/contentful
	make exec bash="" command="mkdir -p /app/doc/contentful/$(dirname)"
	make exec bash="" command="contentful space export --space-id $(space) --environment-id $(environment) --management-token $(token) --export-dir /app/doc/contentful/$(dirname) --download-assets"
	make copy path="/app/doc/contentful/$(dirname)" destination="./doc/contentful/"
