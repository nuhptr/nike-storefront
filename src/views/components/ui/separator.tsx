import { Separator as BaseSeparator } from "@base-ui/react/separator"
import type * as React from "react"
import { cn } from "@views/components/ui/cn"

/**
 * Accessible horizontal or vertical divider built on `@base-ui/react/separator`.
 *
 * @param props - Base UI separator attributes including `orientation`.
 */
export function Separator({
    className,
    orientation = "horizontal",
    ...props
}: React.ComponentProps<typeof BaseSeparator>) {
    return (
        <BaseSeparator
            data-slot="separator"
            orientation={orientation}
            className={cn(
                "shrink-0 bg-border",
                orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
                className,
            )}
            {...props}
        />
    )
}
