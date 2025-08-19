
import { Card, CardContent } from '../../src/ui/card';
import { Button } from '../../src/ui/button';
import { Input } from '../../src/ui/input';
import { Badge } from '../../src/ui/badge';
import { Search, Mail } from 'lucide-react';
import type { Feedback } from "../../types";



interface FeedbackTabProps {
  feedback: Feedback[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function FeedbackTab({ feedback, searchTerm, onSearchChange }: FeedbackTabProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search feedback..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedback.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg text-gray-900">{item.userName}</h4>
                  <p className="text-sm text-gray-600">{item.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={item.status === 'new' ? 'default' : 'secondary'}
                  >
                    {item.status}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{item.message}</p>
              <div className="flex space-x-2">
                <Button size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <Button size="sm" variant="outline">
                  Mark as Read
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}