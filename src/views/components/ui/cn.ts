import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges conditional class names with Tailwind CSS conflict resolution.
 *
 * @param inputs - Class values, arrays, or conditional maps.
 * @returns Deduplicated Tailwind class string.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}
