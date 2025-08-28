#!/bin/bash

# E-Raport Docker Management Script

case "$1" in
  start)
    echo "Starting E-Raport application..."
    docker-compose up -d
    echo "Application is starting. Access:"
    echo "  - Frontend: http://localhost:3000"
    echo "  - Backend API: http://localhost:8000"
    echo "  - Database: localhost:5432"
    ;;
  
  stop)
    echo "Stopping E-Raport application..."
    docker-compose down
    ;;
  
  restart)
    echo "Restarting E-Raport application..."
    docker-compose down
    docker-compose up -d
    ;;
  
  logs)
    docker-compose logs -f
    ;;
  
  status)
    docker-compose ps
    ;;
  
  db-migrate)
    echo "Running database migrations..."
    docker-compose exec backend npx prisma migrate deploy
    ;;
  
  db-seed)
    echo "Seeding database..."
    docker-compose exec backend npm run seed:kategori
    docker-compose exec backend npm run seed:profil
    ;;
  
  studio)
    echo "Starting Prisma Studio..."
    docker-compose --profile tools up prisma-studio -d
    echo "Prisma Studio available at: http://localhost:5555"
    ;;
  
  clean)
    echo "Cleaning up Docker resources..."
    docker-compose down -v
    docker system prune -f
    ;;
  
  build)
    echo "Building Docker images..."
    docker-compose build
    ;;
  
  *)
    echo "Usage: $0 {start|stop|restart|logs|status|db-migrate|db-seed|studio|clean|build}"
    echo ""
    echo "Commands:"
    echo "  start      - Start all services"
    echo "  stop       - Stop all services"
    echo "  restart    - Restart all services"
    echo "  logs       - Show logs from all services"
    echo "  status     - Show status of all services"
    echo "  db-migrate - Run database migrations"
    echo "  db-seed    - Seed the database with initial data"
    echo "  studio     - Start Prisma Studio for database management"
    echo "  clean      - Clean up all Docker resources"
    echo "  build      - Build all Docker images"
    exit 1
    ;;
esac
