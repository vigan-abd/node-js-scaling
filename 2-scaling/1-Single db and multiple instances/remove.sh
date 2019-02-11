#/bin/bash
echo "Clearing existing instances";
pm2 stop all
pm2 uninstall all
pm2 delete all
unlink pm2-logs.txt