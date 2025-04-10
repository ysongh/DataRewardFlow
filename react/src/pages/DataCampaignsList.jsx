import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataCampaignsList = () => {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      campaignName: 'Conversational Text Dataset',
      description: 'Collection of natural language conversations for training chatbot models',
      dataType: 'text',
      reward: '5.00',
      tokens: '10000',
      startDate: '2025-04-05',
      endDate: '2025-06-05',
      requirements: 'Conversations must be natural, diverse in topics, and at least 10 exchanges long.',
      aiVerification: true,
      privacySettings: 'standard',
      tags: 'nlp, conversation, chatbot',
      creator: 'AI Research Lab',
      submissions: 245,
      status: 'active',
      percentFilled: 65
    },
    {
      id: '2',
      campaignName: 'User Interface Interactions',
      description: 'Collection of behavioral data on how users interact with different UI elements',
      dataType: 'behavioral',
      reward: '3.50',
      tokens: '7000',
      startDate: '2025-04-10',
      endDate: '2025-05-10',
      requirements: 'Record all clicks, scrolls, and time spent on different UI elements.',
      aiVerification: true,
      privacySettings: 'enhanced',
      tags: 'ui, ux, behavioral',
      creator: 'UX Optimization Inc.',
      submissions: 320,
      status: 'active',
      percentFilled: 45
    },
    {
      id: '3',
      campaignName: 'Multilingual Speech Samples',
      description: 'Audio recordings of speakers from different languages and dialects',
      dataType: 'audio',
      reward: '8.75',
      tokens: '15000',
      startDate: '2025-03-15',
      endDate: '2025-07-15',
      requirements: 'Clear audio, minimum 30 seconds per recording, variety of phrases and sentences.',
      aiVerification: true,
      privacySettings: 'standard',
      tags: 'audio, multilingual, speech',
      creator: 'Global Language AI',
      submissions: 87,
      status: 'active',
      percentFilled: 15
    },
    {
      id: '4',
      campaignName: 'Medical Image Classification',
      description: 'Collection of anonymized medical images for diagnostic AI training',
      dataType: 'image',
      reward: '12.00',
      tokens: '20000',
      startDate: '2025-02-20',
      endDate: '2025-04-10',
      requirements: 'Images must be high quality, properly anonymized, and include basic diagnostic information.',
      aiVerification: true,
      privacySettings: 'enhanced',
      tags: 'medical, imaging, healthcare',
      creator: 'MedTech Innovations',
      submissions: 450,
      status: 'completed',
      percentFilled: 100
    },
    {
      id: '5',
      campaignName: 'Environmental Sound Dataset',
      description: 'Audio recordings of environmental sounds for acoustic event detection',
      dataType: 'audio',
      reward: '4.25',
      tokens: '8500',
      startDate: '2025-04-01',
      endDate: '2025-06-30',
      requirements: 'Clear recordings of distinct environmental sounds with location metadata.',
      aiVerification: true,
      privacySettings: 'open',
      tags: 'audio, environment, acoustic',
      creator: 'EcoSense Labs',
      submissions: 110,
      status: 'active',
      percentFilled: 28
    }
  ]);

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    dataType: '',
    status: '',
    sortBy: 'newest'
  });
  
  const dataTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'text', label: 'Text Data' },
    { value: 'image', label: 'Images' },
    { value: 'audio', label: 'Audio' },
    { value: 'video', label: 'Video' },
    { value: 'behavioral', label: 'Behavioral' },
    { value: 'sensors', label: 'Sensors' }
  ];
  
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'upcoming', label: 'Upcoming' }
  ];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'reward-high', label: 'Highest Reward' },
    { value: 'reward-low', label: 'Lowest Reward' }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters to the campaigns list
  const filteredCampaigns = campaigns.filter(campaign => {
    // Search filter
    const searchMatch = campaign.campaignName.toLowerCase().includes(filters.search.toLowerCase()) || 
                      campaign.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                      campaign.tags.toLowerCase().includes(filters.search.toLowerCase());
    
    // Data type filter
    const dataTypeMatch = filters.dataType === '' || campaign.dataType === filters.dataType;
    
    // Status filter
    const statusMatch = filters.status === '' || campaign.status === filters.status;
    
    return searchMatch && dataTypeMatch && statusMatch;
  });

  // Sort the filtered campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.startDate) - new Date(a.startDate);
      case 'oldest':
        return new Date(a.startDate) - new Date(b.startDate);
      case 'reward-high':
        return parseFloat(b.reward) - parseFloat(a.reward);
      case 'reward-low':
        return parseFloat(a.reward) - parseFloat(b.reward);
      default:
        return 0;
    }
  });

  // Function to determine the color scheme based on data type
  const getTypeColor = (type) => {
    switch (type) {
      case 'text':
        return 'bg-blue-100 text-blue-800';
      case 'image':
        return 'bg-green-100 text-green-800';
      case 'audio':
        return 'bg-purple-100 text-purple-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'behavioral':
        return 'bg-orange-100 text-orange-800';
      case 'sensors':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to determine the status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'completed':
        return 'text-gray-600';
      case 'upcoming':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Data Collection Campaigns</h1>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => navigate('/create-marketplace')}
          >
            Create Campaign
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search campaigns..."
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="dataType" className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
              <select
                id="dataType"
                name="dataType"
                value={filters.dataType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {dataTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results counter */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {sortedCampaigns.length} of {campaigns.length} campaigns
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {sortedCampaigns.length > 0 ? (
            sortedCampaigns.map(campaign => (
              <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="sm:flex sm:justify-between sm:items-start">
                  {/* Campaign main info */}
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h2 className="text-xl font-bold text-gray-900">{campaign.campaignName}</h2>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">by {campaign.creator}</p>
                    
                    <p className="mt-2 text-gray-600 line-clamp-2">{campaign.description}</p>
                    
                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(campaign.dataType)}`}>
                        {campaign.dataType}
                      </span>
                      {campaign.tags.split(',').map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Campaign metrics */}
                  <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0 flex flex-col items-end">
                    <div className="text-2xl font-bold text-indigo-600">₮ {campaign.reward}</div>
                    <div className="text-sm text-gray-500">per submission</div>
                    
                    <div className="mt-4 w-full max-w-xs">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{campaign.submissions} submissions</span>
                        <span>{campaign.percentFilled}% filled</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${campaign.percentFilled}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Campaign details footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                  </div>
                  
                  <div className="mt-2 sm:mt-0 flex space-x-2">
                    <button 
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => alert(`View details for campaign ${campaign.id}`)}
                    >
                      View Details
                    </button>
                    <button 
                      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => navigate('/data-submission/' + campaign.id)}
                    >
                      Participate
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No campaigns match your search criteria.</p>
            </div>
          )}
        </div>
        
        {/* Page navigation */}
        {sortedCampaigns.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a href="#" className="py-2 px-4 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 text-sm font-medium text-gray-500">
                Previous
              </a>
              <a href="#" className="py-2 px-4 bg-white border-t border-b border-gray-300 hover:bg-gray-50 text-sm font-medium text-indigo-600">
                1
              </a>
              <a href="#" className="py-2 px-4 bg-white border-t border-b border-gray-300 hover:bg-gray-50 text-sm font-medium text-gray-500">
                2
              </a>
              <a href="#" className="py-2 px-4 bg-white border-t border-b border-gray-300 hover:bg-gray-50 text-sm font-medium text-gray-500">
                3
              </a>
              <a href="#" className="py-2 px-4 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 text-sm font-medium text-gray-500">
                Next
              </a>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCampaignsList;
