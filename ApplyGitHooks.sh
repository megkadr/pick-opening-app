#!/bin/bash
GREEN='\033[0;32m' # Green
NC='\033[0m' # No Color

# Remove all files from ./.git/hooks/ directory
echo -e "Removing existing files from ${GREEN}./.git/hooks/${NC} directory.."
shopt -s extglob
rm -f ./.git/hooks/*

# Create 'pre-commit'
echo -e "Creating ${GREEN}pre-commit${NC} file.."
echo -n "" > "./.git/hooks/pre-commit"
echo -e "#!/bin/bash\n\nFILES=\$(git diff --cached --name-only --diff-filter=ACM \"*.cs\")\nif [ -n \"\$FILES\" ]\nthen\n\tdotnet format --no-restore --include \$FILES\n\techo \"\$FILES\" | xargs git add\nfi" >> "./.git/hooks/pre-commit"

echo -e "Adding executable permissions to files in ${GREEN}./.git/hooks/${NC} directory.."
chmod +x ./.git/hooks/*

echo -e "${GREEN}Script execution completed.${NC}"