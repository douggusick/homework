# Homework

Welcome to Doug Gusick's Bonobos Homework assignment. 

## Build Instructions

1) Ensure NodeJS (https://nodejs.org/en/download/) is installed 
2) Clone the files to a local directory
3) Navigate to the directory and run `npm install`
4) run `npm run start:server` to start the backend server
5) run `ng serve` to start the application
6) navigate to http://localhost:4200

## Goal #1: load the product and inventory data into a database

In order to load the product and inventory data into the MongoDB database, I ran mongoimport from the commandline:
    
    1) mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-2khro.mongodb.net:27017,cluster0-shard-00-01-2khro.mongodb.net:27017,cluster0-shard-00-02-2khro.mongodb.net:27017 --ssl --username bonobos --password <PASSWORD> --authenticationDatabase admin --db bonobos --collection products --type csv --file products.csv

    2) mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-2khro.mongodb.net:27017,cluster0-shard-00-01-2khro.mongodb.net:27017,cluster0-shard-00-02-2khro.mongodb.net:27017 --ssl --username bonobos --password <PASSWORD> --authenticationDatabase admin --db bonobos --collection inventory --type csv --file inventory.csv

By running these two commands, I was able to create a database (bonobos) on a MongoDB cluster (Cluster0), and import each .csv file into its own collection: products and inventory respectively.


## Goal #2: make an HTTP api for the data

The next goal required me to make an HTTP api for the data in the MongoDB databse. I achieved this by using express, nodejs, and mongoose. 

In order to complete Goal #3, it was necessary to write two GET requests, one to retrieve the data from the products collection, and one to retreive the data from the inventory collection.

The GET request to retrieve the data from the products collection, returns a JSON message containing the product information for each product. I created a Products schema using mongoose that contains the product_id, product_name, product_image, and product_description properties.

Test GET products:
- run `curl localhost:3000/api/products`

The GET request to retrieve the data from the inventoy collection uses `find({ product_id: req.params.productId })` to match the given productId to the product_id in the database, returning the inventory information for that product (count for each waist, length, and style combination).

Test GET Inventory:
- run `curl localhost:3000/api/inventory/1`
- run `curl localhost:3000/api/inventory/2`
- run `curl localhost:3000/api/inventory/3`
- run `curl localhost:3000/api/inventory/4`
    

## Goal #3: make a webpage that displays the data

Now that the API calls are in place, I needed to create a webpage to display the information. To do this, I created two Angular components: Product and Inventory. 

The Product component is straight forward. Using a service to get the product data from the database (using the previously mentioned GET request) into a product model, I looped through each of the four products, displaying the Product Name, Description, and Image for each. Below each image, is the Inventory component, for which I passed each product's product_id into.

The Inventory component starts by consuming the product_id from the Product component. Taking this product_id, a call to the Inventory GET request was made ('/api/inventory/:productId'), returning the list of unique counts for a given productId, waist, length, and style. After the list is fetched, a uniqueStyles map, uniqueMeasurements map (where a measurement is a string value of waistxlength), and inventoryMap are populated. These maps are used to populate the column headers (styles), row headers (measurements), and the table data (inventory).

The resulting page displays the Product and Inventory information for each product in the Product table.

## Improvements in the future

1) Add error handling
2) Ability to add and remove inventory
3) Ability to filter styles and measurements
4) Ability to sort data
5) Search functionality
6) Notifications when inventory gets too low
7) Add total inventory for each style and fit
8) Improve look and feel 