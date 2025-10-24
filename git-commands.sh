# Initialize repository
git init

# Add all files to staging
git add .

# Initial commit
git commit -m "initial commit: project setup"

# Add your remote repository (replace with your actual repository URL)
git remote add origin https://github.com/yourusername/shootside-trail.git

# Create and switch to feature branch
git checkout -b feature/supabase-setup

# Push to remote (use -u to set upstream)
git push -u origin feature/supabase-setup
