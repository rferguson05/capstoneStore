$(document).ready(function () { //runs everything within the curly braces when the page has loaded
    //creates a function which can be used to cycle through the images for nintento products. 
    function nintendoProducts(name, desc, color, price, quantity, img) {
        this.productName = name;
        this.description = desc;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
    }
    //creates an object for each product that we have. 
    let GBCBlackSeeThrough = new nintendoProducts("Game Boy Pocket", "Released in 1996 as a redesign of the hugely successful Game Boy. The Game Boy Pocket introduced a smaller form factor which was, funnily, more suitable for carrying in pockets.This color scheme is not one of the original release and followed at a later date", "Black", 59.99, 5, "Images/CatalogueImages/Nintendo/GBBlackSeethrough.jpg");
    let GBCTeal = new nintendoProducts("Game Boy Color", "Released in 1998 as a successor of the hugely successful Game Boy the Game Boy Color introduced a smaller handheld with a screen capable of producing colors.", "Teal", 49.99, 3, "Images/CatalogueImages/Nintendo/GBCTeal.jpg");
    let GBCPurple = new nintendoProducts("Game Boy Color", "Released in 1998 as a successor of the hugely successful Game Boy the Game Boy Color introduced a smaller handheld with a screen capable of producing colors.", "Purple", 49.99, 5, "Images/CatalogueImages/Nintendo/GBCPurple.jpg");
    let GBCYellow = new nintendoProducts("Game Boy Color", "Released in 1998 as a successor of the hugely successful Game Boy the Game Boy Color introduced a smaller handheld with a screen capable of producing colors.", "Yellow", 49.99, 7, "Images/CatalogueImages/Nintendo/GBCYellow.jpg");
    let safebuster = new nintendoProducts("Safebuster", "A multi-screen Game & Watch game released in 1988. Only released in western markets this is a must for any collector.", "", 99.99, 1, "Images/CatalogueImages/Nintendo/safebuster.jpg");
    //creates an array of those products.
    let nintProductArray = [GBCBlackSeeThrough, GBCPurple, GBCYellow, GBCTeal, safebuster];
//An array of product images from nintendo. 
let nintClickCount = 0; //sets the click count to 0. This will be used to help loop through the images. Acting like an index    
localStorage.setItem("moreNintDetails",JSON.stringify(nintProductArray[nintClickCount]));
function nintendoProductImages() {
        
        $("#nintendoProducts").html('<img src="'+nintProductArray[nintClickCount].img +'" id="nintProductImgs" class="productImg">'); //creates an img element and adds it to the display section. Also sets the attributes of the img. 
        $("#nintProductInfo").html(nintProductArray[nintClickCount].productName +"<br> Price: £"+nintProductArray[nintClickCount].price);
        $("#nintendoLeft, #nintendoRight").click(function () { //calls a function if id nintendoLeft or nintendoRight is clicked.
            if (this.id == "nintendoLeft" && nintClickCount < nintProductArray.length - 1) { //if the element click has the id stated AND the nintClickCount is less than the length of the array-1 them perform the following. 
                $("#nintProductImgs").attr("src", nintProductArray[nintClickCount + 1].img); //set the image source as the next image in the array
                $("#nintProductInfo").html(nintProductArray[nintClickCount+1].productName +"<br> Price: £"+nintProductArray[nintClickCount+1].price);
                nintClickCount++; //add 1 on to the click count. 

            } else if (this.id == "nintendoRight" && nintClickCount < nintProductArray.length && nintClickCount > 0) { //if the elemnt clicked has the id stated and nintClickCount is less than the length of the array AND nintClickCount is greater than 0
                $("#nintProductImgs").attr("src", nintProductArray[nintClickCount - 1].img); //set the image as the PREVIOUS image in the array
                $("#nintProductInfo").html(nintProductArray[nintClickCount-1].productName +"<br> Price: £"+nintProductArray[nintClickCount-1].price);
                nintClickCount--; //decrease nintClickCount by 1
            } else if (this.id == "nintendoRight" && nintClickCount == 0) { //else if element has id shown AND click count is 0
                nintClickCount = nintProductArray.length - 1; //set nintClickCount to the length of the array-1
                $("#nintProductImgs").attr("src", nintProductArray[nintClickCount].img); //change the image to be the array element at the index produced above. This will result in the last item being displayed. 
                $("#nintProductInfo").html(nintProductArray[nintClickCount].productName +"<br> Price: £"+nintProductArray[nintClickCount].price);
            } else {
                nintClickCount = 0; //set click count to 0 
                $("#nintProductImgs").attr("src", nintProductArray[nintClickCount].img); //display image at index 0. 
                $("#nintProductInfo").html(nintProductArray[nintClickCount].productName +"<br> Price: £"+nintProductArray[nintClickCount].price);
            }
            console.log(nintClickCount);
             //the details for the currently displayed product are saved to local storage 
            localStorage.setItem("moreNintDetails",JSON.stringify(nintProductArray[nintClickCount]));
        });
    }
    //calls the above function. 
    nintendoProductImages();
   
    
    //opens a product page based on the current product when the more info button is clicked
    $("#nintMoreBtn").click(function(){
        window.open("productPage.html","_self"); //opens the specified html page within the same tab. Sources: https://stackoverflow.com/questions/13071967/adding-an-onclick-function-to-go-to-url-in-javascript https://stackoverflow.com/questions/8454510/open-url-in-same-window-and-in-same-tab
    });

    //adding functionality to the quick add to cart button

    
});