# parking_lot
Parking Lot assignment for Nas tech hackathon

### The DB
As per requirments, no db is used for this project. Instead, local variables using hashmap act as models. By default, index equivalent of db for this datastructure is considered the key i.e you can assume the db is only indexed at primary key

## Getting Started
### Option 1 using shell script
You can simply get the server up by running ./start.sh in termial in the dirrectory where project lies. This script will nuke the node_modules and clean install before getting the server up
### Option 2 Manual Steps
Open terminal and cd into the project dirrectory.
#### Installing dependencies
In project's root dirrectory run **npm i**
#### Starting the server
After installing dependencies in above step, in project's root dirrectory run **npm run start** to start the server and watch these changes.

### Useful Things

After getting the server up locally, app becomes available at: http://localhost:8000/
You can perform CRUD operations for cars and parking by using following routes with respective methods (Post, Put, Get, Delete)
{base_url}/api/v1/cars
{base_url}/api/v1/parking

You can also checkout swagger documentation while running the server locally at http://localhost:8000/api-docs/#/

##### Versions Used While Development
node v14.15.5
npm 6.14.11
