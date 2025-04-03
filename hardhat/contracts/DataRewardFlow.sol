// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataRewardFlow {
    address public owner;
    address public verifier;
    
    mapping(address => uint256) public tokenBalances;
    
    struct DataSubmission {
        uint256 key;
        address contributor;
        string dataHash;
        bool isVerified;
        bool isRewarded;
        uint256 rewardAmount;
    }
    
    mapping(uint256 => DataSubmission) public submissions;
    uint256 public submissionCount;
    
    uint256 public rewardRate = 10 * 10**18;

    event DataSubmitted(uint256 submissionId, address contributor, string dataHash);
    event DataVerified(uint256 submissionId, bool isVerified);
    event RewardDistributed(uint256 submissionId, address contributor, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        verifier = msg.sender;
        tokenBalances[owner] = 1000000 * 10**18;
    }
    
    function submitData(string memory _dataHash, uint256 _key) external {
        submissionCount++;
        submissions[submissionCount] = DataSubmission({
            key: _key,
            contributor: msg.sender,
            dataHash: _dataHash,
            isVerified: false,
            isRewarded: false,
            rewardAmount: 0
        });
        
        emit DataSubmitted(submissionCount, msg.sender, _dataHash);
    }
    
    function verifyData(uint256 _submissionId, bool _isValid) external onlyVerifier {
        require(_submissionId <= submissionCount, "Invalid submission ID");
        DataSubmission storage submission = submissions[_submissionId];
        require(!submission.isVerified, "Data already verified");
        
        submission.isVerified = true;
        if (_isValid) {
            submission.rewardAmount = rewardRate;
        }
        
        emit DataVerified(_submissionId, _isValid);
    }

    function distributeReward(uint256 _submissionId) external {
        require(_submissionId <= submissionCount, "Invalid submission ID");
        DataSubmission storage submission = submissions[_submissionId];
        require(submission.isVerified, "Data not verified yet");
        require(!submission.isRewarded, "Reward already distributed");
        require(submission.rewardAmount > 0, "No reward assigned");
        require(tokenBalances[owner] >= submission.rewardAmount, "Insufficient token balance");
        
        submission.isRewarded = true;
        tokenBalances[owner] -= submission.rewardAmount;
        tokenBalances[submission.contributor] += submission.rewardAmount;
        
        emit RewardDistributed(_submissionId, submission.contributor, submission.rewardAmount);
    }
    
    function setVerifier(address _newVerifier) external onlyOwner {
        require(_newVerifier != address(0), "Invalid address");
        verifier = _newVerifier;
    }
    
    function setRewardRate(uint256 _newRate) external onlyOwner {
        rewardRate = _newRate;
    }
    
    function getBalance(address _user) external view returns (uint256) {
        return tokenBalances[_user];
    }

    function withdrawTokens(uint256 _amount) external {
        require(tokenBalances[msg.sender] >= _amount, "Insufficient balance");
        tokenBalances[msg.sender] -= _amount;
    }
}