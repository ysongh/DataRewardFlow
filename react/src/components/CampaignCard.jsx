import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CampaignCard({ id, signer, getCampaignDetails }) {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState([]);

  useEffect(() => {
    if (signer) fetchCampaignDetails();
  }, [signer])
  
  const fetchCampaignDetails = async () => {
    const data = await getCampaignDetails(signer, id + 1);
    setCampaignData(data);
  }

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

  console.log(id)

  return (
    <div key={id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="sm:flex sm:justify-between sm:items-start">
        {/* Campaign main info */}
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-900">{campaignData[1]}</h2>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor('active')}`}>
              Active
            </span>
          </div>
          
          <p className="text-sm text-gray-500 mt-1">by {campaignData[0]}</p>
          
          <p className="mt-2 text-gray-600 line-clamp-2">{campaignData[2]}</p>
          
          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor('text')}`}>
              text
            </span>
          </div>
        </div>
        
        {/* Campaign metrics */}
        {/* <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0 flex flex-col items-end">
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
        </div> */}
      </div>
      
      {/* Campaign details footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center">
        <div className="text-sm text-gray-500">
          {/* {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()} */}
          3/14/2025 - 7/14/2025
        </div>
        
        <div className="mt-2 sm:mt-0 flex space-x-2">
          <button 
            className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => alert(`View details for campaign ${id}`)}
          >
            View Details
          </button>
          <button 
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => navigate('/data-submission/' + id)}
          >
            Participate
          </button>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard;