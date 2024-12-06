import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useTaskStore from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore';

const TaskPage = () => {

  const { authUser} = useAuthStore();
  
  const navigate = useNavigate();

  const { createTask } = useTaskStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'STEM & Technology',
    level: 'Senior',
    deadline: '',
    organization: '',
    userCreated: authUser.id
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      navigate('/tasks');
    } catch (err) {
      setError(err.message || 'Failed to create task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="STEM & Technology">STEM & Technology</option>
                <option value="Arts">Arts</option>
                <option value="Business">Business</option>
                <option value="Leadership & Professional Development">Leadership & Professional Development</option>
                <option value="Community Service">Community Service</option>
                <option value="Health and Recreation">Health and Recreation</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Junior">Junior</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline</label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/tasks')}
              >
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskPage;