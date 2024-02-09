const hre = require("hardhat");

async function main() {
  const litAction = await hre.ethers.deployContract("LitAction", ["QmRwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm"]);
  await litAction.waitForDeployment();

  console.log(
    `LitAction with IPFS CID: QmRwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm deployed to ${litAction.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
