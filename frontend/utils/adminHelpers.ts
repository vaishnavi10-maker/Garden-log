import type{ AdminUser, Feedback } from '../types';

export const calculateStats = (users: AdminUser[], feedback: Feedback[]) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalPlants = 156; // Mock value
  
  // Calculate new users this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newUsersThisMonth = users.filter(user => {
    const joinDate = new Date(user.joinDate);
    return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
  }).length;
  
  const feedbackCount = feedback.filter(f => f.status === 'new').length;
  const completionRate = 85; // Mock value

  return {
    totalUsers,
    activeUsers,
    totalPlants,
    newUsersThisMonth,
    feedbackCount,
    completionRate
  };
};

export const filterUsers = (users: AdminUser[], searchTerm: string) => {
  return users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterFeedback = (feedback: Feedback[], searchTerm: string) => {
  return feedback.filter(f =>
    f.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
};