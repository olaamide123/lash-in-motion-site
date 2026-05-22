/** Cache tag used for on-demand revalidation when Sanity content is published. */
export const SANITY_CACHE_TAG = "sanity";

export const sanityFetchOptions = {
  next: {
    // If the webhook misses, published content still refreshes quickly.
    revalidate: 30,
    tags: [SANITY_CACHE_TAG] as string[]
  }
};
