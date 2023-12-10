![Token Price Oracle - SC - banner](./assets/banner.jpeg)
# Token Price Oracle - Smart Contracts
The core Solidity contracts for the Token Price Oracle

## Requirements
To run the project, you'll need:
- [Node.js](https://nodejs.org/en/) (Version 16 works)
- [Yarn](https://yarnpkg.com/)

## Running the project
### Installation
#### Git
1. Clone the repo: ```git clone https://github.com/pajicf/token-price-oracle.git```
2. Navigate to the folder: ```cd token-price-oracle```

#### Installing the dependencies
3. Run ```yarn``` to install the dependencies
4. Run ```cp .env.example .env``` and fill the values

#### Hardhat
- Compile: ```yarn compile```
- Tests: ```yarn test```

#### Contracts CLI
- Set a new price for a ticker: ```yarn contracts:set-ticker-price```
- Set a new feed for a ticker: ```yarn contracts:set-ticker-feed```

#### Miscellanious
- Project linting: ```yarn lint```
- Documentation generation: ```yarn docs:generate```

## Documentation
All the Smart Contract documentation can be found inside the `/docs` folder:  
 - [`docs/api`](https://github.com/pajicf/token-price-oracle/tree/main/docs/api) - Contains the API of the Smart Contracts generated from the natspec
 - [`docs/diagrams`](https://github.com/pajicf/token-price-oracle/tree/main/docs/diagrams) - Contains the Diagrams of common SC interactions

## Deployments
### How to Deploy on a new network?
The Deployment is done decoratively using [Hardhat Ignition](https://hardhat.org/ignition/docs/getting-started#overview).  
To deploy to the new network, you should:
1. Add the network to the [`hardhat.config.ts`](https://github.com/pajicf/token-price-oracle/blob/main/contracts/hardhat.config.ts) file
2. Run ```yarn hardhat ignition deploy /ignition/modules/TickerPriceStorage.ts --network yournewnetwok --verify```
> [!IMPORTANT]  
> Ensure that the network you're deploying supports Etherscan for verification to be successfull

### Bytecode
All the deployment and build artifacts are located inside [`ignition/deplotments`](https://github.com/pajicf/token-price-oracle/tree/main/ignition/deployments) 

### Block Explorer Links
Ξ Ethereum Göerli:  
`TickerUSDFeedRegistry`: [0xF3D020838782213d3da52daa079A9c07F0A8e67e](https://goerli.etherscan.io/address/0xF3D020838782213d3da52daa079A9c07F0A8e67e#code)  
`TickerPriceStorage`: [0xa909e0bC9a35cC161dE9eA85cA76AB7A9b5b0121](https://goerli.etherscan.io/address/0xa909e0bC9a35cC161dE9eA85cA76AB7A9b5b0121#code)

Ξ Ethereum Sepolia:  
`TickerUSDFeedRegistry`: [0xF3D020838782213d3da52daa079A9c07F0A8e67e](https://sepolia.etherscan.io/address/0xF3D020838782213d3da52daa079A9c07F0A8e67e#code)  
`TickerPriceStorage`: [0xa909e0bC9a35cC161dE9eA85cA76AB7A9b5b0121](https://sepolia.etherscan.io/address/0xa909e0bC9a35cC161dE9eA85cA76AB7A9b5b0121#code)