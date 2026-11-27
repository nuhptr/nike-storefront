import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import type * as React from "react"
import { cn } from "@views/components/ui/cn"

/** Root provider controlling open state for the slide-over `Sheet` drawer. */
export const Sheet = Dialog.Root

/** Interactive trigger button that opens the `Sheet` drawer. */
export const SheetTrigger = Dialog.Trigger

/** Interactive element that closes the `Sheet` drawer. */
export const SheetClose = Dialog.Close

/**
 * Modal slide-over panel rendered in a top-layer portal with backdrop dimming.
 *
 * @param props - Base UI `Dialog.Popup` attributes and drawer content.
 */
export function SheetPopup({
    className,
    children,
    ...props
}: React.ComponentProps<typeof Dialog.Popup>) {
    return (
        <Dialog.Portal>
            <Dialog.Backdrop
                data-slot="sheet-backdrop"
                className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
            />
            <Dialog.Popup
                data-slot="sheet-popup"
                className={cn(
                    "fixed inset-y-0 right-0 z-50 flex h-svh w-80 max-w-[85dvw] flex-col border-l border-border bg-background p-6 shadow-2xl transition-transform duration-200 data-ending-style:translate-x-full data-starting-style:translate-x-full",
                    className,
                )}
                {...props}>
                {children}
                <Dialog.Close
                    aria-label="Close navigation menu"
                    className="absolute top-5 right-5 inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                    <X className="size-4" aria-hidden="true" />
                </Dialog.Close>
            </Dialog.Popup>
        </Dialog.Portal>
    )
}

/** Accessible title heading announced when the `Sheet` opens. */
export function SheetTitle({ className, ...props }: React.ComponentProps<typeof Dialog.Title>) {
    return (
        <Dialog.Title
            data-slot="sheet-title"
            className={cn("font-display text-xl font-bold text-foreground", className)}
            {...props}
        />
    )
}

/** Supporting description text inside the `Sheet` header. */
export function SheetDescription({
    className,
    ...props
}: React.ComponentProps<typeof Dialog.Description>) {
    return (
        <Dialog.Description
            data-slot="sheet-description"
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    )
}
