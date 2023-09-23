NETWORK ?= sepolia
# CONTRACT

.PHONY: all install deploy

all: install deploy

install:
	npm install

deploy:
	npx hardhat run scripts/deploy.ts --network $(NETWORK)

verify: 
	npx hardhat verify --network sepolia $(CONTRACT)
