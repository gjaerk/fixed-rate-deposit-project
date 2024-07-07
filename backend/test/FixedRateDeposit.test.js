const FixedRateDeposit = artifacts.require("FixedRateDeposit");
const KYC = artifacts.require("KYC");
const Regulator = artifacts.require("Regulator");

contract("FixedRateDeposit", accounts => {
    let fixedRateDeposit, kyc, regulator;
    const [regulatorAddress, user1, user2] = accounts;

    before(async () => {
        kyc = await KYC.new(regulatorAddress);
        regulator = await Regulator.new(regulatorAddress);
        fixedRateDeposit = await FixedRateDeposit.new("0x...", kyc.address, regulator.address);
    });

    it("should allow regulator to approve KYC", async () => {
        await kyc.setKycStatus(user1, true, { from: regulatorAddress });
        const isApproved = await kyc.isKycApproved(user1);
        assert.isTrue(isApproved, "KYC approval failed");
    });

    it("should allow user to create a deposit", async () => {
        await fixedRateDeposit.createDeposit(web3.utils.toWei("20000", "ether"), 365, { from: user1 });
        const deposits = await fixedRateDeposit.getCustomerDeposits(user1);
        assert.equal(deposits.length, 1, "Deposit creation failed");
    });

    // Additional tests for interest calculation, withdrawal, etc.
});