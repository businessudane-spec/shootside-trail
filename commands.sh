# Initialize git repository
git init

# Stage all files
git add .

# Create initial commit
git commit -m "initial commit"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/shootside-trail.git

# Push to main branch
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
