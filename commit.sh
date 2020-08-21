git add .
printf "\n====================== stage changes =============================\n\n"
git status
printf "\n====================== committing changes ========================\n\n"
git commit -m "$1"
printf "commit with $1"
printf "\n=================== merged master to dev =========================\n\n"
git checkout master && git merge dev
printf "\n====================== merged changes ============================\n\n"
git push
printf "\n====================== pushed changes ============================\n\n"
git checkout dev
printf "\nAll Done!!\n\n"
