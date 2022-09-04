$(document).ready(function () {
    if(localStorage.getItem("cart")===null){
        let cart=[];
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    $(".dropDownList").hide();
    $(".dropDownSource").click(function (e) {
        e.preventDefault();
        if ($(this).next().hasClass('show')) { //if the next sibling of the element in question has the class show
            $(this).next().removeClass('show'); //remove the show class
            $(this).next().slideUp(500); //slide the element up over a time of .5 seconds
        } else {
            $(this).parent().parent().find('li .dropDownList').removeClass('show'); //within the grandparent element of the selected element select the child with tag li and class inner. Remove the show class.
            $(this).parent().parent().find('li .dropDownList').slideUp(500); //slide same element as mentioned above up over a period of .5 seconds
            $(this).next().toggleClass('show'); //apply the show class to the next element from the selected element. 
            $(this).next().slideDown(500);
        }
    });
    //This function will allow me to have buttons on the site which can be used to hide and show elements. Elements with the class .hideShow are hidden by default using this code.  
    $(".hideShow").hide();
    $(".hideBtn").click(function () {
        $(".hideShow").hide();
    });
    $(".showBtn").click(function () {
        $(".hideShow").show();
    });
    //creates a function to allow text given class growShrink to grow and shrink over a period of a second for grown and 1 second for shrink. Function then loops by calling the function as part of the last animate. 
    function growShrink() {
        $(".growShrink").animate({
            fontSize: "50px"
        }, 1000).animate({
            fontSize: "20px"
        }, 1000, growShrink);
    }
    growShrink();
    //creates an object called cartItem. 
    function cartItem(productName, color, quantity, price) {
        this.productName = productName;
        this.color = color;
        this.quantity = quantity;
        this.price = price;
    }

    function addToCart() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let currentProduct = JSON.parse(localStorage.getItem("moreNintDetails"));
        //create a new item from the current item on screen
        let thisItem = new cartItem(currentProduct.productName, currentProduct.color, 1, currentProduct.price);
        //checks to see if current item is in the cart based on product name and color. Source: https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
        let itemIndex = cart.findIndex(thisItem => thisItem.productName == currentProduct.productName && thisItem.color == currentProduct.color);
        //if item exits in array e.g. index is greater than -1. 
        if (itemIndex >= 0) {
            //increase item quantity by 1
            cart[itemIndex].quantity++;
        }
        //if item is not present add the item to the array
        else {
            cart.push(thisItem);
        }
        let totalCartCost = 0;
        for (let i = 0; i < cart.length; i++) {
            let totalProductPrice = (cart[i].quantity * cart[i].price);
            totalCartCost += totalProductPrice;}
        //save the cart to the local storage. 
        localStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem("totalCart",JSON.stringify(totalCartCost));
        alert("This item has been added to your cart. Your cart total is now £" + totalCartCost); 
    };
    $("#addToCartBtn").click(addToCart);
    $(".quickCart").click(addToCart);

});