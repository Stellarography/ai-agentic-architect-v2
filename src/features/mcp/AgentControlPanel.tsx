import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAgentStore } from "@/store/useAgentStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { assignTaskToAgentAPI } from '@/lib/aiApi';
import { useState } from 'react';

const formSchema = z.object({
  agentId: z.string().min(1, "Please select an agent"),
  task: z.string().min(3, "Task description must be at least 3 characters"),
});

export function AgentControlPanel() {
  const agents = useAgentStore((state) => state.agents);
  const updateAgentStatus = useAgentStore((state) => state.updateAgentStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await assignTaskToAgentAPI(values.agentId, values.task);
      if (response.success) {
        // Let WebSocket handle the state update
        form.reset();
      } else {
        form.setError('root', { 
          message: response.error || 'Failed to assign task' 
        });
      }
    } catch (error) {
      console.error('Failed to assign task:', error);
      form.setError('root', { 
        message: 'Network error occurred' 
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-electric-blue/20 
      shadow-lg shadow-electric-blue/5">
      <h2 className="text-lg font-semibold mb-4">Agent Control</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="agentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Agent</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an agent" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task details..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-electric-blue hover:bg-electric-blue/80"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Assigning...' : 'Assign Task'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
