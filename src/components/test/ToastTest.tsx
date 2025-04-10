import React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const ToastTest: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Toast Examples</h2>
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() => {
            toast.success('Success!', {
              description: 'Operation completed successfully'
            });
          }}
        >
          Success Toast
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            toast.error('Error!', {
              description: 'Something went wrong'
            });
          }}
        >
          Error Toast
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            toast.promise(
              // Simulate async operation
              new Promise((resolve) => setTimeout(resolve, 2000)),
              {
                loading: 'Loading...',
                success: 'Operation completed',
                error: 'Operation failed'
              }
            );
          }}
        >
          Promise Toast
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toast('Action Required', {
              description: 'Please confirm this action',
              action: {
                label: 'Confirm',
                onClick: () => console.log('Confirmed')
              },
              cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancelled')
              }
            });
          }}
        >
          Action Toast
        </Button>
      </div>
    </div>
  );
};
