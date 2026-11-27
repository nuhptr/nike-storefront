import { atom, type ReadableAtom } from "nanostores"
import { LocalNewsletterService } from "@models/storefront.data"
import type { INewsletterService, SubscriptionStatus } from "@models/storefront.model"

/**
 * Reactive ViewModel contract for the newsletter subscription island.
 */
export interface NewsletterViewModel {
    /** Current email input value. */
    readonly $email: ReadableAtom<string>
    /** Current submission lifecycle status. */
    readonly $status: ReadableAtom<SubscriptionStatus>
    /** User-facing confirmation or error feedback message. */
    readonly $feedback: ReadableAtom<string>
    /**
     * Updates the email field value and clears stale submission feedback.
     *
     * @param value - Latest input string.
     */
    setEmail(value: string): void
    /**
     * Submits the current email to the injected `INewsletterService`.
     *
     * @returns A promise resolving to `true` on success or `false` on error.
     */
    submit(): Promise<boolean>
    /** Resets email, status, and feedback back to their initial idle state. */
    reset(): void
}

/**
 * Creates a `NewsletterViewModel` bound to an injected `INewsletterService` (DIP).
 *
 * @param service - Newsletter backend implementation; defaults to `LocalNewsletterService`.
 * @returns A Nano Stores-backed `NewsletterViewModel`.
 */
export function createNewsletterViewModel(
    service: INewsletterService = new LocalNewsletterService(),
): NewsletterViewModel {
    const $email = atom<string>("")
    const $status = atom<SubscriptionStatus>("idle")
    const $feedback = atom<string>("")

    return {
        $email,
        $status,
        $feedback,
        setEmail(value: string) {
            $email.set(value)
            if ($status.get() !== "idle") {
                $status.set("idle")
                $feedback.set("")
            }
        },
        async submit(): Promise<boolean> {
            $status.set("submitting")
            const result = await service.subscribe($email.get())
            $status.set(result.ok ? "success" : "error")
            $feedback.set(result.message)
            if (result.ok) {
                $email.set("")
            }
            return result.ok
        },
        reset() {
            $email.set("")
            $status.set("idle")
            $feedback.set("")
        },
    }
}

/** Shared singleton ViewModel instance consumed by `SubscribeFormIsland`. */
export const newsletterViewModel = createNewsletterViewModel()
