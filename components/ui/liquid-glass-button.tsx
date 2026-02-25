"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-white text-black border-2 border-white hover:bg-red-600 hover:text-white hover:border-red-600 shadow-sm",
                red: "bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-white shadow-[0_4px_20px_rgba(220,38,38,0.25)]",
                outline: "bg-transparent border-2 border-white/20 text-white hover:border-white hover:bg-white hover:text-black",
                "outline-white": "bg-transparent border-2 border-white/20 text-white hover:border-red-600 hover:bg-red-600 hover:text-white",
                "glass-red": "bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
                secondary: "bg-zinc-800 text-white border-2 border-zinc-800 hover:bg-white hover:text-black hover:border-white",
                ghost: "bg-transparent text-white hover:bg-white/10",
            },
            size: {
                default: "h-10 px-6",
                sm: "h-8 px-4 text-xs",
                lg: "h-12 px-8 text-base",
                xl: "h-14 px-10 text-lg",
                xxl: "h-16 px-12 text-xl font-bold tracking-tight",
                icon: "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

const liquidbuttonVariants = buttonVariants;

/**
 * @deprecated Use Button instead. Kept for backwards compatibility.
 */
function LiquidButton({
    className,
    variant,
    size,
    asChild = false,
    noScale = false,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
        noScale?: boolean
    }) {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(
                buttonVariants({ variant, size, className }),
                !noScale && "hover:scale-[1.03]"
            )}
            {...props}
        >
            {children}
        </Comp>
    )
}

function LiquidFilters() {
    return null
}

function MetalButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <LiquidButton
            className={cn("bg-zinc-900 border-zinc-800 hover:bg-red-600 hover:border-red-600", className)}
            {...props}
        />
    )
}

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton, MetalButton, LiquidFilters }
