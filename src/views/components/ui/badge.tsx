import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@views/components/ui/cn"

/**
 * Tailwind CSS v4 variant definitions for `Badge` labels (OCP).
 */
export const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors",
    {
        variants: {
            variant: {
                default: "border-primary/20 bg-primary/10 text-primary",
                secondary: "border-border bg-secondary text-secondary-foreground",
                outline: "border-border bg-background/80 text-foreground backdrop-blur-xs",
                dark: "border-white/15 bg-white/10 text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

/** Props accepted by the `Badge` component. */
export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/**
 * Compact pill badge used to highlight categories, collections, and statuses.
 *
 * @param props - Span attributes plus optional `variant`.
 */
export function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}
