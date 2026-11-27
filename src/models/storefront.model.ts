/**
 * Storefront domain models and segregated contracts (SRP & ISP).
 * Defines immutable (`readonly`) data shapes consumed by ViewModels and Views.
 */

/** Document-level SEO and metadata configuration. */
export interface SiteMeta {
    /** Page title rendered in the browser tab and search results. */
    readonly title: string
    /** Meta description summarizing the storefront page. */
    readonly description: string
    /** Comma-separated SEO keywords. */
    readonly keywords: string
    /** Document author attribution. */
    readonly author: string
}

/** Single navigation link entry rendered in the header and mobile sheet. */
export interface NavLink {
    /** Anchor or route destination URL. */
    readonly href: string
    /** Human-readable link label. */
    readonly label: string
}

/** Single footer link item inside a grouped footer column. */
export interface FooterLinkItem {
    /** Unique identifier within the link group. */
    readonly id: number
    /** Visible anchor text. */
    readonly name: string
    /** Target URL, anchor, `mailto:`, or `tel:` link. */
    readonly href: string
}

/** Grouped column of related links rendered in the footer. */
export interface FooterLinkGroup {
    /** Unique column identifier. */
    readonly id: number
    /** Column heading label. */
    readonly title: string
    /** Ordered list of links in this column. */
    readonly links: readonly FooterLinkItem[]
}

/** Social media profile icon link rendered in the footer. */
export interface SocialLink {
    /** Unique social link identifier. */
    readonly id: number
    /** Public path to the social network SVG icon. */
    readonly iconSrc: string
    /** Accessible label for screen readers. */
    readonly label: string
    /** External profile destination URL. */
    readonly href: string
}

/** Selectable hero sneaker colorway displayed in the interactive showcase. */
export interface ShoeVariant {
    /** Unique variant identifier. */
    readonly id: number
    /** Sneaker model name. */
    readonly name: string
    /** Colorway edition title. */
    readonly colorway: string
    /** Public path to the thumbnail preview image. */
    readonly thumbnail: string
    /** Public path to the high-resolution hero showcase image. */
    readonly bigShoe: string
}

/** Catalog sneaker item displayed in the Popular Products section. */
export interface Product {
    /** Unique product identifier. */
    readonly id: number
    /** Public path to the product illustration or photo. */
    readonly imgURL: string
    /** Display name of the shoe. */
    readonly name: string
    /** Footwear category label (e.g., Basketball, Running). */
    readonly category: string
    /** Formatted retail price string. */
    readonly price: string
    /** Average customer rating on a 5-point scale. */
    readonly rating: number
    /** Optional merchandising badge (e.g., Best Seller, New Drop). */
    readonly badge?: string
}

/** Key storefront metric highlighted in the Hero section. */
export interface StoreStatistic {
    /** Formatted metric figure (e.g., `250k+`). */
    readonly value: string
    /** Short metric label (e.g., `Customers`). */
    readonly label: string
}

/** Value-proposition card rendered in the Services section. */
export interface ServiceHighlight {
    /** Unique service card identifier. */
    readonly id: number
    /** Public path to the service icon SVG. */
    readonly iconSrc: string
    /** Service headline. */
    readonly label: string
    /** Supporting service explanation. */
    readonly subtext: string
}

/** Customer testimonial item rendered in the Customer Reviews section. */
export interface CustomerReview {
    /** Unique review identifier. */
    readonly id: number
    /** Public path to the customer avatar image. */
    readonly imgURL: string
    /** Reviewer full name. */
    readonly customerName: string
    /** Reviewer persona or title. */
    readonly role: string
    /** Numerical star rating out of 5. */
    readonly rating: number
    /** Testimonial quote text. */
    readonly feedback: string
}

/** Lifecycle status of the newsletter subscription form. */
export type SubscriptionStatus = "idle" | "submitting" | "success" | "error"

/** Outcome returned by an `INewsletterService.subscribe` call. */
export interface SubscriptionResult {
    /** Indicates whether the subscription succeeded. */
    readonly ok: boolean
    /** User-facing confirmation or validation error message. */
    readonly message: string
}

/**
 * Contract for newsletter subscription backends (DIP & LSP).
 * Any concrete transport (local validator, REST API, serverless endpoint)
 * can implement this interface without modifying `NewsletterViewModel`.
 */
export interface INewsletterService {
    /**
     * Validates and submits an email address for newsletter updates.
     *
     * @param email - Raw email address entered by the user.
     * @returns A promise resolving to the typed subscription result.
     */
    subscribe(email: string): Promise<SubscriptionResult>
}

/**
 * Aggregate immutable model contract for the Nike Storefront landing page (ISP & DIP).
 * `StorefrontViewModel` depends strictly on this interface rather than concrete data.
 */
export interface IStorefrontModel {
    /** Document SEO and head metadata. */
    readonly meta: SiteMeta
    /** Top-level header navigation links. */
    readonly navLinks: readonly NavLink[]
    /** Selectable sneaker variants for the Hero showcase. */
    readonly heroShoes: readonly ShoeVariant[]
    /** Brand metrics displayed in the Hero section. */
    readonly statistics: readonly StoreStatistic[]
    /** Featured footwear catalog items. */
    readonly popularProducts: readonly Product[]
    /** Storefront service guarantee highlights. */
    readonly services: readonly ServiceHighlight[]
    /** Customer testimonials. */
    readonly customerReviews: readonly CustomerReview[]
    /** Grouped navigation columns in the footer. */
    readonly footerLinkGroups: readonly FooterLinkGroup[]
    /** Social media links in the footer. */
    readonly socialLinks: readonly SocialLink[]
}
