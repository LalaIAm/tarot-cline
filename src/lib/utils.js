/**
 * A utility function to merge class names with tailwind-merge
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
