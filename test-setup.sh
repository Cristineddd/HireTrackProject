#!/bin/bash

echo "🧪 HireTrack - API Integration Test"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Firebase is still installed
echo "1️⃣  Checking Firebase installation..."
if npm list firebase 2>&1 | grep -q "firebase@"; then
    echo -e "${YELLOW}⚠️  Firebase is still installed${NC}"
    echo "   Run: npm uninstall firebase"
else
    echo -e "${GREEN}✅ Firebase is not installed${NC}"
fi
echo ""

# Check for Firebase imports
echo "2️⃣  Checking for Firebase imports in code..."
FIREBASE_IMPORTS=$(grep -r "from '@/lib/firebase" app/ --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "Binary file" | wc -l)
if [ "$FIREBASE_IMPORTS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Found $FIREBASE_IMPORTS Firebase imports${NC}"
    echo "   Files using Firebase:"
    grep -r "from '@/lib/firebase" app/ --include="*.tsx" --include="*.ts" 2>/dev/null | cut -d: -f1 | sort | uniq | head -5
else
    echo -e "${GREEN}✅ No Firebase imports in app/ directory${NC}"
fi
echo ""

# Check if .env.local exists
echo "3️⃣  Checking environment configuration..."
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local exists${NC}"
    if grep -q "NEXT_PUBLIC_API_URL" .env.local; then
        echo "   API URL configured"
    else
        echo -e "${YELLOW}⚠️  NEXT_PUBLIC_API_URL not found${NC}"
    fi
else
    echo -e "${RED}❌ .env.local not found${NC}"
    echo "   Run: cp .env.example .env.local"
fi
echo ""

# Check if API routes exist
echo "4️⃣  Checking API routes..."
API_ROUTES=("app/api/auth/register/route.ts" "app/api/auth/login/route.ts" "app/api/auth/reset-password/route.ts")
for route in "${API_ROUTES[@]}"; do
    if [ -f "$route" ]; then
        echo -e "${GREEN}✅${NC} $route"
    else
        echo -e "${RED}❌${NC} $route (missing)"
    fi
done
echo ""

# Check if node_modules exists
echo "5️⃣  Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules exists${NC}"
else
    echo -e "${RED}❌ node_modules not found${NC}"
    echo "   Run: npm install"
fi
echo ""

# Check if dev server is running
echo "6️⃣  Checking development server..."
if lsof -i :3000 >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Server is running on port 3000${NC}"
    echo "   Visit: http://localhost:3000"
else
    echo -e "${YELLOW}⚠️  Server is not running${NC}"
    echo "   Run: npm run dev"
fi
echo ""

# Summary
echo "===================================="
echo "📋 Quick Test Steps:"
echo "===================================="
echo "1. Start server: npm run dev"
echo "2. Visit: http://localhost:3000/auth/signup"
echo "3. Fill the form and click 'Create Account'"
echo "4. Open browser console (F12) to see API requests"
echo ""
echo "Expected without backend API:"
echo "- Form validation works ✅"
echo "- Shows error message (API not configured) ⚠️"
echo "- Network tab shows POST to /api/auth/register ✅"
echo ""
echo "See TESTING_GUIDE.md for detailed testing instructions"
echo ""
