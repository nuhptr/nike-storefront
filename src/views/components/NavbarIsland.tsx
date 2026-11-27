import { useStore } from "@nanostores/react"
import { Menu } from "lucide-react"
import type { NavLink } from "@models/storefront.model"
import { navbarViewModel } from "@viewmodels/navbar.viewmodel"
import { buttonVariants } from "@views/components/ui/button"
import { cn } from "@views/components/ui/cn"
import { Separator } from "@views/components/ui/separator"
import {
    Sheet,
    SheetClose,
    SheetDescription,
    SheetPopup,
    SheetTitle,
    SheetTrigger,
} from "@views/components/ui/sheet"

/** Props accepted by `NavbarIsland`. */
interface NavbarIslandProps {
    /** Primary navigation links supplied by `StorefrontViewModel.navbar`. */
    readonly navLinks: readonly NavLink[]
}

/**
 * Interactive top navigation bar with a Base UI `Sheet` mobile drawer.
 * Binds open/close state to `navbarViewModel`.
 *
 * @param props - Navigation link items to render across desktop and mobile views.
 */
export function NavbarIsland({ navLinks }: NavbarIslandProps) {
    /** Subscribes to the shared `navbarViewModel` Nano Store controlling mobile sheet visibility. */
    const isMenuOpen = useStore(navbarViewModel.$isMenuOpen)

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
            <nav
                aria-label="Primary navigation"
                className="storefront-container flex h-20 items-center justify-between px-6 sm:px-12 lg:px-16">
                <a
                    href="#home"
                    className="inline-flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                    <img
                        src="/images/brand/header-logo.svg"
                        alt="Nike Storefront home"
                        width={130}
                        height={29}
                        className="h-7 w-auto"
                    />
                </a>

                <ul className="hidden items-center gap-10 lg:flex">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 lg:flex">
                    <a
                        href="#contact-us"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                        Sign in
                    </a>
                    <a
                        href="#products"
                        className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
                        Explore now
                    </a>
                </div>

                <div className="lg:hidden">
                    <Sheet
                        open={isMenuOpen}
                        onOpenChange={(open) => navbarViewModel.setMenuOpen(open)}>
                        <SheetTrigger
                            aria-label="Open navigation menu"
                            aria-expanded={isMenuOpen}
                            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
                            <Menu className="size-5" aria-hidden="true" />
                        </SheetTrigger>

                        <SheetPopup aria-label="Mobile navigation">
                            <div className="flex flex-col gap-1 pr-10">
                                <SheetTitle>Nike Storefront</SheetTitle>
                                <SheetDescription>
                                    Explore new drops and summer collections.
                                </SheetDescription>
                            </div>

                            <Separator className="my-5" />

                            {/*
                              Base UI `render` prop composes `<a href>` directly into `SheetClose`
                              so clicking a link both navigates and dismisses the drawer without nesting buttons/links.
                            */}
                            <nav aria-label="Mobile links" className="flex flex-col gap-2">
                                {navLinks.map((item) => (
                                    <SheetClose
                                        key={item.href}
                                        render={
                                            <a
                                                href={item.href}
                                                className="rounded-xl px-3.5 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent">
                                                {item.label}
                                            </a>
                                        }
                                    />
                                ))}
                            </nav>

                            <div className="mt-auto flex flex-col gap-3 pt-6">
                                <SheetClose
                                    render={
                                        <a
                                            href="#products"
                                            className={cn(
                                                buttonVariants({
                                                    variant: "default",
                                                    size: "default",
                                                }),
                                                "w-full",
                                            )}>
                                            Explore now
                                        </a>
                                    }
                                />
                                <SheetClose
                                    render={
                                        <a
                                            href="#contact-us"
                                            className={cn(
                                                buttonVariants({
                                                    variant: "outline",
                                                    size: "default",
                                                }),
                                                "w-full",
                                            )}>
                                            Sign in
                                        </a>
                                    }
                                />
                            </div>
                        </SheetPopup>
                    </Sheet>
                </div>
            </nav>
        </header>
    )
}
