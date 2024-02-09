const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LitAction", () => {
  let LitAction;
  let litAction;
  let owner;
  let addr1;
  let addrs;

  beforeEach(async () => {
    LitAction = await ethers.getContractFactory("LitAction");
    [owner, addr1, ...addrs] = await ethers.getSigners();

    litAction = await LitAction.deploy("QmRwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm");
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await litAction.owner()).to.equal(owner.address);
    });

    it("Should assign the initial IPFS CID", async () => {
      expect(await litAction.ipfsCid()).to.equal("QmRwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm");
    });
  });

  describe("Transactions", () => {
    it("Should fail if IPFS CID update is called by non-owner", async () => {
      await expect(litAction.connect(addr1).updateIpfsCid("QmKwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm"))
        .to.be.revertedWith("Only the owner can call this function.");
    });

    it("Should update IPFS CID when called by owner", async () => {
      await litAction.updateIpfsCid("QmKwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm");
      expect(await litAction.ipfsCid()).to.equal("QmKwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm");
    });
  });
});
