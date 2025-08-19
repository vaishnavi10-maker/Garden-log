import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/ui/card';
import { Button } from '../../src/ui/button';
import { 
  Download, 
  TrendingUp, 
  Users,
  Sprout,
  Calendar
} from 'lucide-react';

interface ReportsTabProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalPlants: number;
    newUsersThisMonth: number;
    feedbackCount: number;
    completionRate: number;
  };
}

export default function ReportsTab({ stats }: ReportsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>This Month</span>
                <span className="text-2xl text-green-600">+{stats.newUsersThisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Active</span>
                <span className="text-2xl text-blue-600">{stats.activeUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Growth Rate</span>
                <span className="text-2xl text-purple-600">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plant Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Plants</span>
                <span className="text-2xl text-green-600">{stats.totalPlants}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Avg per User</span>
                <span className="text-2xl text-blue-600">
                  {Math.round(stats.totalPlants / stats.totalUsers)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Success Rate</span>
                <span className="text-2xl text-purple-600">{stats.completionRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Daily Active Users</span>
                <span className="text-2xl text-green-600">
                  {Math.round(stats.activeUsers * 0.6)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Weekly Retention</span>
                <span className="text-2xl text-blue-600">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Monthly Retention</span>
                <span className="text-2xl text-purple-600">65%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              User Activity Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Plant Growth Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Engagement Metrics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Monthly Summary
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl">{stats.totalUsers}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="text-center">
              <Sprout className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl">{stats.totalPlants}</p>
              <p className="text-sm text-gray-600">Plants Tracked</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl">{stats.completionRate}%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl">24</p>
              <p className="text-sm text-gray-600">Days Avg Usage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}