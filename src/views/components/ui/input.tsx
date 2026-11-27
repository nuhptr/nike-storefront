import { Input as BaseInput } from "@base-ui/react/input"
import type * as React from "react"
import { cn } from "@views/components/ui/cn"

/** Props accepted by the Base UI-backed `Input` primitive. */
export type InputProps = React.ComponentProps<typeof BaseInput>

/**
 * Accessible text/email input primitive built on `@base-ui/react/input`.
 *
 * @param props - Native and Base UI input attributes including `ref`.
 */
export function Input({ className, ...props }: InputProps) {
    return (
        <BaseInput
            data-slot="input"
            className={cn(
                "flex h-12 w-full rounded-full border border-input bg-background px-5 text-base text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        />
    )
}
