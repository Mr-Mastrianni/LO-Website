import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Calendar,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    type: 'workshop',
    featured: false
  });

  // Mock data for now - replace with actual database calls
  useEffect(() => {
    // Simulate loading events
    setLoading(true);
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          title: 'BrainStorm Cancer Support Group',
          description: 'Monthly support group meeting for patients and families.',
          date: '2024-02-15',
          time: '18:00',
          location: 'Community Center, Room 101',
          capacity: 25,
          type: 'support-group',
          featured: true,
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          title: 'Understanding Treatment Options',
          description: 'Educational workshop about different treatment approaches.',
          date: '2024-02-22',
          time: '14:00',
          location: 'Medical Center Auditorium',
          capacity: 50,
          type: 'workshop',
          featured: false,
          created_at: '2024-01-20T15:30:00Z'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        // Update existing event
        setEvents(events.map(event => 
          event.id === editingEvent.id ? { ...event, ...formData } : event
        ));

        toast({
          title: "Success",
          description: "Event updated successfully.",
        });
      } else {
        // Create new event
        const newEvent = {
          id: Date.now(), // Temporary ID
          ...formData,
          created_at: new Date().toISOString()
        };

        setEvents([newEvent, ...events]);

        toast({
          title: "Success",
          description: "Event created successfully.",
        });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save event.",
      });
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: event.capacity,
      type: event.type,
      featured: event.featured
    });
    setFormDialogOpen(true);
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Success",
      description: "Event deleted successfully.",
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      type: 'workshop',
      featured: false
    });
    setEditingEvent(null);
    setFormDialogOpen(false);
  };

  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEventTypeBadge = (type) => {
    const types = {
      'workshop': { label: 'Workshop', variant: 'default' },
      'support-group': { label: 'Support Group', variant: 'secondary' },
      'webinar': { label: 'Webinar', variant: 'outline' },
      'conference': { label: 'Conference', variant: 'destructive' }
    };
    const typeInfo = types[type] || types.workshop;
    return <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Events</h3>
          <p className="text-sm text-gray-600">Manage BrainStorm Cancer events and workshops</p>
        </div>
        <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </DialogTitle>
              <DialogDescription>
                {editingEvent ? 'Update the event details below.' : 'Create a new event for the community.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Event Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Event title"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Event description..."
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Event location"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Capacity</label>
                  <Input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    placeholder="Max attendees"
                    min="1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Event Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="support-group">Support Group</option>
                    <option value="webinar">Webinar</option>
                    <option value="conference">Conference</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Event</label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? 'Update' : 'Create'} Event
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{event.description}</p>
              </div>
              <div className="flex space-x-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(event)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(event.date)} at {event.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
              {event.capacity && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  Max {event.capacity} attendees
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {getEventTypeBadge(event.type)}
                {event.featured && (
                  <Badge variant="outline">Featured</Badge>
                )}
              </div>
              <span className="text-xs text-gray-500">
                Created {formatDate(event.created_at)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p className="text-sm">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first event.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsManager;
