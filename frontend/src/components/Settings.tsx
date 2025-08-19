import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { 
  User as UserIcon, 
  Bell, 
  Lock, 
  Trash2, 
  Camera,
  Save,
  Mail,
  Smartphone,
  AlertTriangle
} from 'lucide-react';
import type{ User } from '../../types';
import { toast } from 'sonner';

interface SettingsProps {
  currentUser: User | null;
  onUpdateUser: (user: User) => void;
}

export default function Settings({ currentUser, onUpdateUser }: SettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    profilePicture: currentUser?.profilePicture || ''
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    emailReminders: true,
    pushNotifications: true,
    smsReminders: false,
    weeklyDigest: true,
    careInsights: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      onUpdateUser({
        ...currentUser,
        name: formData.name,
        email: formData.email,
        profilePicture: formData.profilePicture
      });
      setIsEditing(false);
      toast('Profile updated successfully!');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast('New passwords do not match');
      return;
    }
    // Mock password change
    toast('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast('Account deletion requested. Please check your email for confirmation.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.profilePicture} />
                  <AvatarFallback className="bg-green-100 text-green-600 text-xl">
                    {formData.name.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div>
                    <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <Label>Email Reminders</Label>
                </div>
                <p className="text-sm text-gray-500">
                  Receive watering and care reminders via email
                </p>
              </div>
              <Switch
                checked={notificationPrefs.emailReminders}
                onCheckedChange={(checked) =>
                  setNotificationPrefs({ ...notificationPrefs, emailReminders: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <Label>Push Notifications</Label>
                </div>
                <p className="text-sm text-gray-500">
                  Get instant notifications on your device
                </p>
              </div>
              <Switch
                checked={notificationPrefs.pushNotifications}
                onCheckedChange={(checked) =>
                  setNotificationPrefs({ ...notificationPrefs, pushNotifications: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-500" />
                  <Label>SMS Reminders</Label>
                </div>
                <p className="text-sm text-gray-500">
                  Receive important reminders via text message
                </p>
              </div>
              <Switch
                checked={notificationPrefs.smsReminders}
                onCheckedChange={(checked) =>
                  setNotificationPrefs({ ...notificationPrefs, smsReminders: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Digest</Label>
                <p className="text-sm text-gray-500">
                  Get a summary of your plant care activities
                </p>
              </div>
              <Switch
                checked={notificationPrefs.weeklyDigest}
                onCheckedChange={(checked) =>
                  setNotificationPrefs({ ...notificationPrefs, weeklyDigest: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Care Insights</Label>
                <p className="text-sm text-gray-500">
                  Receive tips and insights about plant care
                </p>
              </div>
              <Switch
                checked={notificationPrefs.careInsights}
                onCheckedChange={(checked) =>
                  setNotificationPrefs({ ...notificationPrefs, careInsights: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Update Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="text-lg text-red-900 mb-2">Delete Account</h4>
              <p className="text-red-700 mb-4">
                Once you delete your account, there is no going back. Please be certain.
                All your plants, growth logs, and reminders will be permanently deleted.
              </p>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}