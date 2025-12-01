#!/bin/bash
# Quick Start Commands - SEO & Performance Optimization
# Copy and paste these commands to quickly get started

# ============================================================================
# SETUP & INITIALIZATION
# ============================================================================

echo "🚀 HireTrack SEO & Performance Optimization - Quick Start"
echo "============================================================================"

# 1. Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install

# 2. Build project
echo "🔨 Step 2: Building project..."
npm run build

# 3. Check for TypeScript errors
echo "✅ Step 3: Checking TypeScript..."
npx tsc --noEmit

# 4. Check for lint errors
echo "✅ Step 4: Running ESLint..."
npm run lint || true

# ============================================================================
# PERFORMANCE ANALYSIS
# ============================================================================

echo ""
echo "📊 PERFORMANCE ANALYSIS"
echo "============================================================================"

# 5. Analyze bundle size
echo "📊 Step 5: Analyzing bundle..."
echo ""
echo "⚠️  Manual Step: Run this command after build:"
echo "   npx webpack-bundle-analyzer .next/static/chunks/main.js"
echo ""
echo "Or in one command:"
npm run build && npx webpack-bundle-analyzer .next/static/chunks/main.js 2>/dev/null || echo "⚠️  webpack-bundle-analyzer not installed. Install with: npm install --save-dev webpack-bundle-analyzer"

# ============================================================================
# LOCAL TESTING
# ============================================================================

echo ""
echo "🧪 LOCAL TESTING"
echo "============================================================================"

# 6. Start development server
echo "6️⃣  Starting local server..."
echo ""
echo "Run this in another terminal:"
echo "   npm start"
echo ""
echo "Then open:"
echo "   📱 Browser: http://localhost:3000"
echo "   🔍 Robots: http://localhost:3000/robots.txt"
echo "   🗺️  Sitemap: http://localhost:3000/sitemap.xml"
echo ""

# ============================================================================
# LIGHTHOUSE TESTING
# ============================================================================

echo ""
echo "💡 LIGHTHOUSE TESTING"
echo "============================================================================"

echo "Steps to run Lighthouse audit:"
echo "1. Keep npm start running in another terminal"
echo "2. Open Chrome and go to http://localhost:3000"
echo "3. Open DevTools (F12 or Cmd+Option+I on Mac)"
echo "4. Go to Lighthouse tab"
echo "5. Select: Mobile & Desktop"
echo "6. Click 'Generate report'"
echo ""
echo "⏱️  Expected targets:"
echo "   ✅ Performance: 90+"
echo "   ✅ SEO: 100"
echo "   ✅ Accessibility: 95+"
echo "   ✅ Best Practices: 90+"
echo ""

# ============================================================================
# VALIDATION TOOLS
# ============================================================================

echo ""
echo "🔍 VALIDATION TOOLS"
echo "============================================================================"

echo ""
echo "SEO & Structured Data Validation:"
echo "1. Google Rich Results Test:"
echo "   https://search.google.com/test/rich-results"
echo ""
echo "2. Google Mobile-Friendly Test:"
echo "   https://search.google.com/test/mobile-friendly"
echo ""
echo "3. Facebook Open Graph Debugger:"
echo "   https://developers.facebook.com/tools/debug/"
echo ""
echo "4. Twitter Card Validator:"
echo "   https://cards-dev.twitter.com/validator"
echo ""
echo "5. XML Sitemap Validator:"
echo "   https://www.xml-sitemaps.com/validate-xml-sitemap.html"
echo ""
echo "6. Robots.txt Validator:"
echo "   https://www.robotstxt.org/"
echo ""

# ============================================================================
# CURL TESTS (can be run directly)
# ============================================================================

echo ""
echo "🧪 QUICK CURL TESTS"
echo "============================================================================"

echo ""
echo "Test robots.txt (when site is deployed):"
echo "   curl https://hiretrack.app/robots.txt | head -20"
echo ""
echo "Test sitemap.xml (when site is deployed):"
echo "   curl https://hiretrack.app/sitemap.xml | head -30"
echo ""
echo "Test metadata (view page source):"
echo "   curl https://hiretrack.app | grep -E '<meta|<title|og:|twitter:' | head -20"
echo ""

# ============================================================================
# ENVIRONMENT SETUP
# ============================================================================

echo ""
echo "⚙️  ENVIRONMENT SETUP"
echo "============================================================================"

echo ""
echo "Make sure .env.local has:"
echo "   NEXT_PUBLIC_SITE_URL=https://hiretrack.app"
echo "   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX"
echo "   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX"
echo ""
echo "Verify with:"
grep "NEXT_PUBLIC" .env.local || echo "⚠️  .env.local not configured properly"
echo ""

