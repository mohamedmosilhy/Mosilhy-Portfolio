# Deployment Checklist

This checklist is the release gate for the Vercel-hosted portfolio. Complete it
for every production deployment.

## Preflight

- [ ] Confirm the intended branch and working tree state.
- [ ] Use Node.js 24.x and pnpm 11.x.
- [ ] Install from the committed lockfile with
      `pnpm install --frozen-lockfile`.
- [ ] Run `pnpm check`.
- [ ] Run `pnpm check:links`.
- [ ] Run `pnpm check:links:external`; investigate any unavailable public
      project or profile destination.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm check:bundle`.
- [ ] Run `pnpm audit:lighthouse` against the production build.
- [ ] Confirm the canonical origin in `content/site-metadata.ts` matches the
      stable production domain.
- [ ] Review `git diff --check` and confirm no generated test or build output
      is staged.

## Vercel configuration

- [ ] Link the local repository to the intended Vercel project and team.
- [ ] Confirm the project uses the supported Node.js major version.
- [ ] Confirm the framework preset is Next.js and the package manager is
      derived from `packageManager`.
- [ ] Confirm no environment variables are required by the static content
      release.
- [ ] Deploy the verified committed source with `vercel --prod`.

## Production smoke test

- [ ] Confirm the deployment reaches the stable production alias.
- [ ] Open the home page and each published project case study.
- [ ] Verify home anchor navigation and the mobile disclosure.
- [ ] Verify previous, all-projects, and next-project navigation.
- [ ] Verify GitHub, live demo, email, and social destinations.
- [ ] Verify an unknown project renders the branded 404 with HTTP 404.
- [ ] Verify `/robots.txt` and `/sitemap.xml`.
- [ ] Inspect canonical, Open Graph, and structured-data output.
- [ ] Confirm images load without layout shift and no browser console errors
      appear.

## Rollback

If production verification fails:

1. Record the failed URL, browser, response, and reproduction steps.
2. Promote the previous healthy Vercel deployment or redeploy its commit.
3. Keep the failing deployment available for diagnosis when it contains no
   sensitive data.
4. Fix the issue in a new scoped commit, rerun the complete release gate, and
   deploy again.

Vercel deployment history is the release rollback mechanism. Do not rewrite Git
history or bypass a failed quality gate to repair production.
