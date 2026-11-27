import type * as React from "react"
import { cn } from "@views/components/ui/cn"

/**
 * Semantic `<article>` card container for grouped storefront content.
 *
 * @param props - Standard HTML article attributes.
 */
export function Card({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <article
            data-slot="card"
            className={cn(
                "rounded-2xl border border-border/80 bg-card text-card-foreground shadow-elevated transition-shadow duration-200",
                className,
            )}
            {...props}
        />
    )
}

/** Semantic card header region. */
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <header
            data-slot="card-header"
            className={cn("flex flex-col gap-1.5 p-6", className)}
            {...props}
        />
    )
}

/** Semantic card heading element (`<h3>`). */
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            data-slot="card-title"
            className={cn("font-display text-2xl font-bold leading-snug tracking-tight", className)}
            {...props}
        />
    )
}

/** Supporting description text within a card. */
export function CardDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            data-slot="card-description"
            className={cn("text-sm leading-relaxed text-muted-foreground", className)}
            {...props}
        />
    )
}

/** Main body region of a card. */
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div data-slot="card-content" className={cn("px-6 pb-6", className)} {...props} />
}

/** Semantic footer region holding independent card actions. */
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <footer
            data-slot="card-footer"
            className={cn("flex items-center justify-between gap-4 px-6 pb-6", className)}
            {...props}
        />
    )
}
