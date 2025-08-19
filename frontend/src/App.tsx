import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import MyPlants from './components/MyPlants';
import PlantDetail from './components/PlantDetail';
import Reminders from './components/Reminders';
import Settings from './components/Settings';
import Help from './components/Help';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import type{ Plant, User, Reminder } from '../types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Mock data initialization
  useEffect(() => {
    const mockPlants: Plant[] = [
      {
        id: '1',
        name: 'Fiddle Leaf Fig',
        type: 'Ficus lyrata',
        image: 'https://images.unsplash.com/photo-1596364725424-7673f05f64b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudHMlMjBjYXJlfGVufDF8fHx8MTc1NDU1OTg5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        lastWatered: '2025-08-05',
        nextWatering: '2025-08-08',
        growthStage: 'Mature',
        careSchedule: {
          watering: 'Every 3 days',
          fertilizer: 'Monthly',
          sunlight: 'Bright indirect light'
        },
        growthLog: [
          {
            date: '2025-08-01',
            image: 'https://images.unsplash.com/photo-1596364725424-7673f05f64b1?w=300',
            notes: 'New growth spotted on top leaves'
          }
        ],
        fertilizerRecords: [
          {
            date: '2025-07-15',
            type: 'Liquid fertilizer',
            quantity: '10ml',
            notes: 'Monthly feeding'
          }
        ]
      },
      {
        id: '2',
        name: 'Snake Plant',
        type: 'Sansevieria',
        image: 'https://images.unsplash.com/photo-1654609678730-d241a2b2eb8d?w=300',
        lastWatered: '2025-08-01',
        nextWatering: '2025-08-08',
        growthStage: 'Mature',
        careSchedule: {
          watering: 'Every 7 days',
          fertilizer: 'Bi-monthly',
          sunlight: 'Low to bright light'
        },
        growthLog: [],
        fertilizerRecords: []
      }
    ];

    const mockReminders: Reminder[] = [
      {
        id: '1',
        plantId: '1',
        plantName: 'Fiddle Leaf Fig',
        task: 'Water',
        dueDate: '2025-08-08',
        status: 'pending'
      },
      {
        id: '2',
        plantId: '2',
        plantName: 'Snake Plant',
        task: 'Water',
        dueDate: '2025-08-08',
        status: 'pending'
      }
    ];

    setPlants(mockPlants);
    setReminders(mockReminders);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login logic
    if (email === 'admin@leaflog.com') {
      setIsAdmin(true);
      setIsAuthenticated(true);
      setCurrentUser({
        id: 'admin',
        name: 'Admin User',
        email: 'admin@leaflog.com',
        profilePicture: ''
      });
    } else {
      setIsAdmin(false);
      setIsAuthenticated(true);
      setCurrentUser({
        id: '1',
        name: 'Plant Lover',
        email: email,
        profilePicture: ''
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser(null);
  };

  const addPlant = (plant: Omit<Plant, 'id'>) => {
    const newPlant: Plant = {
      ...plant,
      id: Date.now().toString()
    };
    setPlants([...plants, newPlant]);
  };

  const updatePlant = (plantId: string, updates: Partial<Plant>) => {
    setPlants(plants.map(plant =>
      plant.id === plantId ? { ...plant, ...updates } : plant
    ));
  };

  const deletePlant = (plantId: string) => {
    setPlants(plants.filter(plant => plant.id !== plantId));
    setReminders(reminders.filter(reminder => reminder.plantId !== plantId));
  };

  const completeReminder = (reminderId: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === reminderId ? { ...reminder, status: 'completed' } : reminder
    ));
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  if (isAdmin) {
    return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar
            isAdmin={true}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          isAdmin={false}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <main className="pt-16">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  plants={plants}
                  reminders={reminders}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/plants"
              element={
                <MyPlants
                  plants={plants}
                  onAddPlant={addPlant}
                  onDeletePlant={deletePlant}
                />
              }
            />
            <Route
              path="/plants/:id"
              element={
                <PlantDetail
                  plants={plants}
                  onUpdatePlant={updatePlant}
                />
              }
            />
            <Route
              path="/reminders"
              element={
                <Reminders
                  reminders={reminders}
                  onCompleteReminder={completeReminder}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  currentUser={currentUser}
                  onUpdateUser={setCurrentUser}
                />
              }
            />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;