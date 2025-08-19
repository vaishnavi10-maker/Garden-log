import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  Sprout, 
  Bell, 
  Plus, 
  TrendingUp, 
  Droplets, 
  Calendar,
  CheckCircle
} from 'lucide-react';
import type{ Plant, User, Reminder } from '../../types';

interface DashboardProps {
  plants: Plant[];
  reminders: Reminder[];
  currentUser: User | null;
}

export default function Dashboard({ plants, reminders, currentUser }: DashboardProps) {
  const upcomingReminders = reminders.filter(r => r.status === 'pending').slice(0, 5);
  const completedToday = reminders.filter(r => 
    r.status === 'completed' && 
    new Date(r.dueDate).toDateString() === new Date().toDateString()
  ).length;

  const recentPlants = plants.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900">
              Welcome back, {currentUser?.name}! 🌱
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your plants today
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={currentUser?.profilePicture} />
              <AvatarFallback className="bg-green-100 text-green-600">
                {currentUser?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Plants</p>
                <p className="text-3xl text-green-600">{plants.length}</p>
              </div>
              <Sprout className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pending Reminders</p>
                <p className="text-3xl text-orange-600">{upcomingReminders.length}</p>
              </div>
              <Bell className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Completed Today</p>
                <p className="text-3xl text-blue-600">{completedToday}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Growth Rate</p>
                <p className="text-3xl text-purple-600">+12%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Reminders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Upcoming Reminders
              </CardTitle>
              <Link to="/reminders">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingReminders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No upcoming reminders</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingReminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {reminder.task === 'Water' ? (
                            <Droplets className="w-5 h-5 text-blue-500" />
                          ) : (
                            <Sprout className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-gray-900">{reminder.plantName}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{reminder.task}</Badge>
                            <span className="text-sm text-gray-600">
                              Due: {new Date(reminder.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Mark Done
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Plant Preview */}
        <div className="space-y-6">
          {/* Quick Add Plant */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/plants">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Plant
                </Button>
              </Link>
              <Link to="/reminders">
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Plants */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sprout className="w-5 h-5" />
                Recent Plants
              </CardTitle>
              <Link to="/plants">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentPlants.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <Sprout className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No plants yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentPlants.map((plant) => (
                    <Link
                      key={plant.id}
                      to={`/plants/${plant.id}`}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate">{plant.name}</p>
                        <p className="text-sm text-gray-600">{plant.type}</p>
                        <Badge variant="outline" className="mt-1">
                          {plant.growthStage}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}