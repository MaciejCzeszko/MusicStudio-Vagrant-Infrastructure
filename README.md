#MusicStudio Vagrant Infrastructure

Infrastructure project for running the MusicStudio application on three separate virtual machines.

This project simulates a simple multi-tier infrastructure where the frontend, backend, and database are deployed independently.

Architecture
                        Host Machine
                             │
                             │
                  Vagrant + VirtualBox
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
 ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
 │ Frontend VM │      │ Backend VM  │      │ Database VM │
 │             │      │             │      │             │
 │   Docker    │────▶│   Docker    │─────▶│   Docker    │
 │             │ HTTP │             │ SQL  │ PostgreSQL  │
 │ React/Vite  │      │ Backend/Node│      │             │
 └─────────────┘      └─────────────┘      └─────────────┘
  192.168.56.101       192.168.56.102       192.168.56.103

Project Goal

The goal of this project is to practice infrastructure and DevOps concepts by deploying an existing application across multiple virtual machines.

Each VM:

Runs Ubuntu.
Is created using Vagrant and VirtualBox.
Has Docker installed.
Contains the MusicStudio application repository.
Runs only the Docker component assigned to that machine.

The application code is not split between repositories. The same MusicStudio repository is available on every virtual machine, but each VM starts only its assigned service.

Virtual Machines
VM	      IP Address	    Service
frontend	192.168.56.101	React/Vite frontend
backend	  192.168.56.102	Backend API
database	192.168.56.103	PostgreSQL

Technologies
- Vagrant
- VirtualBox
- Ubuntu
- Docker
- Docker Compose
- PostgreSQL
- React / Vite
- Backend API

Prerequisites

Before running the project, install:

- VirtualBox
- Vagrant
- Git

Getting Started

Enter the project directory:

cd musicstudio-vagrant-infrastructure

Start all virtual machines:

  vagrant up

Vagrant will create:

  frontend
  backend
  database

Accessing the Virtual Machines

Connect to the frontend VM:

  vagrant ssh frontend

Connect to the backend VM:

  vagrant ssh backend

Connect to the database VM:

  vagrant ssh database

  Service Communication

The services communicate through the Vagrant private network.

Frontend → Backend

The frontend communicates with the backend using:

http://192.168.56.11

Backend → Database

The backend communicates with PostgreSQL using:

192.168.56.12:5432

Author

Maciej Czeszko
