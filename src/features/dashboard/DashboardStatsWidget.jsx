import React, { useEffect, useState } from 'react';
import { getUserReadings, getUserJournals } from '../../services/supabaseService';

/**
 * DashboardStatsWidget Component
 * 
 * Displays activity statistics and visualizations for the dashboard
 * Shows reading and journaling patterns over time
 */
const DashboardStatsWidget = () => {
  const [stats, setStats] = useState({
    isLoading: true,
    readingsByMonth: [],
    journalsByMonth: [],
    topTags: [],
    topMoods: []
  });
  
  useEffect(() => {
    const fetchActivityStats = async () => {
      try {
        // Get readings and journals with timestamps for activity charts
        const { readings, error: readingsError } = await getUserReadings(100, 0);
        if (readingsError) throw readingsError;
        
        const { journals, error: journalsError } = await getUserJournals(100, 0, {});
        if (journalsError) throw journalsError;

        // Process readings by month
        const readingsByMonth = processActivityByMonth(readings);
        
        // Process journals by month
        const journalsByMonth = processActivityByMonth(journals);
        
        // Extract top tags from journals
        const topTags = extractTopTags(journals);
        
        // Extract mood distribution from journals
        const topMoods = extractTopMoods(journals);
        
        setStats({
          isLoading: false,
          readingsByMonth,
          journalsByMonth,
          topTags,
          topMoods
        });
      } catch (error) {
        console.error('Error fetching activity stats:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };
    
    fetchActivityStats();
  }, []);
  
  // Helper function to process activity by month
  const processActivityByMonth = (items) => {
    const monthMap = {};
    const now = new Date();
    
    // Initialize the last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthMap[monthKey] = 0;
    }
    
    // Count items by month
    items.forEach(item => {
      const date = new Date(item.created_at);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (monthMap[monthKey] !== undefined) {
        monthMap[monthKey]++;
      }
    });
    
    // Convert to array format for rendering
    return Object.entries(monthMap).map(([key, count]) => {
      const [year, month] = key.split('-');
      return {
        month: new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString('en-US', { month: 'short' }),
        count
      };
    });
  };
  
  // Helper function to extract top tags from journals
  const extractTopTags = (journals) => {
    const tagCounter = {};
    
    // Count occurrences of each tag
    journals.forEach(journal => {
      if (journal.tags && Array.isArray(journal.tags)) {
        journal.tags.forEach(tag => {
          if (!tagCounter[tag.name]) {
            tagCounter[tag.name] = 0;
          }
          tagCounter[tag.name]++;
        });
      }
    });
    
    // Convert to array and sort by frequency
    return Object.entries(tagCounter)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };
  
  // Helper function to extract mood distribution
  const extractTopMoods = (journals) => {
    const moodCounter = {};
    
    // Count occurrences of each mood
    journals.forEach(journal => {
      if (journal.mood) {
        if (!moodCounter[journal.mood]) {
          moodCounter[journal.mood] = 0;
        }
        moodCounter[journal.mood]++;
      }
    });
    
    // Convert to array and sort by frequency
    return Object.entries(moodCounter)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };
  
  // Helper function to get mood emoji
  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'Happy': return '😄';
      case 'Calm': return '😌';
      case 'Anxious': return '😰';
      case 'Reflective': return '🤔';
      case 'Inspired': return '✨';
      case 'Melancholic': return '😔';
      case 'Confused': return '😕';
      case 'Grateful': return '🙏';
      default: return '';
    }
  };
  
  // Helper function to get mood styles
  const getMoodStyles = (mood) => {
    switch (mood) {
      case 'Happy': return 'bg-yellow-100 text-yellow-800';
      case 'Calm': return 'bg-blue-100 text-blue-800';
      case 'Anxious': return 'bg-orange-100 text-orange-800';
      case 'Reflective': return 'bg-purple-100 text-purple-800';
      case 'Inspired': return 'bg-pink-100 text-pink-800';
      case 'Melancholic': return 'bg-indigo-100 text-indigo-800';
      case 'Confused': return 'bg-cyan-100 text-cyan-800';
      case 'Grateful': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Loading state
  if (stats.isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Find the max value for chart scaling
  const maxReadingCount = Math.max(...stats.readingsByMonth.map(m => m.count), 1);
  const maxJournalCount = Math.max(...stats.journalsByMonth.map(m => m.count), 1);
  const maxCount = Math.max(maxReadingCount, maxJournalCount, 1);
  
  return (
    <div className="space-y-6">
      {/* Activity Chart */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Activity Over Time</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-end h-48 gap-1">
            {stats.readingsByMonth.length === 0 && stats.journalsByMonth.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500 italic">No activity data yet. Start creating readings and journals!</p>
              </div>
            ) : (
              stats.readingsByMonth.map((data, index) => (
                <div key={`month-${index}`} className="flex-1 flex flex-col items-center">
                  {/* Reading bar */}
                  <div 
                    className="w-full bg-purple-500 rounded-t-sm transition-all duration-500"
                    style={{ 
                      height: `${(data.count / maxCount) * 100}%`,
                      minHeight: data.count > 0 ? '8px' : '0'
                    }}
                  ></div>
                  
                  {/* Journal bar */}
                  <div 
                    className="w-full bg-indigo-500 rounded-t-sm mt-1 transition-all duration-500"
                    style={{ 
                      height: `${(stats.journalsByMonth[index]?.count / maxCount) * 100}%`,
                      minHeight: stats.journalsByMonth[index]?.count > 0 ? '8px' : '0'
                    }}
                  ></div>
                  
                  {/* Month label */}
                  <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                </div>
              ))
            )}
          </div>
          
          {/* Chart legend */}
          <div className="flex justify-center mt-4 gap-4">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-purple-500 rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Readings</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-indigo-500 rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Journal Entries</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Tags & Moods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Tags */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Common Themes</h4>
          {stats.topTags.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No tags used yet</p>
          ) : (
            <div className="space-y-2">
              {stats.topTags.map((tag, index) => (
                <div key={`tag-${index}`} className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${(tag.count / stats.topTags[0].count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">{tag.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Mood Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Mood Distribution</h4>
          {stats.topMoods.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No moods recorded yet</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {stats.topMoods.map((mood, index) => (
                <div 
                  key={`mood-${index}`} 
                  className={`px-3 py-1.5 rounded-full text-sm flex items-center ${getMoodStyles(mood.name)}`}
                >
                  <span className="mr-1">{getMoodEmoji(mood.name)}</span>
                  <span>{mood.name}</span>
                  <span className="ml-1 bg-white/30 px-1.5 py-0.5 rounded-full text-xs">
                    {mood.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsWidget;
