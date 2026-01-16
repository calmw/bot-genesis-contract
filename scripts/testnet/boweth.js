const {ethers} = require("hardhat")
const {BigNumber} = require("ethers");
const {write_contract_address} = require("../fs");


const perfix = "testnet_"
const contract_name = "BOWETH"

async function main() {

    const contract = await ethers.getContractFactory(contract_name)
    console.log("Deploying .........")

    const contractObj = await contract.deploy('BOHR Wrapped ETH', 'BOWETH', BigNumber.from(18));
    // 等待部署完成
    await contractObj.deployed();
    console.log("contract deployed to:", contractObj.address);
    write_contract_address(perfix + contract_name, contractObj.address)
    const MINTER_ROLE = await contractObj.MINTER_ROLE();
    const [deployer] = await ethers.getSigners();
    await (await contractObj.grantRole(
        MINTER_ROLE,
        deployer.address
    )).wait();
    await (await contractObj.mint(
        "0x3f14Aee7837002Be71F6567c01F55d86468F6a9c",
        ethers.utils.parseUnits("1000000000000000000000000000000000000", 6)
    )).wait();
    const name = await contractObj.name();
    const symbol = await contractObj.symbol();
    const decimals = await contractObj.decimals();
    const totalSupply = await contractObj.totalSupply();

    console.log(`Name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Decimals: ${decimals}`);
    console.log(`Total Supply: ${ethers.utils.formatUnits(totalSupply, decimals)}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });