# Domain Migration Design

## Goal
Make `https://farihmuwaffaq.my.id` the production and canonical URL while preserving `https://farih-portfolio.vercel.app` as a redirect source.

## Scope
- Update Astro's production `site` URL.
- Replace hard-coded old-domain URLs in structured metadata and crawler configuration.
- Update project documentation that identifies the production URL.
- Regenerate the static `dist/` output through the normal build.
- Configure the old Vercel domain redirect in Vercel; this cannot be completed from repository code alone.

## Implementation
`astro.config.mjs` will use `https://farihmuwaffaq.my.id`. Existing layouts already derive canonical and Open Graph URLs from `Astro.site`, so generated metadata will follow the new domain. Hard-coded JSON-LD URLs in page/layout sources and the sitemap URL in `public/robots.txt` will be updated. Documentation references will be updated where they describe the live production URL.

## Validation
Run `npm run check` and `npm run build`. Search generated output for the old domain and verify the new domain appears in canonical URLs, sitemap output, and `robots.txt`. Run the repository's domain-sensitive link audit if available.

## Deployment
In Vercel, add `farihmuwaffaq.my.id` to the project, set it as the primary domain, and retain `farih-portfolio.vercel.app` with a permanent redirect to the primary domain. DNS must point the purchased domain to Vercel according to the records shown by Vercel.
