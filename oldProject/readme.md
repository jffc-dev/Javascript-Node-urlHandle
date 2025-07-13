# ManejoCadenasNode Project

## NSSM Deploy (Windows)
Link -> https://briancaos.wordpress.com/2022/12/01/run-node-js-on-windows-server-using-nssm/

nssm remove manejoCadenas \
nssm install manejoCadenas G:\zPublicados\ManejoCadenasNode\start.bat \
nssm set manejoCadenas AppDirectory G:\zPublicados\ManejoCadenasNode\ \
nssm set manejoCadenas AppStdout G:\zPublicados\ManejoCadenasNode\logfiles\out.txt \
nssm set manejoCadenas AppStderr G:\zPublicados\ManejoCadenasNode\logfiles\err.txt \
nssm start manejoCadenas


## Git ignore future changes
git update-index --skip-worktree [filename]
git update-index --no-skip-worktree [filename]