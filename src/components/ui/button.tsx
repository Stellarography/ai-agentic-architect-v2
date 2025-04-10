import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/variants/button" // Import variants

// Define props interface extending ButtonHTMLAttributes and VariantProps
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// Use React.forwardRef for proper ref handling
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref} // forwardRef handles passing the ref correctly, even to Slot
        {...props}
      />
    )
  }
)
Button.displayName = "Button" // Add display name for better debugging

export { Button } // Export only the component and props interface