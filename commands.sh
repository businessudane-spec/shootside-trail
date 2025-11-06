# Initialize git repository
git init

# Stage all files
git add .

# Create initial commit
git commit -m "initial commit"

# Remove existing remote
git remote remove origin

# Add new remote with correct credentials
git remote add origin https://businessudane-spec@github.com/businessudane-spec/shootside-trail.git

# Verify remote
git remote -v

# Push to main (you'll be prompted for GitHub password or token)
git push -u origin main

# Remove old email
git config --global --unset user.email

# Set new email
git config --global user.email "business.udane@gmail.com"

# Verify the change
git config --global user.email

# Remove old username
git config --global --unset user.name

# Set new username
git config --global user.name "businessudane-spec"

# Verify the changes
git config --global user.name
