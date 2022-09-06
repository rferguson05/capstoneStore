# Game On Online Store
## Contents
1. [About the site](#about-the-site)
2. [Basic Pages](#basic-pages)
3. [Catalogue](#catalogue) 
4. [Product Page](#product-page)
5. [Cart](#cart)

## About the site
This site is designed to show my developing skills in HTML, CSS, and JavaScript including using jQuery and JSON.
The site provides a semi functional online store for a fictional gaming store. 
There is a catalogue for displaying items with a quick add to cart function and also page for each product. 
All files have been extensively commented so the below is intended to give a quick user guide. 
## Using the Site
### Basic Pages
The site contains several simple pages which are mainly simple HTML and CSS with a small selection of Javascript. All pages make use of bootstrap, specifically the grid which allows for a scalable layout which will adjust to the screen size of the user. 
The more basic pages in the site are AboutUs.html, homePage.html, Shipping.html and packingPromise.html. 
All of these pages load OnlineStore.js which contains the basic functions of the page and in the case of homePage.html provides the function for the animated text. 

### Catalogue
In terms of HTML the catalogue page is a simple page with space for an image and some simple product details. 
The catalogue has it's own JavaScript file catalogue.js. This file allows the site owner to store the product details in an array. The items are stored as objects and can be created using the constructor. 
Once created the new item must be added to nintProductArray. Once this is done the new item will now be available on the gallery page. 
Below is an image of the catalogue page working for one of the items currently in stock at the store.
![screenshot of Catalogue page working](capstoneStore/catalogueWorking.png)
### Product Page
Product page takes the current item from the catalogue page, extracts the relevant information from the object within the array and uses this information to populate a new page. As long as the item has been added correctly as described above there is no need to alter this page when adding or removing an item. 
Below is an image of the product page working for one of the items currently in stock at the store.
![Screenshot showing prduct page working](capstoneStore/productPageWorking.png)
### Cart
The cart/checkout uses the localStorage to store and calculate then display the total cost. The js file checkout.js contains the ability to add and remove voucher codes. These codes can be added using the coupons object constructor. For this you need a code and the discount as a decimal. The object must then be added to couponsArr before it will go live on the site. 
The image below shows the cart in action including a working discount code and delivery option selected
![Screenshot showing the store cart with voucher code and total](capstoneStore/cartWorking.png)
