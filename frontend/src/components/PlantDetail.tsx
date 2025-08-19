import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  ArrowLeft, 
  Droplets, 
  Sun, 
  Calendar,
  Plus,
  Camera,
  Beaker,
  Bell,
  Edit,
  CheckCircle
} from 'lucide-react';
import type{ Plant, GrowthLogEntry, FertilizerRecord } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PlantDetailProps {
  plants: Plant[];
  onUpdatePlant: (plantId: string, updates: Partial<Plant>) => void;
}

export default function PlantDetail({ plants, onUpdatePlant }: PlantDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = plants.find(p => p.id === id);

  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingGrowthLog, setIsAddingGrowthLog] = useState(false);
  const [isAddingFertilizer, setIsAddingFertilizer] = useState(false);

  const [newGrowthLog, setNewGrowthLog] = useState({
    date: new Date().toISOString().split('T')[0],
    image: '',
    notes: ''
  });

  const [newFertilizerRecord, setNewFertilizerRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    quantity: '',
    notes: ''
  });

  if (!plant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Plant not found</h1>
          <Link to="/plants">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plants
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddGrowthLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGrowthLog.notes) {
      const updatedPlant = {
        ...plant,
        growthLog: [...plant.growthLog, newGrowthLog]
      };
      onUpdatePlant(plant.id, updatedPlant);
      setNewGrowthLog({
        date: new Date().toISOString().split('T')[0],
        image: '',
        notes: ''
      });
      setIsAddingGrowthLog(false);
    }
  };

  const handleAddFertilizer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFertilizerRecord.type && newFertilizerRecord.quantity) {
      const updatedPlant = {
        ...plant,
        fertilizerRecords: [...plant.fertilizerRecords, newFertilizerRecord]
      };
      onUpdatePlant(plant.id, updatedPlant);
      setNewFertilizerRecord({
        date: new Date().toISOString().split('T')[0],
        type: '',
        quantity: '',
        notes: ''
      });
      setIsAddingFertilizer(false);
    }
  };

  const handleWaterPlant = () => {
    const today = new Date().toISOString().split('T')[0];
    const nextWatering = new Date();
    nextWatering.setDate(nextWatering.getDate() + 3);
    
    onUpdatePlant(plant.id, {
      lastWatered: today,
      nextWatering: nextWatering.toISOString().split('T')[0]
    });
  };

  const getDaysUntilWatering = () => {
    const today = new Date();
    const wateringDate = new Date(plant.nextWatering);
    const diffTime = wateringDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysUntilWatering = getDaysUntilWatering();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link to="/plants">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Plants
            </Button>
          </Link>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Plant
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <ImageWithFallback
              src={plant.image}
              alt={plant.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <div className="lg:w-2/3">
            <h1 className="text-4xl text-gray-900 mb-2">{plant.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{plant.type}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Next Watering</p>
                  <p className="text-lg">
                    {daysUntilWatering === 0 ? 'Today' : 
                     daysUntilWatering < 0 ? 'Overdue' : 
                     `${daysUntilWatering} days`}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Growth Stage</p>
                  <Badge className="mt-1">{plant.growthStage}</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Last Watered</p>
                  <p className="text-lg">
                    {plant.lastWatered ? new Date(plant.lastWatered).toLocaleDateString() : 'Never'}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleWaterPlant}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Droplets className="w-4 h-4" />
                Water Now
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Set Reminder
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="growth">Growth Log</TabsTrigger>
          <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Care Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span>Watering</span>
                  </div>
                  <span className="text-gray-600">{plant.careSchedule.watering}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-purple-500" />
                    <span>Fertilizing</span>
                  </div>
                  <span className="text-gray-600">{plant.careSchedule.fertilizer}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span>Sunlight</span>
                  </div>
                  <span className="text-gray-600">{plant.careSchedule.sunlight}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plant.lastWatered && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Watered on {new Date(plant.lastWatered).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {plant.fertilizerRecords.length > 0 && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Last fertilized on {new Date(plant.fertilizerRecords[plant.fertilizerRecords.length - 1].date).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {plant.growthLog.length > 0 && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Growth log updated on {new Date(plant.growthLog[plant.growthLog.length - 1].date).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {plant.lastWatered === '' && plant.fertilizerRecords.length === 0 && plant.growthLog.length === 0 && (
                    <p className="text-gray-500 text-sm">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Growth Log
              </CardTitle>
              <Dialog open={isAddingGrowthLog} onOpenChange={setIsAddingGrowthLog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Entry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Growth Log Entry</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddGrowthLog} className="space-y-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newGrowthLog.date}
                        onChange={(e) => setNewGrowthLog({ ...newGrowthLog, date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Describe the growth progress..."
                        value={newGrowthLog.notes}
                        onChange={(e) => setNewGrowthLog({ ...newGrowthLog, notes: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddingGrowthLog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Entry</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {plant.growthLog.length === 0 ? (
                <div className="text-center py-8">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-4">No growth log entries yet</p>
                  <Button 
                    onClick={() => setIsAddingGrowthLog(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Entry
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {plant.growthLog.map((entry, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg">{new Date(entry.date).toLocaleDateString()}</h4>
                        <Badge variant="outline">Day {index + 1}</Badge>
                      </div>
                      {entry.image && (
                        <img
                          src={entry.image}
                          alt={`Growth on ${entry.date}`}
                          className="w-32 h-32 object-cover rounded-lg mb-2"
                        />
                      )}
                      <p className="text-gray-600">{entry.notes}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fertilizer" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Fertilizer Records
              </CardTitle>
              <Dialog open={isAddingFertilizer} onOpenChange={setIsAddingFertilizer}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Record
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Fertilizer Record</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddFertilizer} className="space-y-4">
                    <div>
                      <Label htmlFor="fertDate">Date</Label>
                      <Input
                        id="fertDate"
                        type="date"
                        value={newFertilizerRecord.date}
                        onChange={(e) => setNewFertilizerRecord({ ...newFertilizerRecord, date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fertType">Fertilizer Type</Label>
                      <Input
                        id="fertType"
                        placeholder="e.g., Liquid fertilizer, Organic compost"
                        value={newFertilizerRecord.type}
                        onChange={(e) => setNewFertilizerRecord({ ...newFertilizerRecord, type: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        placeholder="e.g., 10ml, 1 cup"
                        value={newFertilizerRecord.quantity}
                        onChange={(e) => setNewFertilizerRecord({ ...newFertilizerRecord, quantity: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fertNotes">Notes (Optional)</Label>
                      <Textarea
                        id="fertNotes"
                        placeholder="Additional notes..."
                        value={newFertilizerRecord.notes}
                        onChange={(e) => setNewFertilizerRecord({ ...newFertilizerRecord, notes: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddingFertilizer(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Record</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {plant.fertilizerRecords.length === 0 ? (
                <div className="text-center py-8">
                  <Beaker className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-4">No fertilizer records yet</p>
                  <Button 
                    onClick={() => setIsAddingFertilizer(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Record
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Quantity</th>
                        <th className="text-left py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plant.fertilizerRecords.map((record, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{new Date(record.date).toLocaleDateString()}</td>
                          <td className="py-3">{record.type}</td>
                          <td className="py-3">{record.quantity}</td>
                          <td className="py-3 text-gray-600">{record.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <div>
                      <p>Water {plant.name}</p>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(plant.nextWatering).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" onClick={handleWaterPlant} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Mark Done
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Beaker className="w-5 h-5 text-purple-500" />
                    <div>
                      <p>Fertilize {plant.name}</p>
                      <p className="text-sm text-gray-600">
                        Due: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Mark Done
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}