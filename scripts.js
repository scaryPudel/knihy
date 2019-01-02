var myBooksTable;
var wishListTable;
var tableHeader = "<tr><th class=\"tiny\">#</th><th>Názov knihy</th><th>Meno autora</th><th>Žáner</th><th>Vydavateľstvo</th><th>Poznámka</th></tr>";
var visibleTable;

function init() {
    var keybooks = 'https://docs.google.com/spreadsheets/d/14O4xQZfwI4gsruKS0ttkBsvLn2mKpGmZMUz0zlZyFvI/edit?usp=sharing';
    var keyWishlist = 'https://docs.google.com/spreadsheets/d/1nEMknanCiKdqTTl9uXsYeVR13mFNwaZdhkMAj2rveHI/edit?usp=sharing';

    myBooksTable = Tabletop({
        key: keybooks,
        callback: function(data){
            myBooksTable = data;
            visibleTable = myBooksTable;
            updateTable(visibleTable); 
        },
        simpleSheet: true
    });

    wishListTable = Tabletop({
        key: keyWishlist,
        callback: function(data2, tabletop) { 
            wishListTable = data2;
        },
        simpleSheet: true
    });
}
window.addEventListener('DOMContentLoaded', init)

function showTable(table){
    switch(table){
        case 'myBooksTable': 
            visibleTable = myBooksTable;
            
            break;
        case 'wishListTable': 
            visibleTable = wishListTable;
            break;
    }
    updateTable(visibleTable);

    var li = document.getElementsByClassName("li");
    for(var i = 0; i < li.length; i++){
        li[i].style.color = "white";
        console.log(li[i].style.color)
    }
    document.getElementById(table).style.color = "#6AA4C1";
}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function compareStringsDesc(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a > b) ? -1 : (a < b) ? 1 : 0;
}

function updateTable(tableName){
    document.getElementById("myTable").innerHTML = tableHeader;
    for(let i = 0; i < tableName.length; i++){
        addRowToTable(i, i, tableName);
    }
}

function addRowToTable(i,tableRow, source){
    var table = document.getElementById("myTable");
    var row = table.insertRow(tableRow+1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    cell0.innerHTML = i;
    cell1.innerHTML = source[i].nazovKnihy;
    cell2.innerHTML = source[i].menoAutora;
    cell3.innerHTML = source[i].zaner; 
    cell4.innerHTML = source[i].vydavatelstvo; 
    cell5.innerHTML = source[i].poznamky; 
}

function authorUp(){
    sortIconColor("B");
    visibleTable.sort(function(a, b) {
        return compareStrings(a.menoAutora, b.menoAutora);
    })
    updateTable(visibleTable);
}

function authorDown(){
    sortIconColor("D");
    visibleTable.sort(function(a, b) {
        return compareStringsDesc(a.menoAutora, b.menoAutora);
    })
    updateTable(visibleTable);
}

function bookUp(){
    sortIconColor("A");
    visibleTable.sort(function(a, b) {
        return compareStrings(a.nazovKnihy, b.nazovKnihy);
    })
    updateTable(visibleTable);
}

function bookDown(){
    sortIconColor("C");
    visibleTable.sort(function(a, b) {
        return compareStringsDesc(a.nazovKnihy, b.nazovKnihy);
    })
    updateTable(visibleTable);
}

function sortIconColor(icon){
    var fas = document.getElementsByClassName("fas");
    for(var i = 2; i < 6; i++) fas[i].style.color = "#1D2D35"; 
    document.getElementById(icon).style.color = "#6AA4C1";

}

function search(){
    var value = document.getElementById("input").value.toLowerCase();
    var table = document.getElementById("myTable");
    var j = 0;

    table.innerHTML = tableHeader;

    for(var i = 0; i < visibleTable.length; i++){
        var kniha = visibleTable[i].nazovKnihy.toString().toLowerCase();
        var autor = visibleTable[i].menoAutora.toString().toLowerCase();

        if(kniha.includes(value) || autor.includes(value)){
            addRowToTable(i,j,visibleTable);
            j++;
        }
    }
}

