import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  Search,
  Sprout,
  Droplets,
  Sun,
  Bug,
  Calendar,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast('Your message has been sent! We\'ll get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const faqData = [
    {
      category: 'Getting Started',
      icon: <Sprout className="w-5 h-5 text-green-500" />,
      questions: [
        {
          question: 'How do I add my first plant?',
          answer: 'Go to the "My Plants" page and click the "Add Plant" button. Fill in your plant\'s name, type, and care information. You can also add a photo and set up watering schedules.'
        },
        {
          question: 'What information should I track for each plant?',
          answer: 'We recommend tracking watering dates, fertilizer applications, growth progress with photos, and any care notes. This helps you understand your plant\'s needs and growth patterns over time.'
        },
        {
          question: 'Can I import plants from other apps?',
          answer: 'Currently, manual entry is required, but we\'re working on import features. You can quickly add multiple plants using our bulk add feature coming soon.'
        }
      ]
    },
    {
      category: 'Care & Reminders',
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      questions: [
        {
          question: 'How do watering reminders work?',
          answer: 'Based on your plant\'s watering schedule, we\'ll send you reminders via email or push notifications. You can mark tasks as complete directly from the reminder or your dashboard.'
        },
        {
          question: 'Can I customize reminder schedules?',
          answer: 'Yes! Each plant can have its own watering, fertilizing, and care schedule. Go to your plant\'s detail page and update the care schedule section.'
        },
        {
          question: 'What if I miss a watering reminder?',
          answer: 'Don\'t worry! The app will show overdue reminders in red. Your plants are resilient, and you can adjust the next watering date based on your plant\'s current condition.'
        }
      ]
    },
    {
      category: 'Growth Tracking',
      icon: <Sun className="w-5 h-5 text-yellow-500" />,
      questions: [
        {
          question: 'How do I log my plant\'s growth?',
          answer: 'Visit your plant\'s detail page and go to the Growth Log tab. Add photos and notes about new leaves, height changes, or other growth observations.'
        },
        {
          question: 'Can I track multiple plants growing together?',
          answer: 'Each plant should have its own entry for the most accurate tracking. However, you can mention companion plants in your care notes.'
        },
        {
          question: 'What makes a good growth log entry?',
          answer: 'Include clear photos, measurements if possible, and notes about new growth, color changes, or any concerns. Consistent monthly photos show amazing progress over time!'
        }
      ]
    },
    {
      category: 'Troubleshooting',
      icon: <Bug className="w-5 h-5 text-red-500" />,
      questions: [
        {
          question: 'My plant notifications aren\'t working',
          answer: 'Check your notification settings in the Settings page. Ensure you\'ve enabled email or push notifications and that your browser/device allows notifications from our app.'
        },
        {
          question: 'I accidentally deleted a plant',
          answer: 'Unfortunately, deleted plants cannot be recovered. We recommend exporting your growth logs regularly. A data backup feature is coming in our next update.'
        },
        {
          question: 'The app is running slowly',
          answer: 'Try refreshing your browser or clearing your cache. If you have many high-resolution plant photos, consider resizing them before uploading for better performance.'
        }
      ]
    },
    {
      category: 'Account & Settings',
      icon: <Settings className="w-5 h-5 text-purple-500" />,
      questions: [
        {
          question: 'How do I change my notification preferences?',
          answer: 'Go to Settings > Notification Preferences. You can toggle email reminders, push notifications, SMS, and weekly digest options to suit your preferences.'
        },
        {
          question: 'Can I export my plant data?',
          answer: 'Data export functionality is coming soon. For now, you can screenshot your growth logs and manually save important care notes.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'In Settings, scroll to the Danger Zone section. Please note that account deletion is permanent and will remove all your plant data, photos, and care history.'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => searchTerm === '' || 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">
          Find answers to common questions or get in touch with our team
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <HelpCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg text-gray-900 mb-2">Browse FAQ</h3>
            <p className="text-gray-600 text-sm">
              Find quick answers to common questions
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Mail className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm">
              Get personalized help from our team
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <MessageCircle className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="text-lg text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm">
              Chat with us in real-time (coming soon)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search FAQ..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No FAQ items match your search</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFAQ.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-2 mb-4">
                    {category.icon}
                    <h3 className="text-lg text-gray-900">{category.category}</h3>
                  </div>
                  <Accordion type="single" collapsible>
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Support
          </CardTitle>
          <p className="text-gray-600">
            Can't find what you're looking for? Send us a message and we'll help you out!
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What can we help you with?"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue or question in detail..."
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Pro tip:</strong> Include screenshots or details about your plants 
                for faster support. We typically respond within 24 hours!
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Send Message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className="mt-8 text-center">
        <h3 className="text-lg text-gray-900 mb-4">Additional Resources</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" size="sm">
            📖 Plant Care Guide
          </Button>
          <Button variant="outline" size="sm">
            🎥 Video Tutorials
          </Button>
          <Button variant="outline" size="sm">
            🌱 Community Forum
          </Button>
          <Button variant="outline" size="sm">
            📱 Mobile App
          </Button>
        </div>
      </div>
    </div>
  );
}