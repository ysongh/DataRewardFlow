import React, { useContext, useState } from 'react';

import { ETHContext } from '../ETHContext';
import { formatAddress } from '../utils/format';

const Navbar = () => {
  const { walletAddress, connectWallet } = useContext(ETHContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Mock notification data
  const notifications = [
    { id: 1, message: "Your data submission was verified and rewarded with 5.0 tokens", isRead: false },
    { id: 2, message: "New campaign launched: 'Conversational AI Training Data'", isRead: false },
    { id: 3, message: "Your campaign 'User Interface Interactions' reached 50% completion", isRead: true }
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  return (
    <nav className="bg-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Nav Items */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-10 flex items-center justify-center bg-white text-indigo-700 font-bold rounded-md">
                DRF
              </div>
            </div>
            <div className="ml-4 text-lg font-semibold text-white">Data Reward Flow</div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-white hover:bg-indigo-600 px-3 py-2 rounded-md font-medium">Campaigns</a>
                <a href="#" className="text-indigo-200 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md font-medium">Create</a>
                <a href="#" className="text-indigo-200 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md font-medium">My Data</a>
                <a href="#" className="text-indigo-200 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md font-medium">Analytics</a>
              </div>
            </div>
          </div>

          {/* Token Balance */}
          {/* <div className="hidden md:flex items-center bg-indigo-800 px-3 py-1 rounded-md">
            <span className="text-indigo-200 text-sm mr-1">Balance:</span>
            <span className="text-white font-medium">₮ 245.50</span>
          </div> */}
          
          {/* Right side - Notification and Profile */}
          <div className="flex items-center">
            {/* Notification Bell */}
            <div className="relative ml-3">
              <button
                onClick={toggleNotifications}
                className="p-1 rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-indigo-700"></span>
                )}
              </button>
              
              {/* Notification dropdown */}
              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    {notifications.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`px-4 py-3 hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                          >
                            <p className="text-sm text-gray-700">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">No new notifications</div>
                    )}
                    <div className="border-t border-gray-200">
                      <a href="#" className="block px-4 py-2 text-sm text-indigo-600 hover:bg-gray-50">View all notifications</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative ml-3">
              <div>
                <button 
                  onClick={toggleProfileMenu}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                    US
                  </div>
                </button>
              </div>
              
              {/* Profile dropdown items */}
              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Token Wallet</a>
                    <div className="border-t border-gray-200"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign out</a>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={connectWallet}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors duration-200 ml-4 text-white"
            >
              {walletAddress ? formatAddress(walletAddress) : 'Connect Wallet'}
            </button>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="bg-indigo-800 text-white block px-3 py-2 rounded-md text-base font-medium">Campaigns</a>
            <a href="#" className="text-indigo-200 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Create</a>
            <a href="#" className="text-indigo-200 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My Data</a>
            <a href="#" className="text-indigo-200 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Analytics</a>
          </div>
          <div className="pt-4 pb-3 border-t border-indigo-800">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                  US
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">User Smith</div>
                <div className="text-sm font-medium text-indigo-200">user@example.com</div>
              </div>
              <div className="ml-auto bg-indigo-800 px-3 py-1 rounded-md">
                <span className="text-indigo-200 text-sm mr-1">Balance:</span>
                <span className="text-white font-medium">₮ 245.50</span>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-600">Your Profile</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-600">Settings</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-600">Token Wallet</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white hover:bg-indigo-600">Sign out</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
