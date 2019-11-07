# https://stackoverflow.com/questions/61212/how-to-remove-local-untracked-files-from-the-current-git-working-tree
# https://medium.com/@panjeh/how-to-revert-git-uncommitted-changes-including-files-and-folders-731a1fdbd983

git clean -fd
git checkout -- .