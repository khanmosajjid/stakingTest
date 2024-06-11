// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingContract is Ownable {
    IERC20 public stakingToken;
    uint256 public lockingPeriod; // in seconds
    uint256 public rewardRate; // reward per second per token staked

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 lastClaimedTime;
    }

    mapping(address => Stake) public stakes;

    constructor(IERC20 _stakingToken, uint256 _lockingPeriod, uint256 _rewardRate) Ownable(msg.sender) {
        stakingToken = _stakingToken;
        lockingPeriod = _lockingPeriod;
        rewardRate = _rewardRate;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        stakes[msg.sender] = Stake(_amount, block.timestamp, block.timestamp);
    }

    function unstake() external {
        Stake memory stakeInfo = stakes[msg.sender];
        require(stakeInfo.amount > 0, "No stake found");
        require(block.timestamp >= stakeInfo.startTime + lockingPeriod, "Locking period not over");

        uint256 reward = calculateReward(msg.sender);
        if (reward > 0) {
            stakingToken.transfer(msg.sender, reward);
        }

        stakingToken.transfer(msg.sender, stakeInfo.amount);
        delete stakes[msg.sender];
    }

    function claimReward() external {
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No reward to claim");

        stakes[msg.sender].lastClaimedTime = block.timestamp;
        stakingToken.transfer(msg.sender, reward);
    }

    function calculateReward(address _staker) public view returns (uint256) {
        Stake memory stakeInfo = stakes[_staker];
        if (stakeInfo.amount == 0) {
            return 0;
        }

        uint256 stakingDuration = block.timestamp - stakeInfo.lastClaimedTime;
        if (stakingDuration > lockingPeriod) {
            stakingDuration = lockingPeriod;
        }

        return stakeInfo.amount * stakingDuration * rewardRate;
    }

     function withdrawToken(uint256 _amount) external onlyOwner {
        stakingToken.transfer(owner(), _amount);
    }

    // Withdraw Ether from the contract (only owner)
    function withdrawEther(uint256 _amount) external onlyOwner {
        payable(owner()).transfer(_amount);
    }
}