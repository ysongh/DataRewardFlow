import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ETHContext } from '../ETHContext';
import { useContracts } from '../utils/useContracts';

const DataSubmission = () => {
  const { campaignid } = useParams();
  const { signer } = useContext(ETHContext);
  const { getCampaignDetails } = useContracts();

  const campaign = {
    id: '1',
    campaignName: 'Conversational Text Dataset',
    description: 'Collection of natural language conversations for training chatbot models',
    dataType: 'text',
    reward: '5.00',
    requirements: 'Conversations must be natural, diverse in topics, and at least 10 exchanges long.',
    aiVerification: true,
    creator: 'AI Research Lab',
    submissionsRequired: 500,
    submissionsReceived: 245
  };

  const [campaignData, setCampaignData] = useState([]);
  const [submissionData, setSubmissionData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [aiVerificationResult, setAiVerificationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const minCharCount = 250; // Minimum character requirement

  useEffect(() => {
    if (signer) fetchCampaignDetails();
  }, [signer])
  
  const fetchCampaignDetails = async () => {
    const data = await getCampaignDetails(signer, campaignid + 1);
    setCampaignData(data);
  }

  const handleDataChange = (e) => {
    setSubmissionData(e.target.value);
    // Clear previous verification results when data changes
    if (aiVerificationResult) {
      setAiVerificationResult(null);
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const checkSubmissionValidity = (text) => {
    // Basic validation check for minimum character count
    if (text.length < minCharCount) {
      return {
        valid: false,
        message: `Your submission must be at least ${minCharCount} characters long.`
      };
    }
    return { valid: true };
  };

  const simulateAiVerification = (text) => {
    // This is a mock AI verification that would be replaced with actual AI analysis in production
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple mock verification that randomly passes 80% of submissions
        const randomScore = Math.random();
        const threshold = 0.2; // 20% chance of rejection
        
        if (randomScore > threshold) {
          resolve({
            passed: true,
            score: (randomScore * 100).toFixed(1),
            feedback: "The submission meets quality requirements and appears to be authentic data."
          });
        } else {
          resolve({
            passed: false,
            score: (randomScore * 100).toFixed(1),
            feedback: "The submission appears to be low quality or potentially generated by AI. Please provide more authentic data."
          });
        }
      }, 1500); // Simulate processing time
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the submission
    const validationResult = checkSubmissionValidity(submissionData);
    if (!validationResult.valid) {
      setErrorMessage(validationResult.message);
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // If AI verification is enabled for this campaign
      if (campaign.aiVerification) {
        // First run AI verification
        setSubmitStatus('verifying');
        const verificationResult = await simulateAiVerification(submissionData);
        setAiVerificationResult(verificationResult);
        
        // If verification fails, stop the submission process
        if (!verificationResult.passed) {
          setSubmitStatus('rejected');
          setIsSubmitting(false);
          return;
        }
      }
      
      // Continue with submission to the server
      setSubmitStatus('submitting');
      
      // Simulate API call to submit data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If successful
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An error occurred while submitting your data. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) {
      if (submitStatus === 'verifying') return 'Verifying...';
      if (submitStatus === 'submitting') return 'Submitting...';
      return 'Processing...';
    }
    return 'Submit Data';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Campaign Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{campaignData[1]}</h1>
              <p className="text-sm text-gray-500 mt-1">by {campaignData[0]}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-indigo-600">₮ {campaign.reward}</div>
              <div className="text-sm text-gray-500">reward per submission</div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-600">{campaignData[2]}</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h3>
            <p className="text-sm text-gray-600">campaign.requirements</p>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${(campaign.submissionsReceived / campaign.submissionsRequired) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{campaign.submissionsReceived} submissions received</span>
              <span>{campaign.submissionsRequired - campaign.submissionsReceived} more needed</span>
            </div>
          </div>
        </div>
        
        {/* Submission Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Your Data</h2>
          
          {submitStatus === 'success' ? (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Your data has been successfully submitted! Tokens have been added to your account.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setSubmissionData('');
                        setSubmitStatus(null);
                        setAiVerificationResult(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Submit Another Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="dataInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your text data:
                </label>
                <textarea
                  id="dataInput"
                  name="dataInput"
                  value={submissionData}
                  onChange={handleDataChange}
                  required
                  disabled={isSubmitting}
                  rows="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="Enter your text contribution here..."
                ></textarea>
                <div className="mt-1 flex justify-between">
                  <span className={`text-xs ${submissionData.length < minCharCount ? 'text-red-500' : 'text-gray-500'}`}>
                    {submissionData.length} / {minCharCount}+ characters
                  </span>
                  <span className="text-xs text-gray-500">
                    Estimated words: {submissionData.split(/\s+/).filter(Boolean).length}
                  </span>
                </div>
              </div>
              
              {aiVerificationResult && (
                <div className={`mb-4 p-4 rounded-md ${aiVerificationResult.passed ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className={`text-sm font-medium ${aiVerificationResult.passed ? 'text-green-800' : 'text-red-800'}`}>
                    AI Verification Result
                  </h3>
                  <div className="mt-2 flex items-center">
                    <div className="mr-4">
                      <span className={`text-lg font-bold ${aiVerificationResult.passed ? 'text-green-600' : 'text-red-600'}`}>
                        {aiVerificationResult.score}%
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${aiVerificationResult.passed ? 'bg-green-600' : 'bg-red-600'}`} 
                          style={{ width: `${aiVerificationResult.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className={`mt-1 text-sm ${aiVerificationResult.passed ? 'text-green-700' : 'text-red-700'}`}>
                    {aiVerificationResult.feedback}
                  </p>
                </div>
              )}
              
              {submitStatus === 'rejected' && (
                <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                  <p className="text-sm text-yellow-700">
                    Your submission did not pass our AI verification. Please review the feedback above and try again with improved data.
                  </p>
                </div>
              )}
              
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    required
                    disabled={isSubmitting}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                    I confirm this is my original content and I have the rights to submit it
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  disabled={isSubmitting}
                  className="mr-4 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submissionData.length < minCharCount}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {getSubmitButtonText()}
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Help Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Tips for High-Quality Submissions</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Ensure your text is original and authentic.</li>
            <li>Meet the minimum length requirement of {minCharCount} characters.</li>
            <li>Follow the specific requirements listed in the campaign details.</li>
            <li>For this text data campaign, focus on natural, conversational language.</li>
            <li>AI verification is enabled for this campaign - automated systems will check for quality and authenticity.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataSubmission;