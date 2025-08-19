import React, { useState } from 'react';
import { Button } from '../ui/button';
import { 
  BarChart3,
  Users, 
  MessageSquare
} from 'lucide-react';
import { mockUsers, mockFeedback } from '../constants/mockData';
import { calculateStats, filterUsers, filterFeedback } from '../../utils/adminHelpers';
import OverviewTab from '../admin/OverviewTab';
import UsersTab from '../admin/UsersTab';
import FeedbackTab from '../admin/FeedbackTab';
import ReportsTab from '../admin/ReportsTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'feedback' | 'reports'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = calculateStats(mockUsers, mockFeedback);
  const filteredUsers = filterUsers(mockUsers, searchTerm);
  const filteredFeedback = filterFeedback(mockFeedback, searchTerm);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Monitor and manage the Leaf Log platform
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'overview' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          Overview
        </Button>
        <Button
          variant={activeTab === 'users' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('users')}
          className="flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Users
        </Button>
        <Button
          variant={activeTab === 'feedback' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('feedback')}
          className="flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Feedback
        </Button>
        <Button
          variant={activeTab === 'reports' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('reports')}
          className="flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          Reports
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab stats={stats} />}
      
      {activeTab === 'users' && (
        <UsersTab 
          users={filteredUsers}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      )}
      
      {activeTab === 'feedback' && (
        <FeedbackTab 
          feedback={filteredFeedback}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      )}
      
      {activeTab === 'reports' && <ReportsTab stats={stats} />}
    </div>
  );
}