# ManejoCadenasNode Project

## NSSM Deploy (Windows)
Link -> https://briancaos.wordpress.com/2022/12/01/run-node-js-on-windows-server-using-nssm/

nssm remove manejoCadenas \
nssm install manejoCadenas D:\zPublicados\ManejoCadenasNode\start.bat \
nssm set manejoCadenas AppDirectory D:\zPublicados\ManejoCadenasNode\ \
nssm set manejoCadenas AppStdout D:\zPublicados\ManejoCadenasNode\logfiles\out.txt \
nssm set manejoCadenas AppStderr D:\zPublicados\ManejoCadenasNode\logfiles\err.txt \
nssm start manejoCadenas