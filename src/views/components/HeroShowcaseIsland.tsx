import { useStore } from "@nanostores/react"
import { Check } from "lucide-react"
import { useMemo } from "react"
import type { ShoeVariant } from "@models/storefront.model"
import { createHeroShowcaseViewModel } from "@viewmodels/hero-showcase.viewmodel"
import { Badge } from "@views/components/ui/badge"

/** Props accepted by `HeroShowcaseIsland`. */
interface HeroShowcaseIslandProps {
    /** Selectable sneaker variants supplied by `StorefrontViewModel.hero.shoes`. */
    readonly shoes: readonly ShoeVariant[]
}

/**
 * Interactive Hero sneaker showcase island.
 * Elevates the active LCP sneaker image with `fetchPriority="high"` and renders
 * accessible radio-backed choice cards styled via `:has(> input:checked)`.
 *
 * @param props - Sneaker variants displayed in the showcase and thumbnail selector.
 */
export function HeroShowcaseIsland({ shoes }: HeroShowcaseIslandProps) {
    /** Instantiate the Nano Stores ViewModel once per variant list so state survives re-renders. */
    const vm = useMemo(() => createHeroShowcaseViewModel(shoes), [shoes])
    /** Subscribe this React island to the computed `$activeShoe` atom from `HeroShowcaseViewModel`. */
    const activeShoe = useStore(vm.$activeShoe)

    return (
        <div className="hero-canvas-bg relative flex flex-1 flex-col items-center justify-center rounded-3xl border border-border/70 bg-hero-canvas bg-cover bg-center px-6 pt-12 pb-28 sm:px-10 xl:min-h-170">
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <Badge variant="outline" className="bg-background/90 px-3.5 py-1.5 shadow-xs">
                    <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{activeShoe.name}</span>
                    <span className="text-muted-foreground">· {activeShoe.colorway}</span>
                </Badge>
            </div>

            {/*
              Hero LCP image: `fetchPriority="high"` (without `loading="lazy"`) tells the browser
              to prioritize downloading this image first to improve Largest Contentful Paint.
            */}
            <img
                src={activeShoe.bigShoe}
                alt={`${activeShoe.name} in ${activeShoe.colorway}`}
                width={610}
                height={500}
                fetchPriority="high"
                className="relative z-10 max-h-95 w-auto object-contain drop-shadow-hero-shoe transition-all duration-300 sm:max-h-110"
            />

            {/*
              Choice card radio group: each `<label>` wraps a screen-reader-only focusable `<input type="radio">`.
              Selection styling uses `.shoe-choice-card:has(> input:checked)` with a constant 2px transparent border
              so switching shoes never triggers layout shift.
            */}
            <fieldset className="absolute -bottom-10 inset-x-4 z-20 mx-auto max-w-lg border-0 p-0 sm:inset-x-auto">
                <legend className="visually-hidden">Choose featured Nike shoe colorway</legend>
                <div className="grid grid-cols-3 gap-3 sm:gap-5">
                    {vm.variants.map((shoe) => {
                        const isSelected = shoe.id === activeShoe.id
                        return (
                            <label
                                key={shoe.id}
                                className="shoe-choice-card shoe-thumb-bg relative flex cursor-pointer items-center justify-center rounded-2xl bg-card/95 bg-cover bg-center p-3 shadow-md backdrop-blur-xs hover:-translate-y-0.5 sm:h-32 sm:w-36 sm:p-4">
                                <input
                                    type="radio"
                                    name="hero-shoe-variant"
                                    value={shoe.id}
                                    checked={isSelected}
                                    onChange={() => vm.selectShoe(shoe.id)}
                                    className="sr-only"
                                />
                                {isSelected && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-2 right-2 inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
                                        <Check className="size-3" strokeWidth={3} />
                                    </span>
                                )}
                                <img
                                    src={shoe.thumbnail}
                                    alt={`${shoe.name} (${shoe.colorway})`}
                                    width={127}
                                    height={103}
                                    className="h-auto w-24 object-contain sm:w-28"
                                />
                            </label>
                        )
                    })}
                </div>
            </fieldset>
        </div>
    )
}
