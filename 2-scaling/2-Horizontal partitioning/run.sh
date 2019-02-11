#/bin/bash
./remove.sh
echo "Starting instances";
pm2 start app.js -i -1
echo "Instances started";

echo "Running requests (300) for checking clusters";
loadtest -n 300 http://localhost:3000/
echo "Tests ran";

echo "Check logs >> pm2-logs.txt (Ctrl + C)";
pm2 logs >> pm2-logs.txt