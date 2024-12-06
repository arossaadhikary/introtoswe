import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,
  
  // Fetch all tasks
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/tasks');
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create task
  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/tasks', taskData);
      set((state) => ({
        tasks: [...state.tasks, response.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update task
  updateTask: async (taskId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
      set((state) => ({
        tasks: state.tasks.map(task => 
          task._id === taskId ? response.data : task
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter(task => task._id !== taskId),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (taskId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Clear errors
  clearError: () => set({ error: null }),

  // Reset store
  reset: () => set({ tasks: [], loading: false, error: null })
}));

export default useTaskStore;