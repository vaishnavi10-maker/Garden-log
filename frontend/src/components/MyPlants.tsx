import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  Droplets, 
  Sun, 
  Calendar,
  MoreVertical,
  Trash2,
  Edit
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { Plant } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MyPlantsProps {
  plants: Plant[];
  onAddPlant: (plant: Omit<Plant, 'id'>) => void;
  onDeletePlant: (plantId: string) => void;
}

export default function MyPlants({ plants, onAddPlant, onDeletePlant }: MyPlantsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: '',
    type: '',
    image: '',
    lastWatered: '',
    nextWatering: '',
    growthStage: 'Seedling',
    careSchedule: {
      watering: 'Every 3 days',
      fertilizer: 'Monthly',
      sunlight: 'Bright indirect light'
    },
    growthLog: [],
    fertilizerRecords: []
  });

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlant.name && newPlant.type) {
      onAddPlant({
        ...newPlant,
        image: newPlant.image || 'https://images.unsplash.com/photo-1596364725424-7673f05f64b1?w=300'
      });
      setNewPlant({
        name: '',
        type: '',
        image: '',
        lastWatered: '',
        nextWatering: '',
        growthStage: 'Seedling',
        careSchedule: {
          watering: 'Every 3 days',
          fertilizer: 'Monthly',
          sunlight: 'Bright indirect light'
        },
        growthLog: [],
        fertilizerRecords: []
      });
      setIsAddDialogOpen(false);
    }
  };

  const getDaysUntilWatering = (nextWatering: string) => {
    const today = new Date();
    const wateringDate = new Date(nextWatering);
    const diffTime = wateringDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getWateringStatus = (daysUntil: number) => {
    if (daysUntil < 0) return { text: 'Overdue', variant: 'destructive' as const };
    if (daysUntil === 0) return { text: 'Today', variant: 'default' as const };
    if (daysUntil <= 2) return { text: `${daysUntil} days`, variant: 'secondary' as const };
    return { text: `${daysUntil} days`, variant: 'outline' as const };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl text-gray-900">My Plants</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your {plants.length} plants
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Plant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Plant</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPlant} className="space-y-4">
              <div>
                <Label htmlFor="plantName">Plant Name</Label>
                <Input
                  id="plantName"
                  placeholder="e.g., Fiddle Leaf Fig"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="plantType">Plant Type/Species</Label>
                <Input
                  id="plantType"
                  placeholder="e.g., Ficus lyrata"
                  value={newPlant.type}
                  onChange={(e) => setNewPlant({ ...newPlant, type: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="lastWatered">Last Watered</Label>
                <Input
                  id="lastWatered"
                  type="date"
                  value={newPlant.lastWatered}
                  onChange={(e) => setNewPlant({ ...newPlant, lastWatered: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="nextWatering">Next Watering</Label>
                <Input
                  id="nextWatering"
                  type="date"
                  value={newPlant.nextWatering}
                  onChange={(e) => setNewPlant({ ...newPlant, nextWatering: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Add Plant
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Plants Grid */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-12">
          {plants.length === 0 ? (
            <div>
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">No plants yet</h3>
              <p className="text-gray-600 mb-6">Start your plant collection by adding your first plant</p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Plant
              </Button>
            </div>
          ) : (
            <div>
              <h3 className="text-xl text-gray-900 mb-2">No plants match your search</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => {
            const daysUntilWatering = getDaysUntilWatering(plant.nextWatering);
            const wateringStatus = getWateringStatus(daysUntilWatering);
            
            return (
              <Card key={plant.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => onDeletePlant(plant.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <Link to={`/plants/${plant.id}`} className="block">
                    <h3 className="text-lg text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                      {plant.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{plant.type}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span>Next watering:</span>
                        </div>
                        <Badge variant={wateringStatus.variant}>
                          {wateringStatus.text}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Sun className="w-4 h-4 text-yellow-500" />
                          <span>Growth:</span>
                        </div>
                        <Badge variant="outline">
                          {plant.growthStage}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Last watered:</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {plant.lastWatered ? new Date(plant.lastWatered).toLocaleDateString() : 'Never'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}