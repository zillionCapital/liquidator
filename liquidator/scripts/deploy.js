// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const JOETROLLER_ADDRESS = "0xdc13687554205E5b89Ac783db14bb5bba4A1eDaC";
const JOE_ROUTER_02_ADDRESS = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4";
const JWETH_ADDRESS = "0x929f5caB61DFEc79a5431a7734a68D714C4633fa";
const JUSDC_ADDRESS = "0xEd6AaF91a2B084bd594DBd1245be3691F9f637aC";
const JLINK_ADDRESS = "0x585E7bC75089eD111b656faA7aeb1104F5b96c15";
const JUSDT_ADDRESS = "0x8b650e26404AC6837539ca96812f0123601E4448";

const WAVAX = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
const LINK = "0x5947BB275c521040051D82396192181b413227A3";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const JoeLiquidatorContractFactory = await hre.ethers.getContractFactory("JoeLiquidator");
  const joeLiquidatorContract = await JoeLiquidatorContractFactory.deploy(
    JOETROLLER_ADDRESS,
    JOE_ROUTER_02_ADDRESS,
    JUSDC_ADDRESS,
    JWETH_ADDRESS
  );

  await joeLiquidatorContract.deployed();

  console.log(" JoeLiquidator deployed to:", joeLiquidatorContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
