#!make

# Initial variables
os ?= $(shell uname -s)

# Load custom setitngs
-include .env
include ops/makefile

init i: ## [*] Create and start the environment. This is the default task.
	make build
	make up

h help: ## [!] This help.
	@echo 'ℹ️  Usage: make <task> [option=value]' 
	@echo 'Default task: init'
	@echo
	@echo '{*} Tasks:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9., _-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := init
.PHONY: all test $(MAKECMDGOALS)
