import React, { useEffect, useState } from 'react';
import { MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useTaskStore from '../store/useTaskStore';

const categories = {
  "STEM & Technology": "#7FB3D5",
  Arts: "#73C2FB",
  Business: "#FF8300",
  "Leadership & Professional Development": "#FF8300",
  "Community Service": "#FBC77F",
  "Health & Recreation": "#5DADE2",
  Others: "#A569BD",
};

const TaskListPage = () => {
  const navigate = useNavigate();
  const { tasks, loading, error, fetchTasks, deleteTask } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setSelectedTask(task);
    navigate('/tasks');
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const handleChat = (task) => {
    // Implement chat functionality
    console.log('Opening chat for task:', task._id);
    setSelectedTask(task);
    navigate('/');
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task._id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="truncate">{task.title}</span>
                <Badge 
                  variant="secondary" 
                  style={{
                    backgroundColor: categories[task.category] || '#ccc', // Fallback color
                    color: '#fff', // White text for contrast
                  }}
                >
                  {task.category}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="text-sm">
                <p><strong>Level:</strong> {task.level}</p>
                <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
                {task.organization && (
                  <p><strong>Organization:</strong> {task.organization}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEdit(task)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDelete(task._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleChat(task)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
