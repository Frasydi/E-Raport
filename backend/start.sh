#!/bin/sh

echo "Starting application setup..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Check if generation was successful
if [ $? -eq 0 ]; then
    echo "Prisma client generated successfully!"
else
    echo "Failed to generate Prisma client, but continuing..."
fi

# Start the application
echo "Starting the application..."
exec npm start
