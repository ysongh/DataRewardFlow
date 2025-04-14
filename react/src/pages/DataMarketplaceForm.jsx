import React, { useContext, useState } from 'react';

import { ETHContext } from '../ETHContext';
import { useContracts } from '../utils/useContracts';

const DataMarketplaceForm = () => {
  const { signer } = useContext(ETHContext);
  const { createCampaign } = useContracts();

  const [formData, setFormData] = useState({
    campaignName: '',
    description: '',
    dataType: 'text',
    reward: '',
    tokens: '',
    startDate: '',
    endDate: '',
    requirements: '',
    aiVerification: true,
    privacySettings: 'standard',
    tags: '',
  });
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Campaign created:', formData);
    
    await createCampaign(
      signer,
      "0xFF000000000000000000000000000000000048E4",
      formData.requirements,
      formData.campaignName,
      formData.description
    );

    alert('Data collection campaign created successfully!');
  };

  const dataTypes = [
    { value: 'text', label: 'Text Data' },
    { value: 'image', label: 'Images' },
    { value: 'audio', label: 'Audio Recordings' },
    { value: 'video', label: 'Video Clips' },
    { value: 'sensors', label: 'Sensor Data' },
    { value: 'behavioral', label: 'Behavioral Data' },
  ];

  const privacyOptions = [
    { value: 'standard', label: 'Standard (Data anonymized)' },
    { value: 'enhanced', label: 'Enhanced (Additional protection layers)' },
    { value: 'open', label: 'Open (Public dataset)' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Create Data Collection Campaign</h1>
          <p className="mt-2 text-lg text-gray-600">Launch your token-incentivized data collection campaign for AI training</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {!preview ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Name*
                  </label>
                  <input
                    type="text"
                    id="campaignName"
                    name="campaignName"
                    value={formData.campaignName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter a descriptive name for your campaign"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Describe what kind of data you're collecting and how it will be used"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="dataType" className="block text-sm font-medium text-gray-700 mb-1">
                    Data Type*
                  </label>
                  <select
                    id="dataType"
                    name="dataType"
                    value={formData.dataType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {dataTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="tokens" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Token Budget*
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="tokens"
                      name="tokens"
                      value={formData.tokens}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="0"
                    />
                    <div className="absolute inset-y-0 left-0 ml-2 flex items-center pointer-events-none">
                      <span className="text-gray-500">FIL</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="reward" className="block text-sm font-medium text-gray-700 mb-1">
                    Reward per Submission*
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="reward"
                      name="reward"
                      value={formData.reward}
                      onChange={handleChange}
                      required
                      min="0.01"
                      step="0.01"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 left-0 ml-2 flex items-center pointer-events-none">
                      <span className="text-gray-500">FIL</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date*
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Data Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Specific requirements for data quality, format, etc."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="privacySettings" className="block text-sm font-medium text-gray-700 mb-1">
                    Privacy Settings
                  </label>
                  <select
                    id="privacySettings"
                    name="privacySettings"
                    value={formData.privacySettings}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {privacyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ai, machine learning, text data, etc."
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="aiVerification"
                      name="aiVerification"
                      checked={formData.aiVerification}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="aiVerification" className="ml-2 block text-sm text-gray-700">
                      Enable AI verification to analyze contributed data for authenticity
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">{formData.campaignName || "Campaign Name"}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags && formData.tags.split(',').map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-4 col-span-2">
                  <h3 className="text-lg font-medium text-gray-800">Description</h3>
                  <p className="text-gray-600">{formData.description || "No description provided."}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800">Details</h3>
                  <dl className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Data Type:</dt>
                      <dd className="text-sm text-gray-900">{dataTypes.find(t => t.value === formData.dataType)?.label}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Timeline:</dt>
                      <dd className="text-sm text-gray-900">
                        {formData.startDate} to {formData.endDate}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Privacy:</dt>
                      <dd className="text-sm text-gray-900">
                        {privacyOptions.find(o => o.value === formData.privacySettings)?.label}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">AI Verification:</dt>
                      <dd className="text-sm text-gray-900">{formData.aiVerification ? "Enabled" : "Disabled"}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800">Rewards</h3>
                  <dl className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Per Submission:</dt>
                      <dd className="text-sm font-medium text-indigo-600">₮ {formData.reward || "0.00"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Total Budget:</dt>
                      <dd className="text-sm font-medium text-indigo-600">₮ {formData.tokens || "0"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Estimated Submissions:</dt>
                      <dd className="text-sm text-gray-900">
                        {formData.reward && formData.tokens 
                          ? Math.floor(Number(formData.tokens) / Number(formData.reward))
                          : "0"}
                      </dd>
                    </div>
                  </dl>
                </div>

                {formData.requirements && (
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-800">Data Requirements</h3>
                    <p className="mt-2 text-gray-600">{formData.requirements}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  onClick={() => setPreview(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Edit Form
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Confirm & Launch
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataMarketplaceForm;
