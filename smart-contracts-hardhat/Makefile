NETWORK ?= goerli
# CONTRACT

.PHONY: all install deploy

all: install deploy

install:
	npm install

deploy:
	npx hardhat run scripts/deploy.ts --network $(NETWORK)

verify: 
	npx hardhat verify --network $(NETWORK) $(CONTRACT)

verify-raffle:
	npx hardhat verify --network $(NETWORK) $(CONTRACT) 0x07865c6E87B9F70255377e024ace6630C1Eaa37F 100000000000000 10000000 500 500 0x34Dbc2e9DD2E53dF96dC8B33b716bDf5eA35ebd4 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15 14483 500000
