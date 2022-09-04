$(document).ready(function () { //runs everything within the curly braces when the page has loaded
    //hide cart table to allow it to be unhidden if cart is not empty
    $("#shoppingCartTable").hide();
    $("#totalCost").hide();
    //Total price to pay will be used to store the cart minus any discount plus postage. 
    let totalPrice = 0;
    sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    //will be used to limit customers to 1 coupon
    let numCoupons = 0;
    sessionStorage.setItem("numCoupons", JSON.stringify(numCoupons));
    //sets the starting cost of delivery which will be used later
    let delPrice = "";
    sessionStorage.setItem("delPrice", JSON.stringify(delPrice));

//set dsicount to 0
let discount = 0;
sessionStorage.setItem("discount", JSON.stringify(discount));


    function populateCart() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));
        let totalCartCost = JSON.parse(sessionStorage.getItem("totalCart"));
        //if cart is populated then make table containing the cart show 
        if (cart.length > 0) {
            $("#shoppingCartTable").show();
            $("#totalCost").show();
        }
        let cartStructure = "";

        for (let i = 0; i < cart.length; i++) {
            let totalProductPrice = (cart[i].quantity * cart[i].price);
            cartStructure += '<tr><td>' + cart[i].productName + '</td><td>' + cart[i].color + '</td><td>£' + cart[i].price + '</td><td class="productQuantity">' + cart[i].quantity + '</td><td>£' + totalProductPrice.toFixed(2) + '</td></tr>';

        }
        //adds above cart structure to the table. 
        $("#shoppingCartTable").append(cartStructure);
        //calculates the value of the cart without 20% VAT
        let cartNoVat = totalCartCost * (1 / 1.2);
        //calculates VAT at 20%
        let vat = cartNoVat * 0.2;
        //fixes totalPrice to 2 d.p.
        totalPrice = totalCartCost+ delPrice - discount;
        //appends cartNoVat to the correct table row while limiting it to two d.p.
        $("#cartNoVat").append("£" + cartNoVat.toFixed(2));
        //appends vat to the correct table row while limiting it to two d.p.
        $("#vat").append("£" + vat.toFixed(2));
        $("#priceToPay").append("£" + totalPrice.toFixed(2));
        sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        sessionStorage.setItem("totalCart", JSON.stringify(totalCartCost));
    }
    populateCart();
    //creates an object which stores the various delivery options. 
    function deliveryOptions(location, standardDelCost, firstClassCost, nextDayCost) {
        this.location = location;
        this.standardDelCost = standardDelCost;
        this.firstClassCost = firstClassCost;
        this.nextDayCost = nextDayCost;
    }
    //creates new objects
    let ukMainlandDel = new deliveryOptions("Mainland UK", 1.99, 2.99, 5.99);
    let ukIslandDel = new deliveryOptions("UK Islands", 2.99, 3.99, 6.99);
    let europeDel = new deliveryOptions("Mainland Europe", 5.99, 7.99, "N/A");
    let rowDel = new deliveryOptions("Rest of World", 10.99, 15.99, "N/A");
    //adds the objects to an array
    let deliveryOptionsArr = [ukMainlandDel, ukIslandDel, europeDel, rowDel];
    //creates a function to add aspects of the objects to a select list. 
    function delLocationList() {
        let delLocationList = "";
        for (let i = 0; i < deliveryOptionsArr.length; i++) {
            if (deliveryOptionsArr[i] == ukMainlandDel || deliveryOptionsArr[i] == ukIslandDel) {
                delLocationList += '<option value="' + deliveryOptionsArr[i].location + 'stdDel">' + deliveryOptionsArr[i].location + ' Standard Delivery - £' + deliveryOptionsArr[i].standardDelCost + ' </option>';
                delLocationList += '<option value="' + deliveryOptionsArr[i].location + 'firstClassDel">' + deliveryOptionsArr[i].location + ' First Class Delivery - £' + deliveryOptionsArr[i].firstClassCost + '</option>';
                delLocationList += '<option value="' + deliveryOptionsArr[i].location + 'NextDay">' + deliveryOptionsArr[i].location + ' Next Working Day Delivery - £' + deliveryOptionsArr[i].nextDayCost + '</option>';
            }
            if (deliveryOptionsArr[i] == europeDel || deliveryOptionsArr[i] == rowDel) {
                delLocationList += '<option value="' + deliveryOptionsArr[i].location + 'stdDel">' + deliveryOptionsArr[i].location + ' Standard Delivery - £' + deliveryOptionsArr[i].standardDelCost + ' </option>';
                delLocationList += '<option value="' + deliveryOptionsArr[i].location + 'firstClassDel">' + deliveryOptionsArr[i].location + ' First Class Delivery - £' + deliveryOptionsArr[i].firstClassCost + '</option>';
            }
        }
        $("#deliveryLocationList").append(delLocationList);
    }
    delLocationList();


    //Creates a function which can be used to the make the other salutation reveal a text box where a preferred salutation can be entered. 
    $("#salutations").change(function () { //runs the following when salutations is changed. 
        if ($(this).val() === "other") { //if the other option is selected
            $(this).after(' <input id="otherSalutation" type="text">'); //adds the element within the parenthesis after the element that the function is acting on.  
        } else {
            $("#otherSalutation").remove(); //otherwise the element with id as shown is removed.
        }
    });

    $("#delDetailsSubmit").click(function (e) {
        let totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));
        let totalCartCost = JSON.parse(sessionStorage.getItem("totalCart"));
        let numCoupons = JSON.parse(sessionStorage.getItem("numCoupons"));
        let delPrice = JSON.parse(sessionStorage.getItem("delPrice"));
        let discount=JSON.parse(sessionStorage.getItem("discount"));
        e.preventDefault();
        if ($("#collectionRadio").is(":checked")) {
            alert("You have selected collection from our store");
            delPrice = 0;
        } else if ($("#deliveryRadio").is(":checked")) {
            alert("You have selected to have your items delivered");
            //extract the price from the option selected using RegExp. Source: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
            let delOption= $("#deliveryLocationList").find(":selected").text();
            delPrice = parseFloat(delOption.match(/\d+(?:\.\d+)?/));
        }
        $("#postage").empty().append("£" + delPrice);
        totalPrice = totalCartCost + delPrice - discount;
        //removes current total price before up updating with new total price. 
        $("#priceToPay").empty().append("£" + totalPrice.toFixed(2));
        sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        sessionStorage.setItem("totalCart", JSON.stringify(totalCartCost));
        sessionStorage.setItem("numCoupons", JSON.stringify(numCoupons));
        sessionStorage.setItem("delPrice", JSON.stringify(delPrice));
        sessionStorage.setItem("discount",JSON.stringify(discount));
    });


    //create an object to store the current working voucher code. 
    function coupons(code, value) {
        this.code = code;
        this.value = value;
    }
    //creates three new voucher codes. 
    let gimme10 = new coupons("gimme10", 0.1),
        gimme20 = new coupons("gimme20", 0.2),
        gimme30 = new coupons("gimme30", 0.3);
    //creates an array to store the codes. 
    let couponsArr = [gimme10, gimme20, gimme30];
    $("#couponSubmit").click(function () {
        let totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));
        let totalCartCost = JSON.parse(sessionStorage.getItem("totalCart"));
        let numCoupons = JSON.parse(sessionStorage.getItem("numCoupons"));
        let delPrice = JSON.parse(sessionStorage.getItem("delPrice"));
        if (numCoupons < 1) {
            for (let i = 0; i < couponsArr.length; i++) {
                if ($("#couponCodes").val() == couponsArr[i].code && numCoupons == 0) {
                    alert("Coupon is valid");
                    numCoupons++;
                    //variable for the discount
                    let discount = totalCartCost * couponsArr[i].value;
                    //works out new cost based on the discount
                    totalPrice = totalCartCost + delPrice - discount;
                    //insert discount in to table
                    $("#discount").append("£" + discount.toFixed(2));
                    // replace the total price to pay with the new total
                    $("#priceToPay").empty().append("£" + totalPrice.toFixed(2));
                    console.log(totalCartCost);
                    sessionStorage.setItem("discount", JSON.stringify(discount));
                }

            }
        } else {
            alert("You have already submitted a coupon for this order");
        }
        sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        sessionStorage.setItem("totalCart", JSON.stringify(totalCartCost));
        sessionStorage.setItem("numCoupons", JSON.stringify(numCoupons));
        sessionStorage.setItem("delPrice", JSON.stringify(delPrice));
    });
    //When the confirm order button is clicked a random order number is generated that consists of numbers and letters also clears the cart. With more functionality (e.g. a database. It would be possible for me to store the reference server side and have a more sequential reference number system)
    $("#confirmOrderBtn").click(function () {
        let totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));
        let totalCartCost = JSON.parse(sessionStorage.getItem("totalCart"));
        let numCoupons = JSON.parse(sessionStorage.getItem("numCoupons"));
        let delPrice = JSON.parse(sessionStorage.getItem("delPrice"));
        let discount = JSON.parse(sessionStorage.getItem("discount"));
        //assign orderRef to a random number using Math.
        let orderRef = Math.random();
        //convert orderRef to a string
        orderRef = orderRef.toString();
        //remove the number before the decimal and the decimal point. Use the next 5 numbers as the order number. 
        orderRef = orderRef.substring(2, 12);
        //alerts user their order has been confirmed and their reference number. 
        if(numCoupons>0){
        alert("Your order has been confirmed. Your reference number is: " + orderRef + "\n Your order total was £"+totalPrice.toFixed(2) +"\n You saved £"+discount.toFixed(2)+" by using a discount coupon");
        }
        else{        alert("Your order has been confirmed. Your reference number is: " + orderRef + "\n Your order total was £"+totalPrice.toFixed(2));
    }
        localStorage.removeItem("cart");
        sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        sessionStorage.setItem("totalCart", JSON.stringify(totalCartCost));
        sessionStorage.setItem("numCoupons", JSON.stringify(numCoupons));
        sessionStorage.setItem("delPrice", JSON.stringify(delPrice));
        location.reload();
    });
});