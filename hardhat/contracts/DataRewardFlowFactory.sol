// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './DataRewardFlow.sol';

/**
 * @title DataRewardFlowFactory
 * @dev Factory contract to deploy and manage DataRewardFlow contracts
 */
contract DataRewardFlowFactory {
    address public owner;
    
    // Array to store all deployed campaign addresses
    address[] public deployedCampaigns;
    
    // Mapping from campaign index to campaign details
    struct CampaignInfo {
        address contractAddress;
        string name;
        string description;
        uint256 creationDate;
        bool isActive;
    }
    
    mapping(uint256 => CampaignInfo) public campaignInfo;
    uint256 public campaignCount;
    
    // Events
    event CampaignCreated(uint256 indexed campaignId, address indexed campaignAddress, string name);
    event CampaignDeactivated(uint256 indexed campaignId, address indexed campaignAddress);
    event CampaignReactivated(uint256 indexed campaignId, address indexed campaignAddress);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Creates a new DataRewardFlow campaign
     * @param _bucketaddress Storage location for the data
     * @param _targetData Description of the target data type
     * @param _name Name of the campaign
     * @param _description Description of the campaign
     * @return The address of the newly created campaign
     */
    function createCampaign(
        string memory _bucketaddress,
        string memory _targetData,
        string memory _name,
        string memory _description
    ) public returns (address) {
        DataRewardFlow newCampaign = new DataRewardFlow(_bucketaddress, _targetData);
        
        address campaignAddress = address(newCampaign);
        deployedCampaigns.push(campaignAddress);
        
        campaignCount++;
        campaignInfo[campaignCount] = CampaignInfo({
            contractAddress: campaignAddress,
            name: _name,
            description: _description,
            creationDate: block.timestamp,
            isActive: true
        });
        
        emit CampaignCreated(campaignCount, campaignAddress, _name);
        
        return campaignAddress;
    }
    
    /**
     * @dev Returns all deployed campaign addresses
     * @return Array of campaign addresses
     */
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
    
    /**
     * @dev Returns active campaign addresses
     * @return Array of active campaign addresses
     */
    function getActiveCampaigns() public view returns (address[] memory) {
        uint256 activeCount = 0;
        
        // Count active campaigns
        for (uint256 i = 1; i <= campaignCount; i++) {
            if (campaignInfo[i].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active campaigns
        address[] memory activeCampaigns = new address[](activeCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = 1; i <= campaignCount; i++) {
            if (campaignInfo[i].isActive) {
                activeCampaigns[currentIndex] = campaignInfo[i].contractAddress;
                currentIndex++;
            }
        }
        
        return activeCampaigns;
    }
    
    /**
     * @dev Deactivates a campaign
     * @param _campaignId The ID of the campaign to deactivate
     */
    function deactivateCampaign(uint256 _campaignId) public onlyOwner {
        require(_campaignId > 0 && _campaignId <= campaignCount, "Invalid campaign ID");
        require(campaignInfo[_campaignId].isActive, "Campaign already inactive");
        
        campaignInfo[_campaignId].isActive = false;
        
        emit CampaignDeactivated(_campaignId, campaignInfo[_campaignId].contractAddress);
    }
    
    /**
     * @dev Reactivates a campaign
     * @param _campaignId The ID of the campaign to reactivate
     */
    function reactivateCampaign(uint256 _campaignId) public onlyOwner {
        require(_campaignId > 0 && _campaignId <= campaignCount, "Invalid campaign ID");
        require(!campaignInfo[_campaignId].isActive, "Campaign already active");
        
        campaignInfo[_campaignId].isActive = true;
        
        emit CampaignReactivated(_campaignId, campaignInfo[_campaignId].contractAddress);
    }
    
    /**
     * @dev Gets detailed information about a campaign
     * @param _campaignId The ID of the campaign
     * @return contractAddress The address of the campaign contract
     * @return name The name of the campaign
     * @return description The description of the campaign
     * @return creationDate The timestamp when the campaign was created
     * @return isActive Whether the campaign is currently active
     */
    function getCampaignDetails(uint256 _campaignId) public view returns (
        address contractAddress,
        string memory name,
        string memory description,
        uint256 creationDate,
        bool isActive
    ) {
        require(_campaignId > 0 && _campaignId <= campaignCount, "Invalid campaign ID");
        
        CampaignInfo storage campaign = campaignInfo[_campaignId];
        return (
            campaign.contractAddress,
            campaign.name,
            campaign.description,
            campaign.creationDate,
            campaign.isActive
        );
    }
    
    /**
     * @dev Transfer factory ownership
     * @param _newOwner Address of the new owner
     */
    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}
