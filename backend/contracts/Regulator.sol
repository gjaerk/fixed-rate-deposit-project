// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Regulator {
    address public regulatorAddress;

    modifier onlyRegulator() {
        require(msg.sender == regulatorAddress, "Only regulator can call this function");
        _;
    }

    constructor(address _regulatorAddress) {
        regulatorAddress = _regulatorAddress;
    }

    function getRegulatorAddress() external view returns (address) {
        return regulatorAddress;
    }

    function updateInterestRate(uint256 _newRate) external onlyRegulator {
        // Logic to update interest rate
    }

    function generateRegulatoryReport() external onlyRegulator {
        // Logic to generate regulatory report
    }
}