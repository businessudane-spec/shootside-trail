# Update Git global config
git config --global user.name "businessudane-spec"
git config --global user.email "business.udane@gmail.com"

# Clear existing credentials (Windows)
cmdkey /delete:LegacyGeneric:git:https://github.com

# Initialize repository
git init

# Add all files to staging
git add .

# Initial commit
git commit -m "initial commit: project setup"

# Remove and re-add remote with new account
git remote remove origin
git remote add origin https://businessudane-spec@github.com/businessudane-spec/shootside-trail.git

# Create and switch to feature branch
git checkout -b feature/supabase-setup

# Push to remote (use -u to set upstream)
git push -u origin feature/supabase-setup

# Set your username
git config --global user.name "businessudane-spec"

# Set your email
git config --global user.email "business.udane@gmail.com"

# Verify changes
git config --list
