#!/bin/bash

# Debug script to check what's running on the production server
echo "🔍 Debugging production server..."

# Check if PM2 is running
if command -v pm2 >/dev/null 2>&1; then
    echo "✅ PM2 is installed"
    
    # List all PM2 processes
    echo "📋 PM2 processes:"
    pm2 list
    
    # Check if our SSR process is running
    if pm2 describe dawahnigeria-ssr >/dev/null 2>&1; then
        echo "✅ dawahnigeria-ssr process exists"
        
        # Get process details
        echo "📊 Process details:"
        pm2 show dawahnigeria-ssr
        
        # Check the script path
        SCRIPT_PATH=$(pm2 show dawahnigeria-ssr | grep "script" | awk '{print $2}')
        echo "📁 Script path: $SCRIPT_PATH"
        
        # Check if the script file exists
        if [ -f "$SCRIPT_PATH" ]; then
            echo "✅ Script file exists"
            
            # Check what type of server it is
            if grep -q "Full SSR Server with React 19 running" "$SCRIPT_PATH"; then
                echo "✅ This is the SSR server"
            elif grep -q "React 19 Server running" "$SCRIPT_PATH"; then
                echo "❌ This is the simple server (not SSR)"
                echo "🔄 Restarting with correct SSR server..."
                pm2 stop dawahnigeria-ssr
                pm2 delete dawahnigeria-ssr
                pm2 start "/var/www/dawahnig-live/server/ssr.js" --name dawahnigeria-ssr --time
                pm2 save
            else
                echo "❓ Unknown server type"
            fi
        else
            echo "❌ Script file does not exist: $SCRIPT_PATH"
        fi
    else
        echo "❌ dawahnigeria-ssr process not found"
        echo "🔄 Starting SSR server..."
        pm2 start "/var/www/dawahnig-live/server/ssr.js" --name dawahnigeria-ssr --time
        pm2 save
    fi
else
    echo "❌ PM2 is not installed"
fi

# Check server files
echo "📁 Checking server files:"
ls -la /var/www/dawahnig-live/server/

# Test health endpoint
echo "🏥 Testing health endpoint:"
curl -s http://127.0.0.1:3000/health || echo "❌ Health check failed"

echo "✅ Debug complete"
