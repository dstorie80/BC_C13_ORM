# BC_C13_ORM
Learning how to use sequelize in junction with mysql to add data into the a database  

## Description

This project was created to get a better understanding of MySQL and accessing queries from within the console.

- The project was an aid to help us understand MySQL, using inquirer to run custom queries, create a database with tables, access those tables from questions within the inquirer.
- Only one index.js file was created, but two sql files were created.  A schema.sql to create the database and tables from scratch, and then a seed.sql file to populate the tables with data.




## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To pull the rep files:
1. Go to my git hub repo (https://github.com/dstorie80/BC_C13_ORM) 
2. Click on the code button and select SSH
3. Navigate git bash to a designated folder of your chosing (CD <filepath/> [if a new folder needs to be created, you can use the mkdir command in git bash])
4. Pull the latest update from git using the clone command in git bash (git clone <repo url>)
5. Once the repo has been downloaded into the folder, you can use open vs code (code . in git bash) to open the files from the repo
6. The Main project video can be found here: https://watch.screencastify.com/v/sJMzdTR5aKPbmcPnyECX



## Usage

No website was used for this project. All data is called from the server.js file calline npm start in the terminal window. 

To access the latest repo you will need to follow this github rep link - https://github.com/dstorie80/BC_C13_ORM.git

Opening the project in vscode, we will need to prepare the database.  To start this we begin by opening a termianl window inside vscode and entering the command mysql -u and enter the username and then -p password.

Once inside MYSQL we need to create the database using the provided schema located in the db folder (db/schema). We do this by entering source db/schema.sql; on the command line and hitting enter on the keyboard.  This will create the new db (ecommerce_db)

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/ec8bf974-868d-4e8b-ad94-4367ef1d140c)

Here we need to check that the .env contains the correct data (the DB_USER and DB_PASSWORD have been blacked out for security)

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/3ff4a353-9226-4a09-9768-9c0d24334905)

After veryifing the .env, we need to populate the database with tables and data.  We do this by using the node seeds command in the terminal in vscode (node seeds)

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/3237296f-ccf4-4ca2-a111-ec3424134de2)

Next we verify the sequelize setup is correct by going into the config -> and then connection.js files 

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/c432197a-105b-4e30-abd3-a945eab9dd32)

Once the database, tables and data have been setup we can run npm start to start the local server and bring up Insomnia to run http requests.  

For this part of the readme I will show several calls:

1. Get all products (get)
2. Get a single product (get)
3. Get all categories (get)
4. Get all tags (get)
5. Add a product to the product category (post)
6. Delete a product (delete/destroy)
7. Updating a product (put)

1. Running a get call (http://localhost:3001/api/products) we get the full list of products.  This includes any associated categories or tags the product is associated with.

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/00ea12fa-a2b9-463d-935e-349c6737b3ff)

2. Running a get call (http://localhost:3001/api/products/#) will get the product, associated category, and associated tags with the product number.

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/98aa1b1b-16c3-4a60-825e-f60ebfb5b820)

3. Running a get call (http://localhost:3001/api/categories) will provide a list of the product categories and their associated tags.
   
![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/7cb8479b-9c70-4c65-a291-70ee165f3800)

4. Running a get call (http://localhost:3001/api/tags) will provide a list of product tags and the products that are associated with the tags.

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/8f2c7cc1-d3be-428d-bd79-81625a15603c)

5. Running a post call (http://localhost:3001/api/products) will allow the user to create a new product.  This requires that the user add product_name, price, stock, category_id, and tagIds (this is an array allowing the user to add multiple tags to a product)

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/6e5d09e3-1ff4-408c-9bab-151762c0f6d6)

6. Running a delete (destroy) call will allow a user to delete an item from the products, tags or category tables.  In this example I have elected to remove an item from the products table (http://localhost:3001/api/products/#) this requires the product_Id which
   can be obtained from running the get all products call (get http://localhost:3001/api/products) from the first example.

   Once an Id has been chosen, i can replace the # at the end of the URL (http://localhost:3001/api/products/#) and send the call.  If the 200 message is given a display on the right hand side will say 1 meaning the item has been deleted.

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/d37fe380-c56f-4aea-9aef-5d71345b64d6)

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/abcb50c7-2542-4ebd-8cda-8b80da207418)

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/161df32b-bfed-462d-b443-f1a43a3f6632)

  If for some reason an item not in the table is attempting to be deleted, the user will be presented with a 404 error and a message that the item doesn't exist. 

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/231303c1-492b-4800-ba9f-e3a7f892ea2f)

7. Running a put call will allow a user to update a value from the products, tags or category tables.  In this example I have elected to update an item price from the products table (http://localhost:3001/api/products/#) this requires the product_Id which
   can be obtained from running the get all products call (get http://localhost:3001/api/products) from the first example. This will also require that I enter the item I wish to update (in this case price) and its new value in the body of the call.

   Once an Id has been chosen, I can replace the # at the end of the URL (http://localhost:3001/api/products/#) and send the call.  If the 200 message is given a display on the right hand side will say 1 meaning the item has been updated.

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/bfd265b6-93eb-4831-a88a-77107fb4c52b)

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/81a76f9e-07fc-4a66-83a7-fc2084fb153d)

![image](https://github.com/dstorie80/BC_C13_ORM/assets/149905416/cc4dc4c9-4c6a-475b-9186-d531ef9f7967)


## Credits

## License

No license used 
