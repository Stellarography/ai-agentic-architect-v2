import * as React from "react"
import { cn } from "@/lib/utils"


/**
 * Interface for common card component props
 * Extends standard HTML div element props
 */
type CardComponentProps = React.ComponentProps<"div">

/**
 * Root card component that serves as a container
 * @param className - Additional CSS classes to merge with default styles
 * @param props - Standard HTML div props
 * @returns A styled card container component
 */
function Card({ className, ...props }: CardComponentProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base styles for card container
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

/**
 * Header section of the card
 * Uses CSS container queries for responsive layouts
 */
function CardHeader({ className, ...props }: CardComponentProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Container query based grid layout
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
        // Conditional styling when action slot is present
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        // Border handling
        "[.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Title component for the card
 * Displays the main heading or title
 */
function CardTitle({ className, ...props }: CardComponentProps) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Description component for secondary text content
 * Uses muted foreground color for visual hierarchy
 */
function CardDescription({ className, ...props }: CardComponentProps) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Action component for interactive elements (buttons, links)
 * Positioned in the top-right when used within CardHeader
 */
function CardAction({ className, ...props }: CardComponentProps) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        // Grid positioning for action items
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Content section of the card
 * Used for the main content of the card
 */
function CardContent({ className, ...props }: CardComponentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Footer section of the card
 * Typically used for actions or additional information
 */
function CardFooter({ className, ...props }: CardComponentProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

/**
 * Export all card components as a composite component system
 * Usage:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *     <CardAction><button>Action</button></CardAction>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 *   <CardFooter>Footer</CardFooter>
 * </Card>
 */
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
