# Homework

Welcome to Doug Gusick's Bonobos Homework assignment. 

## Build Instructions

1) Ensure Node (https://nodejs.org/en/download/) is installed 
2) Clone the files into your local environment
3) Navigate to the directory and run `npm install`
4) run `npm run start:server` to start the backend server
5) run `ng serve` to start 
6) navigate to http://localhost:4200

## Goal #1: load the product and inventory data into a database

In order to load the product and inventory data into the MongoDB database, I needed to run mongoimport from the commandline:
    
    1) mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-2khro.mongodb.net:27017,cluster0-shard-00-01-2khro.mongodb.net:27017,cluster0-shard-00-02-2khro.mongodb.net:27017 --ssl --username bonobos --password <PASSWORD> --authenticationDatabase admin --db bonobos --collection products --type csv --file products.csv

    2) mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-2khro.mongodb.net:27017,cluster0-shard-00-01-2khro.mongodb.net:27017,cluster0-shard-00-02-2khro.mongodb.net:27017 --ssl --username bonobos --password <PASSWORD> --authenticationDatabase admin --db bonobos --collection inventory --type csv --file inventory.csv

By running these two commands, I was able to create a databse (bonobos) on a MongoDB cluster (Cluster0), and import each .csv file into its own collection, named products and inventory respectively.


## Goal #2: make an HTTP api for the data

The next goal required me to make an HTTP api for the data in the MongoDB databse. I achieved this by using express, nodejs, and mongoose. 

In order to complete Goal #3, it was necessary to write two GET requests, one to retrieve the data from the products collection, and one to retreive the data from the inventory collection.

The GET request to retrieve the data from the products collection is very straight forward. I created a Products schema using mongoose that contains the product_id, product_name, product_image, and product_description properties.

The GET request to retrieve the data from the inventoy collection was a little more nuanced. Similar to the previous GET request, I created a schema using mongoose that contains the product_id, waist, length, style, and count properties. The difference here is that I didn't want to just return all of the entries in the inventory collection, but rather the unique counts for a given product_id, waist, length, and style. I did this by aggregating the results, matching on a product_id that was passed in throught the API call, grouping on waist, length, and style, and calling a count on the sum of the resulting inventory count. For each product_id passed, I would get in return the unique counts for a given waist, length, and style.

## Goal #3: make a webpage that displays the data

Now that the API calls are in place, I needed to create a webpage to display the information. To do this, I created two components, Product and Inventory. 

The Product component is straight forward. Using a service to get the product data from the database (using the previously mentioned GET request) into a product model, I looped through each of the four products, displaying the Product Name, Description, and Image for each. Below each image, is the Inventory component, for which I passed each product's product_id into.

The Inventory component starts by consuming the product_id from the Product component. Taking this product_id, a call to the Inventory GET request was made ('/api/inventory/:productId), which returns a list of the unique counts for a given waist, length, and style. After the list is fetched, a uniqueStyles map, uniqueMeasurements map (where a measurement is a string value of waistxlength), and inventoryMap are populated. These maps are used to populate the column headers (styles), row headers (measurements), and the table data (inventory).

The resulting page displays the Product and Inventory information for each product in the Product table.