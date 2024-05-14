# Backend avec NestJS et Prisma

Ce backend utilise NestJS comme framework, Prisma comme ORM pour interagir avec une base de données PostgreSQL, et inclut des fonctionnalités d'envoi de mails via Mailjet et de gestion des authentifications avec JWT.

## Prérequis

- Node.js (version 12.x ou supérieure)
- Un système de gestion de bases de données PostgreSQL
- Un gestionnaire de paquets npm
- Installer PostgreSQL
- Assurez vous que vous n'avez aucun programme lancé sur le port 5000 , vu que notre projet se lance sur le port 5000
- et le port de notre bdd est le 5432

## Installation

Suivez ces étapes pour configurer le projet localement.

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/ramyy220/Marzi_Travel_Planner
   cd Marzi_Travel_Planner
2. **instalation des dépendances :**
   ```bash
   npm install
   ou
   npm i 
3. **Créer un .env et mettre ça :**
   ```bash
   # Environment variables declared in this file are automatically made available to Prisma.
   # See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

   # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
   # See the documentation for all the connection string options: https://pris.ly/d/connection-strings

   DATABASE_URL="postgresql://postgres:root@localhost:5432/Travel_Planner?schema=public"
   MJ_APIKEY_PUBLIC ="d3538b55d75a94d38f5089b8090016c0"
   MJ_APIKEY_PRIVATE="7da756972aaf42849dedb3c125088a40"
   SECRET_KEY="secret"
   OTP_CODE="code"
4. **Lancement de l'application :**
   ```bash
   npm run start:dev
 
