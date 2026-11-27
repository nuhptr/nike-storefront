import type {
    INewsletterService,
    IStorefrontModel,
    SubscriptionResult,
} from "@models/storefront.model"

/**
 * Concrete static dataset implementing `IStorefrontModel`.
 * Keeps all domain copy and asset paths decoupled from View components.
 */
export const STOREFRONT_DATA: IStorefrontModel = {
    meta: {
        title: "Nike Storefront | New Arrival Shoes",
        description:
            "Discover stylish Nike arrivals, quality comfort, and innovation for your active life.",
        keywords: "nike, astro, tailwindcss, base-ui, mvvm, solid, shoes, storefront",
        author: "Adi Nugraha Putra",
    },
    navLinks: [
        { href: "#home", label: "Home" },
        { href: "#products", label: "Products" },
        { href: "#about-us", label: "About Us" },
        { href: "#contact-us", label: "Contact Us" },
    ],
    heroShoes: [
        {
            id: 1,
            name: "Nike Air Max Pulse",
            colorway: "Crimson Ember",
            thumbnail: "/images/shoes/thumbnail-shoe1.svg",
            bigShoe: "/images/shoes/big-shoe1.png",
        },
        {
            id: 2,
            name: "Nike Zoom Pegasus",
            colorway: "Coral Velocity",
            thumbnail: "/images/shoes/thumbnail-shoe2.svg",
            bigShoe: "/images/shoes/big-shoe2.png",
        },
        {
            id: 3,
            name: "Nike Infinity Run",
            colorway: "Midnight Volt",
            thumbnail: "/images/shoes/thumbnail-shoe3.svg",
            bigShoe: "/images/shoes/big-shoe3.png",
        },
    ],
    statistics: [
        { value: "1k+", label: "Brands" },
        { value: "500+", label: "Shops" },
        { value: "250k+", label: "Customers" },
    ],
    popularProducts: [
        {
            id: 1,
            imgURL: "/images/shoes/shoe4.svg",
            name: "Nike Air Jordan-01",
            category: "Basketball",
            price: "$200.20",
            rating: 4.8,
            badge: "Best Seller",
        },
        {
            id: 2,
            imgURL: "/images/shoes/shoe5.svg",
            name: "Nike Air Jordan-10",
            category: "Lifestyle",
            price: "$210.20",
            rating: 4.7,
            badge: "New Drop",
        },
        {
            id: 3,
            imgURL: "/images/shoes/shoe6.svg",
            name: "Nike Air Jordan-100",
            category: "Running",
            price: "$220.20",
            rating: 4.9,
        },
        {
            id: 4,
            imgURL: "/images/shoes/shoe7.svg",
            name: "Nike Air Jordan-001",
            category: "Training",
            price: "$230.20",
            rating: 4.6,
            badge: "Limited",
        },
    ],
    services: [
        {
            id: 1,
            iconSrc: "/icons/services/truck-fast.svg",
            label: "Free shipping",
            subtext: "Enjoy seamless shopping with our complimentary shipping service.",
        },
        {
            id: 2,
            iconSrc: "/icons/services/shield-tick.svg",
            label: "Secure Payment",
            subtext: "Experience worry-free transactions with our secure payment options.",
        },
        {
            id: 3,
            iconSrc: "/icons/services/support.svg",
            label: "Love to help you",
            subtext: "Our dedicated team is here to assist you every step of the way.",
        },
    ],
    customerReviews: [
        {
            id: 1,
            imgURL: "/images/customers/customer1.jpeg",
            customerName: "Morich Brown",
            role: "Marathon Runner",
            rating: 4.9,
            feedback:
                "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
        },
        {
            id: 2,
            imgURL: "/images/customers/customer2.svg",
            customerName: "Lota Mongeskar",
            role: "Sneaker Collector",
            rating: 4.8,
            feedback:
                "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
        },
    ],
    footerLinkGroups: [
        {
            id: 1,
            title: "Products",
            links: [
                { id: 1, name: "Air Force 1", href: "#products" },
                { id: 2, name: "Air Max 1", href: "#products" },
                { id: 3, name: "Air Jordan 1", href: "#products" },
                { id: 4, name: "Air Force 2", href: "#products" },
                { id: 5, name: "Nike Waffle Racer", href: "#products" },
                { id: 6, name: "Nike Cortez", href: "#products" },
            ],
        },
        {
            id: 2,
            title: "Help",
            links: [
                { id: 1, name: "About us", href: "#about-us" },
                { id: 2, name: "FAQs", href: "#contact-us" },
                { id: 3, name: "How it works", href: "#about-us" },
                { id: 4, name: "Privacy policy", href: "#home" },
                { id: 5, name: "Payment policy", href: "#home" },
            ],
        },
        {
            id: 3,
            title: "Get in touch",
            links: [
                { id: 1, name: "customer@nike.com", href: "mailto:customer@nike.com" },
                { id: 2, name: "+92554862354", href: "tel:+92554862354" },
            ],
        },
    ],
    socialLinks: [
        { id: 1, iconSrc: "/icons/social/facebook.svg", label: "Facebook", href: "https://facebook.com" },
        { id: 2, iconSrc: "/icons/social/twitter.svg", label: "X / Twitter", href: "https://x.com" },
        {
            id: 3,
            iconSrc: "/icons/social/instagram.svg",
            label: "Instagram",
            href: "https://instagram.com",
        },
    ],
}

/** Standard email format validation pattern used by `LocalNewsletterService`. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Default client-side implementation of `INewsletterService`.
 * Validates email formatting and returns a user-facing confirmation payload.
 */
export class LocalNewsletterService implements INewsletterService {
    /**
     * Normalizes and validates an email address for newsletter sign-up.
     *
     * @param email - Email address submitted by the visitor.
     * @returns A typed `SubscriptionResult` indicating success or validation failure.
     */
    async subscribe(email: string): Promise<SubscriptionResult> {
        const normalized = email.trim().toLowerCase()

        if (!EMAIL_PATTERN.test(normalized)) {
            return {
                ok: false,
                message: "Enter an email address in the format you@example.com.",
            }
        }

        return {
            ok: true,
            message: `Thanks! ${normalized} has been added to our Summer Drop alerts.`,
        }
    }
}
