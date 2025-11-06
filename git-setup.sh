# Create and switch to a new branch
git checkout -b feature/supabase-setup

# Add your changes
git add lib/supabaseClient.ts

# Commit the changes
git commit -m "feat: add supabase client with fallback support"

# Push the new branch to remote
git push -u origin feature/supabase-setup
