import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../authentication/authSlice';
import { Link } from 'react-router-dom';
import { getUserReadings, getUserJournals } from '../../services/supabaseService';
import RecentReadingsWidget from './RecentReadingsWidget';
import JournalEntriesWidget from './JournalEntriesWidget';
import DashboardStatsWidget from './DashboardStatsWidget';

const Dashboard = () => {
  const user = useSelector(selectUser);
  const [stats, setStats] = useState({
    totalReadings: 0,
    totalJournals: 0,
    recentActivity: [],
    isLoading: true
  });
  
  // Fetch stats for the dashboard
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total readings count
        const { count: readingsCount, error: readingsError } = await getUserReadings(0, 0, true);
        if (readingsError) throw readingsError;
        
        // Get total journals count
        const { count: journalsCount, error: journalsError } = await getUserJournals(0, 0, {}, true);
        if (journalsError) throw journalsError;
        
        setStats({
          totalReadings: readingsCount || 0,
          totalJournals: journalsCount || 0,
          recentActivity: [],
          isLoading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };
    
    fetchStats();
  }, []);
  
  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
          
          <div className="flex space-x-3" data-test='user-menu'>
            <Link
              to="/tarot"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              New Reading
            </Link>
            <Link
              to="/journal/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New Journal Entry
            </Link>
          </div>
        </div>
        
        {/* Welcome Card */}
        <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl leading-8 font-semibold text-white">
                Welcome back, {user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User'}
              </h2>
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                {user?.user_metadata?.avatar_url ? (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="Profile" 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-xl font-semibold">
                    {(user?.email || 'U')[0].toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 text-sm text-white/80">
              <p>Your personalized tarot journey continues. Reflect on your readings, journal your thoughts, and discover new insights.</p>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="px-6 pt-6 pb-8 bg-white/10 backdrop-blur-sm sm:p-10 sm:pt-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="col-span-1">
                <div className="text-sm text-white/80">Total Readings</div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {stats.isLoading ? (
                    <div className="h-8 w-12 bg-white/20 animate-pulse rounded"></div>
                  ) : (
                    stats.totalReadings
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div className="text-sm text-white/80">Journal Entries</div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {stats.isLoading ? (
                    <div className="h-8 w-12 bg-white/20 animate-pulse rounded"></div>
                  ) : (
                    stats.totalJournals
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div className="text-sm text-white/80">Insights Gained</div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {stats.isLoading ? (
                    <div className="h-8 w-12 bg-white/20 animate-pulse rounded"></div>
                  ) : (
                    // Simple calculation: each reading + journal gives ~2 insights
                    Math.floor((stats.totalReadings + stats.totalJournals) * 2)
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div className="text-sm text-white/80">Days Active</div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {stats.isLoading ? (
                    <div className="h-8 w-12 bg-white/20 animate-pulse rounded"></div>
                  ) : (
                    // Simple calculation: active since account creation
                    Math.ceil((new Date() - new Date(user?.created_at || Date.now())) / (1000 * 60 * 60 * 24))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Activity Stats */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Activity Overview</h3>
              <p className="mt-1 text-sm text-gray-500">Your tarot and journaling activity at a glance</p>
            </div>
            <div className="p-6">
              <DashboardStatsWidget />
            </div>
          </div>
          
          {/* Daily Card & Quick Actions */}
          <div className="grid grid-cols-1 gap-8">
            {/* Daily Card */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Card of the Day</h3>
                <p className="mt-1 text-sm text-gray-500">Meditate on today's energy</p>
              </div>
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="h-64 w-40 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-md relative overflow-hidden">
                  <p className="text-white text-center px-4 absolute inset-0 flex items-center justify-center">
                    Your daily card will appear here soon
                  </p>
                </div>
                <button className="mt-4 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-500">
                  Refresh Card
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Links</h3>
                <p className="mt-1 text-sm text-gray-500">Common actions and resources</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/tarot/history" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.523 4.5-1.253m4.5 0C18.168 18.477 19.754 19 21.5 19c1.746 0 3.332-.523 4.5-1.253V6.253C24.168 5.477 22.582 5 20.836 5c-1.746 0-3.332.523-4.5 1.253" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Reading History</span>
                  </Link>
                  <Link to="/journal" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Journal Archive</span>
                  </Link>
                  <Link to="/settings" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Settings</span>
                  </Link>
                  <Link to="/help" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Help & Resources</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Readings */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Readings</h3>
                <p className="mt-1 text-sm text-gray-500">Your latest tarot insights</p>
              </div>
              <Link to="/tarot/history" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                View All
              </Link>
            </div>
            <div className="p-6">
              <RecentReadingsWidget />
            </div>
          </div>
          
          {/* Journal Entries */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Journal Entries</h3>
                <p className="mt-1 text-sm text-gray-500">Your recent reflections and thoughts</p>
              </div>
              <Link to="/journal" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View All
              </Link>
            </div>
            <div className="p-6">
              <JournalEntriesWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
