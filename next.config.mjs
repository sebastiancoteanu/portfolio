/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export for GitHub Pages deployment
  output: 'export',
  
  // GitHub Pages serves from a subdirectory if using a project repo
  // (e.g. username.github.io/repo-name). If deploying to username.github.io
  // directly, comment out the basePath line below.
  // basePath: '/your-repo-name',  // Uncomment and set if using project pages
  
  // Disable image optimization for static export (no server needed)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
