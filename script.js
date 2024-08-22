document.addEventListener('DOMContentLoaded', function() {

    var arr = new Array();
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('foodbtn')) {
            // Get the name of the food
            let foodItem = event.target.closest('.food-item');
            let itemId = foodItem.getAttribute('id');

            // Get the price of the food
            let itemPriceText = foodItem.querySelector('.price p').textContent;
            let itemPrice = itemPriceText.replace('Price: $', '').trim();
            let itemQty = 1;

            for(var i = 0; i < arr.length; i++){
                if(arr[i].id === itemId)     //If item exists in cart
                arr[i].qty++;   //Add 1 on qauntity
                sessionStorage.setItem("localData", JSON.stringify(arr));
            }

            addItem(itemId, itemPrice,itemQty);

        }
    });

    function addItem(id, price , Qty) {
        let item = {
            id: id,
            price: price,
            qty: Qty
        };
        addData(item);


    }

    function total_price(table){
        let total = 0;
        for (var i = 1, row; row = table.rows[i]; i++){
            let col = row.cells[3];
            total += Number(col.textContent);

        }

        document.getElementById("TotalAmount").textContent = "Total: $" + total.toFixed(2);;
    }


    function addData(item){
        getData();  //Get current cart items

        for(var i = 0; i < arr.length; i++){
            if(arr[i].id === item.id)     //If item exists in cart
                return;
        }

        arr.push(item);     //Add item to cart if not exists
        sessionStorage.setItem("localData", JSON.stringify(arr));
        showData();
    }

    function getData(){
        var str = sessionStorage.getItem("localData");
        if (str != null){
            arr = JSON.parse(str);
        }
    }

    function showData(){
        getData();

        let tbl = document.getElementById("OrderTable");

        var x = tbl.rows.length;
        while (--x) {
            tbl.deleteRow(x);
            }

        for(var i = 0; i < arr.length; i++){
            var row = tbl.insertRow(-1);          //Insert a new row at the end of the table
            var cell1 = row.insertCell(0);         // Create first cell in the row
            var cell2 = row.insertCell(1);        // Create second cell in the row
            var cell3 = row.insertCell(2);       // Create third cell in the row
            var cell4 = row.insertCell(3);      // Create forth cell in the row

            cell1.textContent = arr[i].id;     // Insert item name
            cell2.textContent = arr[i].price ; // Insert item price
            cell3.textContent = arr[i].qty;  // Insert item qauntity

            cell4.textContent = (Number(cell2.textContent) * Number(cell3.textContent)).toFixed(2); // Calculate item's total price
        }
        total_price(tbl);
    }
    showData();

    

});
