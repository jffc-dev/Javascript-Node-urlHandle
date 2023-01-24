# ManejoCadenasNode Project

## NSSM Deploy (Windows)
nssm remove manejoCadenas \
nssm install manejoCadenas D:\Node\manejoCadenas\start.bat \
nssm set manejoCadenas AppDirectory D:\Node\manejoCadenas\ \
nssm set manejoCadenas AppStdout \ D:\Node\manejoCadenas\logfiles\out.txt \
nssm set manejoCadenas AppStderr \ D:\Node\manejoCadenas\logfiles\err.txt \
nssm start manejoCadenas