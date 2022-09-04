$(document).ready(function () {
    //converts the details stored in local storage back to an object. 
    let productDetails = JSON.parse(localStorage.getItem("moreNintDetails"));
    //appends the value of the key productName to the element with the id productName within the html
    $("#productName").html(productDetails.productName);
    $("#productImg").html('<img src="' + productDetails.img + '" id="' + productDetails.productName + '" class="productImg">');
    //if the color is not blank then edit the blank heading to contain the color details
    if (productDetails.color !== "") {
        $("#productColor").html("Main Colour: "+productDetails.color);
    }
    //brings across product details as stored in the object. 
    $("#productDetails").html(productDetails.description);
    $("#productPrice").html("£ "+ productDetails.price);
    $("#numStock").html("In stock: "+ productDetails.quantity);
    //set the title of the page to be the product details. Source: https://stackoverflow.com/questions/7173596/changing-the-page-title-with-jquery
    function changeTitle (){
        $(document).prop("title","Game On - "+productDetails.productName +" "+ productDetails.color);
    }
    changeTitle();
});