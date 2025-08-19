import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Bell, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Droplets, 
  Beaker,
  AlertCircle,
  Calendar
} from 'lucide-react';
import type { Reminder } from '../../types';

interface RemindersProps {
  reminders: Reminder[];
  onCompleteReminder: (reminderId: string) => void;
}

export default function Reminders({ reminders, onCompleteReminder }: RemindersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = reminder.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || reminder.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingReminders = filteredReminders.filter(r => r.status === 'pending');
  const completedReminders = filteredReminders.filter(r => r.status === 'completed');

  const getTaskIcon = (task: string) => {
    switch (task.toLowerCase()) {
      case 'water':
        return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'fertilize':
        return <Beaker className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (dueDate: string, status: string) => {
    if (status === 'completed') {
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    }

    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else if (diffDays === 0) {
      return <Badge className="bg-orange-100 text-orange-800">Due Today</Badge>;
    } else if (diffDays <= 2) {
      return <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>;
    } else {
      return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  const getPriorityIcon = (dueDate: string, status: string) => {
    if (status === 'completed') return null;

    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    } else if (diffDays === 0) {
      return <Clock className="w-4 h-4 text-orange-500" />;
    }
    return null;
  };

  const sortedPendingReminders = pendingReminders.sort((a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    return aDate.getTime() - bDate.getTime();
  });

  const sortedCompletedReminders = completedReminders.sort((a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Reminders & Notifications</h1>
        <p className="text-gray-600">
          Stay on top of your plant care schedule
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pending Tasks</p>
                <p className="text-3xl text-orange-600">{pendingReminders.length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Completed Today</p>
                <p className="text-3xl text-green-600">
                  {completedReminders.filter(r => 
                    new Date(r.dueDate).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Overdue</p>
                <p className="text-3xl text-red-600">
                  {pendingReminders.filter(r => 
                    new Date(r.dueDate) < new Date()
                  ).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search reminders..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('pending')}
            size="sm"
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('completed')}
            size="sm"
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-6">
        {/* Pending Reminders */}
        {(filterStatus === 'all' || filterStatus === 'pending') && sortedPendingReminders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending Tasks ({sortedPendingReminders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedPendingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(reminder.dueDate, reminder.status)}
                        {getTaskIcon(reminder.task)}
                      </div>
                      <div>
                        <p className="text-gray-900">{reminder.plantName}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <Badge variant="secondary">{reminder.task}</Badge>
                          {getStatusBadge(reminder.dueDate, reminder.status)}
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(reminder.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => onCompleteReminder(reminder.id)}
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Done
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completed Reminders */}
        {(filterStatus === 'all' || filterStatus === 'completed') && sortedCompletedReminders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Completed Tasks ({sortedCompletedReminders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedCompletedReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getTaskIcon(reminder.task)}
                      </div>
                      <div>
                        <p className="text-gray-900">{reminder.plantName}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <Badge variant="secondary">{reminder.task}</Badge>
                          {getStatusBadge(reminder.dueDate, reminder.status)}
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(reminder.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredReminders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl text-gray-900 mb-2">No reminders found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Your reminders will appear here'}
              </p>
              {!searchTerm && (
                <p className="text-sm text-gray-500">
                  Add plants to start receiving care reminders
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}