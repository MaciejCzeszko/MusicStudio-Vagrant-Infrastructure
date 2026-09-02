Vagrant.configure("2") do |config|

    # VM 1 - Frontend
    config.vm.define "frontend" do |frontend|
      frontend.vm.box = "ubuntu/jammy64"
      frontend.vm.hostname = "frontend"

    frontend.vm.network "private_network", ip: "192.168.56.101"

    frontend.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
      vb.cpus = 1
    end

    frontend.vm.synced_folder ".", "/home/vagrant/app"

    frontend.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y docker.io docker-compose-v2 git

      usermod -aG docker vagrant

      cd /home/vagrant/app/MusicStudio
      docker compose -f docker-compose.frontend.yml up -d --build
    SHELL
  end

    # VM 2 - Backend
    config.vm.define "backend" do |backend|
      backend.vm.box = "ubuntu/jammy64"
      backend.vm.hostname = "backend"

    backend.vm.network "private_network", ip: "192.168.56.102"

    backend.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
      vb.cpus = 1
    end

    backend.vm.synced_folder ".", "/home/vagrant/app"

    backend.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y docker.io docker-compose-v2 git

      usermod -aG docker vagrant

      cd /home/vagrant/app/MusicStudio
      docker compose -f docker-compose.backend.yml up -d --build
    SHELL
  end

    # VM 3 - Database
    config.vm.define "database" do |database|
      database.vm.box = "ubuntu/jammy64"
      database.vm.hostname = "database"

    database.vm.network "private_network", ip: "192.168.56.103"

    database.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
      vb.cpus = 1
    end

    database.vm.synced_folder ".", "/home/vagrant/app"

    database.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y docker.io docker-compose-v2 git

      usermod -aG docker vagrant

      cd /home/vagrant/app/MusicStudio
      docker compose -f docker-compose.database.yml up -d --build
    SHELL
  end

end
