import React, { useState } from 'react';
import {
  useGetAgentsQuery,
  useDeleteAgentMutation,
  useAddAgentMutation,
  useUpdateAgentMutation,
  Agent // Use Agent type from the slice
} from '@/features/agents/agentApiSlice'; // Corrected API slice import path
import { Button } from '@/components/ui/button'; // Corrected UI import path
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'; // Corrected UI import path
import { Input } from '@/components/ui/input'; // Corrected UI import path
import { Label } from '@/components/ui/label'; // Corrected UI import path
import { toast } from 'sonner'; // Import toast function from sonner

// Renamed component to match filename
const AgentManagementPage: React.FC = () => {
  const { data: agents, isLoading, isError } = useGetAgentsQuery();
  const [deleteAgent] = useDeleteAgentMutation();
  const [addAgent] = useAddAgentMutation();
  const [updateAgent] = useUpdateAgentMutation();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  // Initialize formData with status matching the Agent type from the slice
  const [formData, setFormData] = useState<{ name: string; description: string; status: Agent['status'] }>({
    name: '',
    description: '',
    status: 'inactive' // Default status from the slice type
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAgent) {
        // Ensure we pass the correct structure expected by updateAgent mutation
        await updateAgent({
          id: editingAgent.id,
          name: formData.name,
          description: formData.description,
          status: formData.status,
          // Ensure other fields match the expected Partial<Agent> type if needed
        }).unwrap();
        toast.success("Agent updated successfully"); // Use sonner syntax
      } else {
         // Ensure we pass the correct structure expected by addAgent mutation
        await addAgent({
          name: formData.name,
          description: formData.description,
          status: formData.status,
          // Ensure other fields match the expected Partial<Agent> type if needed
        }).unwrap();
        toast.success("Agent created successfully"); // Use sonner syntax
      }
      setIsAddDialogOpen(false);
      setEditingAgent(null);
      // Reset form with default status
      setFormData({ name: '', description: '', status: 'inactive' });
    } catch (error) {
      console.error("Failed to save agent:", error);
      toast.error("Error Saving Agent", { // Use sonner syntax
        description: "Failed to save agent. Please try again.",
        // variant is handled by toast.error()
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAgent(id).unwrap();
      toast.success("Agent deleted successfully"); // Use sonner syntax
    } catch (error) {
      console.error("Failed to delete agent:", error);
      toast.error("Error Deleting Agent", { // Use sonner syntax
        description: "Failed to delete agent. Please try again.",
        // variant is handled by toast.error()
      });
    }
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      // Use description from agent, default to empty string if undefined
      description: agent.description || '',
      status: agent.status
    });
    setIsAddDialogOpen(true);
  };

  if (isLoading) return <div className="p-4">Loading agents...</div>;
  if (isError) return <div className="p-4 text-red-500">Error loading agents</div>;

  return (
    <div className="p-4 space-y-4"> {/* Added padding to the main container */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agent Management</h1> {/* Changed h2 to h1 */}
        <Dialog open={isAddDialogOpen} onOpenChange={(isOpen: boolean) => { // Added boolean type
          setIsAddDialogOpen(isOpen);
          // Reset form if dialog is closed without saving
          if (!isOpen) {
            setEditingAgent(null);
            setFormData({ name: '', description: '', status: 'inactive' });
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingAgent(null);
              setFormData({ name: '', description: '', status: 'inactive' });
              // No need to explicitly set isAddDialogOpen here, DialogTrigger handles it
            }}>
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAgent ? 'Edit Agent' : 'Add New Agent'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {/* Use select with correct statuses from Agent type in slice */}
                <select
                  id="status"
                  value={formData.status}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as Agent['status'] }))}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" // Basic select styling matching Input
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  {/* Add 'error' if it should be selectable, otherwise handle it display-only */}
                   <option value="error">Error</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4"> {/* Added padding-top */}
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAgent ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg shadow overflow-hidden"> {/* Use border instead of bg-card */}
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50"> {/* Slightly transparent muted background */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background"> {/* Ensure table body bg matches */}
            {agents?.map((agent: Agent) => (
              <tr key={agent.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">{agent.name}</div> {/* Use foreground color */}
                  {agent.description && (
                    <div className="text-sm text-muted-foreground">{agent.description}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Adjusted badge colors for better theme compatibility */}
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    agent.status === 'active' ? 'bg-green-500/20 text-green-700 dark:text-green-300' :
                    agent.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-500/20 text-red-700 dark:text-red-300' // Assuming 'error' status maps here
                  }`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2"> {/* Use flex for button alignment */}
                    <Button variant="outline" size="sm" onClick={() => handleEdit(agent)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(agent.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {/* Add a row for when there are no agents */}
            {(!agents || agents.length === 0) && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-muted-foreground">
                  No agents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentManagementPage;