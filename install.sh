#!/bin/bash

# Colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to display messages
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Function to display success messages
print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Function to display error messages
print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check and install system dependencies
install_dependencies() {
    print_message "Installing system dependencies..."
    
    # Update package list
    sudo apt-get update
    
    # Install required packages
    sudo apt-get install -y \
        curl \
        build-essential \
        python3 \
        make \
        g++ \
        git
        
    # Install Node.js 20.x
    if ! command -v node &> /dev/null; then
        print_message "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
        
        # Verify installation
        node --version
        npm --version
    fi
}

# Function to check and install Docker
install_docker() {
    if ! command -v docker &> /dev/null; then
        print_message "Docker not found. Installing..."
        
        # Remove old versions
        sudo apt-get remove -y docker docker-engine docker.io containerd runc || true
        
        # Install dependencies
        sudo apt-get install -y \
            apt-transport-https \
            ca-certificates \
            curl \
            gnupg \
            lsb-release

        # Add Docker's official GPG key
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

        # Set up stable repository
        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
          $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

        # Update and install Docker
        sudo apt-get update
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

        # Start and enable Docker
        sudo systemctl start docker
        sudo systemctl enable docker

        # Add current user to docker group
        sudo usermod -aG docker $USER
        
        print_success "Docker installed successfully!"
    else
        print_message "Docker is already installed"
    fi
}

# Function to check if Docker is running
check_docker_status() {
    if ! systemctl is-active --quiet docker; then
        print_message "Docker is not running. Starting..."
        sudo systemctl start docker
        if ! systemctl is-active --quiet docker; then
            print_error "Failed to start Docker. Checking installation..."
            install_docker
        fi
    fi
}

# Function to install the system
install_system() {
    print_message "Starting installation process..."

    # Check sudo privileges
    if ! sudo -v; then
        print_error "Sudo privileges are required for installation"
        exit 1
    fi

    # Install system dependencies
    install_dependencies

    # Install Docker
    install_docker

    # Create configuration
    print_message "Configuring the system..."
    
    # Database configuration
    read -p "Enter PostgreSQL password: " DB_PASSWORD
    read -p "Enter JWT secret key: " JWT_SECRET
    
    # UniFi Controller configuration
    read -p "Enter UniFi Controller URL (e.g., https://192.168.1.1:8443): " UNIFI_URL
    read -p "Enter UniFi Controller username: " UNIFI_USER
    read -p "Enter UniFi Controller password: " UNIFI_PASS

    # Create .env file
    cat > .env << EOF
DB_PASSWORD=$DB_PASSWORD
JWT_SECRET=$JWT_SECRET
UNIFI_CONTROLLER_URL=$UNIFI_URL
UNIFI_USERNAME=$UNIFI_USER
UNIFI_PASSWORD=$UNIFI_PASS
EOF

    # Build and start services
    print_message "Building and starting services..."
    sudo docker compose build --no-cache
    sudo docker compose up -d

    print_success "Installation completed successfully!"
    print_message "Access the portal at http://$(hostname -I | awk '{print $1}')"
    print_message "Default admin credentials:"
    print_message "Email: admin@example.com"
    print_message "Password: admin123"
    print_message "IMPORTANT: Change the password on first login!"
}

# Function to update the system
update_system() {
    print_message "Updating system..."
    
    # Backup before update
    print_message "Creating backup..."
    sudo docker compose exec db pg_dump -U hotspotuser hotspotdb > backup_$(date +%Y%m%d_%H%M%S).sql
    
    # Update images
    sudo docker compose pull
    
    # Restart services
    sudo docker compose down
    sudo docker compose up -d
    
    print_success "Update completed successfully!"
}

# Function to remove the system
remove_system() {
    print_message "Removing system..."
    
    read -p "Do you want to remove all data including database? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        sudo docker compose down -v
        print_success "System and data removed successfully!"
    else
        sudo docker compose down
        print_success "System removed but data volumes preserved!"
    fi
}

# Main menu
while true; do
    echo -e "\n${BLUE}=== UniFi Hotspot Portal - Management ===${NC}"
    echo "1. Install system"
    echo "2. Update system"
    echo "3. Remove system"
    echo "4. Exit"
    
    read -p "Choose an option (1-4): " choice
    
    case $choice in
        1)
            install_system
            ;;
        2)
            check_docker_status
            update_system
            ;;
        3)
            check_docker_status
            remove_system
            ;;
        4)
            print_message "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid option"
            ;;
    esac
done