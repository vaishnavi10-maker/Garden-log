import type{ AdminUser, Feedback } from '../types';

export const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    joinDate: '2025-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    joinDate: '2025-02-10'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'inactive',
    joinDate: '2024-12-20'
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    status: 'active',
    joinDate: '2025-03-05'
  },
  {
    id: '5',
    name: 'Mike Davis',
    email: 'mike@example.com',
    status: 'active',
    joinDate: '2025-02-28'
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    userName: 'Plant Lover',
    email: 'plantlover@example.com',
    message: 'Love the app! Could you add a feature to track fertilizer schedules?',
    date: '2025-08-06',
    status: 'new'
  },
  {
    id: '2',
    userName: 'Green Thumb',
    email: 'greenthumb@example.com',
    message: 'The growth tracking feature is amazing. Thank you!',
    date: '2025-08-05',
    status: 'responded'
  },
  {
    id: '3',
    userName: 'Garden Enthusiast',
    email: 'garden@example.com',
    message: 'Would love to see plant identification features in the future.',
    date: '2025-08-04',
    status: 'new'
  },
  {
    id: '4',
    userName: 'Nature Lover',
    email: 'nature@example.com',
    message: 'Great app! The reminder system is very helpful.',
    date: '2025-08-03',
    status: 'responded'
  }
];