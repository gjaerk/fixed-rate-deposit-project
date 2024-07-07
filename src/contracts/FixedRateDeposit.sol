// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./KYC.sol";
import "./Regulator.sol";

contract FixedRateDeposit {
    struct Deposit {
        address depositor;
        uint256 amount;
        uint256 startDate;
        uint256 endDate;
        uint256 interestRate;
        bool isClosed;
    }

    mapping(address => Deposit[]) public deposits;
    address[] public depositors;
    uint256 public minDeposit = 20000 * 1e18; // 20,000 GBP in wei
    uint256 public maxDeposit = 85000 * 1e18; // 85,000 GBP in wei
    uint256 public fixedInterestRate = 450; // 4.50% APR
    KYC public kyc;
    Regulator public regulator;

    event DepositCreated(address indexed depositor, uint256 amount, uint256 startDate, uint256 endDate);
    event DepositMatured(address indexed depositor, uint256 amount, uint256 interest);

    constructor(address _kycAddress, address _regulatorAddress) {
        kyc = KYC(_kycAddress);
        regulator = Regulator(_regulatorAddress);
    }

    function createDeposit(uint256 _amount, uint256 _termInDays) external {
        require(kyc.isKycApproved(msg.sender), "KYC not approved");
        require(_amount >= minDeposit && _amount <= maxDeposit, "Invalid deposit amount");
        require(_termInDays == 365 || _termInDays == 730, "Invalid term"); // 1 or 2 years

        uint256 endDate = block.timestamp + (_termInDays * 1 days);
        deposits[msg.sender].push(Deposit(msg.sender, _amount, block.timestamp, endDate, fixedInterestRate, false));
        depositors.push(msg.sender);

        emit DepositCreated(msg.sender, _amount, block.timestamp, endDate);
    }

    function calculateInterest(uint256 _amount, uint256 _termInDays) public view returns (uint256) {
        return (_amount * fixedInterestRate * _termInDays) / (365 * 10000);
    }

    function withdrawMaturedDeposit(uint256 _index) external {
        Deposit storage deposit = deposits[msg.sender][_index];
        require(block.timestamp >= deposit.endDate, "Deposit not matured");
        require(!deposit.isClosed, "Deposit already closed");

        uint256 interest = calculateInterest(deposit.amount, (deposit.endDate - deposit.startDate) / 1 days);
        uint256 totalAmount = deposit.amount + interest;

        deposit.isClosed = true;
        payable(msg.sender).transfer(totalAmount);

        emit DepositMatured(msg.sender, deposit.amount, interest);
    }

    function getTotalDepositsAndLiabilities() external view returns (uint256 totalDeposits, uint256 totalLiabilities) {
        for (uint i = 0; i < depositors.length; i++) {
            address depositor = depositors[i];
            for (uint j = 0; j < deposits[depositor].length; j++) {
                Deposit memory dep = deposits[depositor][j];
                if (!dep.isClosed) {
                    totalDeposits += dep.amount;
                    totalLiabilities += dep.amount + calculateInterest(dep.amount, (dep.endDate - dep.startDate) / 1 days);
                }
            }
        }
    }
}