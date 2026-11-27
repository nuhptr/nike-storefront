import { useStore } from "@nanostores/react"
import { AlertCircle, CheckCircle2, Send } from "lucide-react"
import { type SyntheticEvent, useId, useRef, useState } from "react"
import { newsletterViewModel } from "@viewmodels/newsletter.viewmodel"
import { Button } from "@views/components/ui/button"
import { Input } from "@views/components/ui/input"

/**
 * Interactive newsletter sign-up form bound to `newsletterViewModel`.
 * Defers validation errors until after user interaction (`:user-invalid` + blur/submit)
 * and keeps `aria-invalid` and `aria-describedby` synchronized for assistive technologies.
 */
export function SubscribeFormIsland() {
    const email = useStore(newsletterViewModel.$email)
    const status = useStore(newsletterViewModel.$status)
    const feedback = useStore(newsletterViewModel.$feedback)

    const [hasInteracted, setHasInteracted] = useState(false)
    const [isFieldInvalid, setIsFieldInvalid] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const inputId = useId()
    const hintId = useId()
    const errorId = useId()

    /**
     * Synchronizes visual and ARIA validation states with native HTML5 validity.
     *
     * @param el - Email input element to inspect.
     * @param markInteracted - Whether to flag the field as touched (e.g. on blur).
     */
    const syncValidation = (el: HTMLInputElement | null, markInteracted: boolean) => {
        if (!el) return
        if (markInteracted) setHasInteracted(true)
        const shouldShowInvalid = (markInteracted || hasInteracted) && !el.validity.valid
        setIsFieldInvalid(shouldShowInvalid)
    }

    /**
     * Handles form submission, focusing the email field if invalid or delegating to `newsletterViewModel`.
     *
     * @param event - Form submit synthetic event.
     */
    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const input = inputRef.current

        if (input && !input.validity.valid) {
            setHasInteracted(true)
            setIsFieldInvalid(true)
            input.focus()
            return
        }

        const ok = await newsletterViewModel.submit()
        if (ok) {
            /** Call native `form.reset()` to clear the browser's `:user-invalid` flag on the empty `required` input. */
            form.reset()
            setHasInteracted(false)
            setIsFieldInvalid(false)
        } else {
            setHasInteracted(true)
            setIsFieldInvalid(true)
        }
    }

    /** Only attach `errorId` to `aria-describedby` while invalid so screen readers do not announce hidden errors. */
    const showError = isFieldInvalid || status === "error"
    const describedBy = showError ? `${hintId} ${errorId}` : hintId

    return (
        /* `noValidate` suppresses inconsistent native browser tooltips in favor of accessible inline error messages. */
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-xl">
            <div className="flex flex-col gap-2">
                <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
                    Email address
                </label>
                <p id={hintId} className="text-xs text-muted-foreground">
                    Format: you@example.com — we only send new drops and exclusive offers.
                </p>

                <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-border sm:bg-background sm:p-1.5 sm:shadow-xs sm:focus-within:border-ring sm:focus-within:ring-2 sm:focus-within:ring-ring/20">
                    <Input
                        ref={inputRef}
                        id={inputId}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="subscribe@nike.com"
                        value={email}
                        aria-invalid={showError ? "true" : "false"}
                        aria-describedby={describedBy}
                        onChange={(e) => {
                            newsletterViewModel.setEmail(e.target.value)
                            if (hasInteracted) {
                                syncValidation(e.currentTarget, false)
                            }
                        }}
                        onBlur={(e) => syncValidation(e.currentTarget, true)}
                        className={`newsletter-input sm:border-0 sm:bg-transparent sm:shadow-none sm:focus-visible:ring-0 ${
                            showError ? "user-invalid-fallback" : ""
                        }`}
                    />

                    <Button
                        type="submit"
                        size="default"
                        disabled={status === "submitting"}
                        className="w-full shrink-0 sm:w-auto">
                        <span>{status === "submitting" ? "Joining..." : "Sign Up"}</span>
                        <Send className="size-4" aria-hidden="true" />
                    </Button>
                </div>

                {showError && (
                    <p
                        id={errorId}
                        className="mt-1 flex items-center gap-1.5 text-sm text-destructive">
                        <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                        <span>
                            {feedback ||
                                "Error: Enter an email address in the format you@example.com."}
                        </span>
                    </p>
                )}

                <div aria-live="polite" className="min-h-6">
                    {status === "success" && feedback && (
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
                            <span>{feedback}</span>
                        </p>
                    )}
                </div>
            </div>
        </form>
    )
}
