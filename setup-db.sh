#!/bin/bash

# Database setup script
DB_NAME="notesapp"
DB_USER="postgres"

echo "========================================="
echo "PostgreSQL Database Setup"
echo "========================================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "Error: PostgreSQL is not installed"
    echo "Please install PostgreSQL and try again"
    exit 1
fi

echo "Creating database: $DB_NAME"
echo ""

# Create database
psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✓ Database created successfully"
else
    echo "Database might already exist or there was an error"
    echo "Trying to connect to existing database..."
    psql -U $DB_USER -d $DB_NAME -c "SELECT 1;" &>/dev/null
    if [ $? -eq 0 ]; then
        echo "✓ Database exists and is accessible"
    else
        echo "✗ Failed to create or connect to database"
        exit 1
    fi
fi

echo ""
echo "Database setup complete!"
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo ""
echo "You can now run: ./start.sh"
