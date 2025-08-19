export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Plant {
  id: string;
  name: string;
  type: string;
  image: string;
  lastWatered: string;
  nextWatering: string;
  growthStage: string;
  careSchedule: {
    watering: string;
    fertilizer: string;
    sunlight: string;
  };
  growthLog: GrowthLogEntry[];
  fertilizerRecords: FertilizerRecord[];
}

export interface GrowthLogEntry {
  date: string;
  image?: string;
  notes: string;
}

export interface FertilizerRecord {
  date: string;
  type: string;
  quantity: string;
  notes: string;
}

export interface Reminder {
  id: string;
  plantId: string;
  plantName: string;
  task: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Feedback {
  id: string;
  userName: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'responded';
}