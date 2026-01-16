require('@openzeppelin/hardhat-upgrades')
require("@nomiclabs/hardhat-waffle");
const PRIVATE_KEY = process.env.BOHR_TOKEN
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.6.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            }
        ]
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 2000
        }
    },
    networks: {
        bot_test: {
            url: "http://rpc.bohr.life",
            accounts: [`${PRIVATE_KEY}`]
        },
        bot: {
            url: "https://api.zan.top/bsc-mainnet",
            accounts: [`${PRIVATE_KEY}`]
        }
    },

    etherscan: {
        apiKey: {
            bot: "YOUR_SCAN_API_KEY",
        },
        customChains: [
            {
                network: "bot",
                chainId: 968,
                urls: {
                    apiURL: "https://scan.bohr.life/api",
                    browserURL: "https://scan.bohr.life"
                }
            }
        ]
    }
}
