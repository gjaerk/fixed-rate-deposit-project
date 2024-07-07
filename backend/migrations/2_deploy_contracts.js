const FixedRateDeposit = artifacts.require("FixedRateDeposit");
const KYC = artifacts.require("KYC");
const Regulator = artifacts.require("Regulator");

module.exports = function(deployer, network, accounts) {
    const regulatorAddress = accounts[0]; // Assume the first account is the regulator

    deployer.deploy(Regulator, regulatorAddress)
        .then(() => deployer.deploy(KYC, Regulator.address))
        .then(() => deployer.deploy(FixedRateDeposit, KYC.address, Regulator.address));
};