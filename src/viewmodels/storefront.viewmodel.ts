import { STOREFRONT_DATA } from "@models/storefront.data"
import type {
    CustomerReview,
    FooterLinkGroup,
    IStorefrontModel,
    NavLink,
    Product,
    ServiceHighlight,
    ShoeVariant,
    SiteMeta,
    SocialLink,
    StoreStatistic,
} from "@models/storefront.model"

/**
 * Presentation ViewModel for the Nike Storefront landing page (MVVM + DIP + ISP).
 * Exposes narrow, read-only slices shaped specifically for each Astro section.
 */
export class StorefrontViewModel {
    /**
     * Creates a new `StorefrontViewModel` bound to the given model contract.
     *
     * @param model - Immutable storefront model implementing `IStorefrontModel`.
     */
    constructor(private readonly model: IStorefrontModel) {}

    /** Document-level SEO and metadata props for `BaseLayout`. */
    get meta(): SiteMeta {
        return this.model.meta
    }

    /** Props slice for the `NavbarIsland` component. */
    get navbar(): { readonly navLinks: readonly NavLink[] } {
        return { navLinks: this.model.navLinks }
    }

    /** Props slice for `HeroSection`. */
    get hero(): {
        readonly shoes: readonly ShoeVariant[]
        readonly statistics: readonly StoreStatistic[]
    } {
        return {
            shoes: this.model.heroShoes,
            statistics: this.model.statistics,
        }
    }

    /** Props slice for `PopularProductsSection`. */
    get popularProducts(): { readonly products: readonly Product[] } {
        return { products: this.model.popularProducts }
    }

    /** Props slice for `ServicesSection`. */
    get services(): { readonly services: readonly ServiceHighlight[] } {
        return { services: this.model.services }
    }

    /** Props slice for `CustomerReviewsSection`. */
    get customerReviews(): { readonly reviews: readonly CustomerReview[] } {
        return { reviews: this.model.customerReviews }
    }

    /** Props slice for `FooterSection`. */
    get footer(): {
        readonly footerLinkGroups: readonly FooterLinkGroup[]
        readonly socialLinks: readonly SocialLink[]
    } {
        return {
            footerLinkGroups: this.model.footerLinkGroups,
            socialLinks: this.model.socialLinks,
        }
    }
}

/**
 * Factory function instantiating `StorefrontViewModel` with an optional custom model (OCP / DIP).
 *
 * @param model - Optional `IStorefrontModel` implementation; defaults to `STOREFRONT_DATA`.
 * @returns A configured `StorefrontViewModel` instance.
 */
export function createStorefrontViewModel(
    model: IStorefrontModel = STOREFRONT_DATA,
): StorefrontViewModel {
    return new StorefrontViewModel(model)
}
