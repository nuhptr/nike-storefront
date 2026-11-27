import { atom, computed, type ReadableAtom } from "nanostores"
import type { ShoeVariant } from "@models/storefront.model"

/**
 * Reactive ViewModel contract for the interactive Hero sneaker selector.
 */
export interface HeroShowcaseViewModel {
    /** Available sneaker colorways displayed as thumbnail choice cards. */
    readonly variants: readonly ShoeVariant[]
    /** Reactive atom holding the currently selected shoe variant ID. */
    readonly $selectedId: ReadableAtom<number>
    /** Derived reactive atom resolving the active `ShoeVariant` object. */
    readonly $activeShoe: ReadableAtom<ShoeVariant>
    /**
     * Selects a shoe variant by ID if it exists in `variants`.
     *
     * @param id - Target `ShoeVariant.id` to activate.
     */
    selectShoe(id: number): void
}

/**
 * Creates a framework-agnostic reactive ViewModel for `HeroShowcaseIsland`.
 *
 * @param variants - Non-empty list of sneaker variants to switch between.
 * @returns A `HeroShowcaseViewModel` backed by Nano Stores.
 * @throws {Error} When `variants` is empty.
 */
export function createHeroShowcaseViewModel(
    variants: readonly ShoeVariant[],
): HeroShowcaseViewModel {
    if (variants.length === 0) {
        throw new Error("HeroShowcaseViewModel requires at least one shoe variant.")
    }

    const $selectedId = atom<number>(variants[0].id)

    const $activeShoe = computed($selectedId, (selectedId) => {
        return variants.find((item) => item.id === selectedId) ?? variants[0]
    })

    return {
        variants,
        $selectedId,
        $activeShoe,
        selectShoe(id: number) {
            if (variants.some((item) => item.id === id)) {
                $selectedId.set(id)
            }
        },
    }
}
