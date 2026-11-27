import { atom, type ReadableAtom } from "nanostores"

/**
 * Reactive ViewModel contract controlling the responsive mobile navigation sheet.
 */
export interface NavbarViewModel {
    /** Reactive boolean atom indicating whether the mobile sheet is open. */
    readonly $isMenuOpen: ReadableAtom<boolean>
    /** Opens the mobile navigation sheet. */
    openMenu(): void
    /** Closes the mobile navigation sheet. */
    closeMenu(): void
    /**
     * Explicitly sets the open state of the mobile navigation sheet.
     *
     * @param open - Desired visibility state.
     */
    setMenuOpen(open: boolean): void
}

/**
 * Creates a Nano Stores-backed `NavbarViewModel` instance.
 *
 * @returns A `NavbarViewModel` with state atoms and visibility commands.
 */
export function createNavbarViewModel(): NavbarViewModel {
    const $isMenuOpen = atom<boolean>(false)

    return {
        $isMenuOpen,
        openMenu() {
            $isMenuOpen.set(true)
        },
        closeMenu() {
            $isMenuOpen.set(false)
        },
        setMenuOpen(open: boolean) {
            $isMenuOpen.set(open)
        },
    }
}

/** Shared singleton ViewModel instance consumed by `NavbarIsland`. */
export const navbarViewModel = createNavbarViewModel()
