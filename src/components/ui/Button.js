import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
          "border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "underline-offset-4 hover:underline text-primary": variant === "link",
          "h-10 py-2 px-4": size === "default",
          "h-9 px-3 rounded-md": size === "sm",
          "h-11 px-8 rounded-md": size === "lg"
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"
// src/components/ui/ArrowLeft.js


const ArrowLeft = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m12 0l-4.5-4.5M15 12l-4.5 4.5" />
    </svg>
  );
};

export default ArrowLeft;


export { ArrowLeft,Button }