import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@views/components/ui/cn"

/**
 * Tailwind CSS v4 variant definitions for `Button` and button-styled anchor links (OCP).
 */
export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-98 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-sm hover:bg-coral-hover",
                secondary:
                    "bg-secondary text-secondary-foreground border border-border hover:bg-accent",
                outline:
                    "border border-border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
                ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                sm: "h-9 rounded-full px-4 text-sm",
                default: "h-11 rounded-full px-6 text-base",
                lg: "h-13 rounded-full px-7 text-base",
                icon: "size-10 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

/** Props accepted by the Base UI-backed `Button` primitive. */
export interface ButtonProps
    extends React.ComponentProps<typeof BaseButton>, VariantProps<typeof buttonVariants> {}

/**
 * Accessible Base UI button primitive styled with `buttonVariants`.
 *
 * @param props - Base UI button attributes plus visual `variant` and `size`.
 */
export function Button({ className, variant, size, ...props }: ButtonProps) {
    return (
        <BaseButton
            data-slot="button"
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    )
}
