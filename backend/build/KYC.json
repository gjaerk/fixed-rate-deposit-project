// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KYC {
    mapping(address => bool) public kycApproved;
    address public regulatorAddress;

    modifier onlyRegulator() {
        require(msg.sender == regulatorAddress, "Only regulator can call this function");
        _;
    }

    constructor(address _regulatorAddress) {
        regulatorAddress = _regulatorAddress;
    }

    function setKycStatus(address _customer, bool _status) external onlyRegulator {
        kycApproved[_customer] = _status;
    }

    function isKycApproved(address _customer) external view returns (bool) {
        return kycApproved[_customer];
    }
}