# ============================================================================
# PRODUCTION DEPLOYMENT CHECKLIST
# ============================================================================

echo ""
echo "🚀 PRODUCTION DEPLOYMENT CHECKLIST"
echo "============================================================================"

echo ""
echo "Pre-Deployment:"
echo "   ☐ npm run build (no errors)"
echo "   ☐ npm start (test locally)"
echo "   ☐ Lighthouse audit (all scores > 90)"
echo "   ☐ Test on mobile devices"
echo "   ☐ Verify all routes work"
echo "   ☐ Database connection active"
echo "   ☐ Environment variables set"
echo ""
echo "Post-Deployment:"
echo "   ☐ Site loads without errors"
echo "   ☐ Robots.txt accessible"
echo "   ☐ Sitemap.xml generates correctly"
echo "   ☐ Submit to Google Search Console"
echo "   ☐ Submit to Bing Webmaster Tools"
echo "   ☐ Monitor error logs"
echo "   ☐ Check Core Web Vitals"
echo ""

# ============================================================================
# USEFUL COMMANDS REFERENCE
# ============================================================================

echo ""
echo "📋 USEFUL COMMANDS REFERENCE"
echo "============================================================================"

echo ""
cat << 'EOF'
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start               # Start production server

# Testing
npm run lint            # Run ESLint
npx tsc --noEmit       # Check TypeScript
npm test               # Run tests (if configured)

# Analysis
npm run build && npx webpack-bundle-analyzer .next/static/chunks/main.js

# Verification
curl http://localhost:3000/robots.txt      # Check robots.txt
curl http://localhost:3000/sitemap.xml     # Check sitemap.xml
curl http://localhost:3000 | grep meta     # Check meta tags

# Environment
cat .env.local | grep NEXT_PUBLIC          # View public env vars

# Cleanup
rm -rf .next                                 # Clear build cache
rm -rf node_modules                          # Clear dependencies
npm install                                  # Reinstall dependencies
EOF

echo ""

# ============================================================================
# DOCUMENTATION REFERENCE
# ============================================================================

echo ""
echo "📚 DOCUMENTATION REFERENCE"
echo "============================================================================"

echo ""
echo "Implementation Guides:"
echo "  📖 IMPLEMENTATION_EXAMPLES.md"
echo "     - Page metadata patterns"
echo "     - Lazy loading examples"
echo "     - Image optimization"
echo ""
echo "  📖 SEO_PERFORMANCE_CHECKLIST.md"
echo "     - Implementation checklist"
echo "     - Testing procedures"
echo "     - Deployment guide"
echo ""
echo "  📖 ADVANCED_OPTIMIZATION_GUIDE.md"
echo "     - Middleware implementation"
echo "     - Data fetching strategies"
echo "     - Security & caching"
echo ""
echo "  📖 SEO_PERFORMANCE_SUMMARY.md"
echo "     - Overview of all changes"
echo "     - Next steps"
echo "     - Maintenance guide"
echo ""

# ============================================================================
# NEXT STEPS
# ============================================================================

echo ""
echo "🎯 NEXT STEPS"
echo "============================================================================"

echo ""
echo "1. Add Metadata to Pages"
echo "   - Use patterns from IMPLEMENTATION_EXAMPLES.md"
echo "   - Export metadata from each page component"
echo "   - Test with Lighthouse"
echo ""
echo "2. Implement Lazy Loading"
echo "   - Identify heavy components with bundle analyzer"
echo "   - Replace with dynamic imports"
echo "   - Add loading states and Suspense"
echo ""
echo "3. Test & Validate"
echo "   - Run Lighthouse audit"
echo "   - Check Core Web Vitals"
echo "   - Validate structured data"
echo ""
echo "4. Deploy & Monitor"
echo "   - Build production version"
echo "   - Deploy to hosting platform"
echo "   - Submit to search engines"
echo "   - Monitor performance metrics"
echo ""

# ============================================================================
# SUPPORT
# ============================================================================

echo ""
echo "❓ NEED HELP?"
echo "============================================================================"

echo ""
echo "Check these files for answers:"
echo "  - IMPLEMENTATION_EXAMPLES.md (How to implement)"
echo "  - SEO_PERFORMANCE_CHECKLIST.md (Testing & validation)"
echo "  - SEO_PERFORMANCE_SUMMARY.md (Overview & reference)"
echo ""
echo "Useful resources:"
echo "  - Next.js Docs: https://nextjs.org/docs"
echo "  - Google Search Central: https://developers.google.com/search"
echo "  - Web.dev: https://web.dev/performance/"
echo "  - MDN Web Docs: https://developer.mozilla.org/"
echo ""

echo ""
echo "============================================================================"
echo "✅ Setup complete! Review the documents and follow the next steps."
echo "============================================================================"
