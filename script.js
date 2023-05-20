document.body.style.backgroundColor="black";
var divc = document.createElement("div");
divc.className="container";
var divrow = document.createElement("div");
divrow.className="row";

var divnamelist= document.createElement("div");



var h1 =document.createElement("h1");
h1.innerHTML=`<i class="fa fa-beer" aria-hidden="true"></i>   Brewery  <i class="fa fa-glass" aria-hidden="true"></i>`;
h1.style.color="aqua";
h1.style.textAlign="center";
h1.style.marginTop="30px";
h1.style.marginBottom="25px";

var input=document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("id","breweryname");
input.style.width="275px";
input.style.margin="10px";
input.style.marginBottom="20px";
input.setAttribute("placeholder","Search By Brewery Name");


var span=document.createElement("span");
span.innerHTML="OR";
span.style.color="green";
var span1=document.createElement("span");
span1.innerHTML="OR";
span1.style.color="green";

var lb=document.createElement("br");
var button=document.createElement("button");
button.setAttribute("type","button");
button.classList.add("btn","btn-secondary");
button.style.textAlign="center";
button.style.margin="10px";
button.style.marginBottom="10px";
button.style.width="10%";
button.innerHTML="Search";
button.addEventListener("click",foo);

// var input1=document.createElement("input");
// input1.setAttribute("type","text");
// input1.setAttribute("id","brewerytype");
// input1.style.width="275px";
// input1.style.margin="10px";
// input1.setAttribute("placeholder","Search By Brewery Type");



var label = document.createElement("label");
label.setAttribute("for", "btype");
label.innerHTML = "Brewery Type : ";
label.style.marginLeft="10px";
label.style.marginBottom="20px";
label.style.color="blue";

var selectvalue = document.createElement("select");
selectvalue.setAttribute("id", "btype");
selectvalue.setAttribute("name", "btype");
selectvalue.setAttribute("class","btn btn-danger dropdown-toggle");



function createoptionvalue(value1) {
    var opt = document.createElement("option");
    opt.value = value1;
    opt.text = value1;
    return opt;
}
var option = createoptionvalue("NA");
var option1 = createoptionvalue("micro");
var option2 = createoptionvalue("nano");
var option3 = createoptionvalue("regional");
var option4 = createoptionvalue("brewpub");
var option5 = createoptionvalue("large");
var option6 = createoptionvalue("planning");
var option7 = createoptionvalue("bar");
var option8 = createoptionvalue("contract");
var option9 = createoptionvalue("proprietor");
var option10 = createoptionvalue("closed");


selectvalue.append(option,option1, option2, option3, option4, option5, option6, option7, option8, option9, option10);

label.append(selectvalue);


var input2=document.createElement("input");
input2.setAttribute("type","text");
input2.setAttribute("id","cityname");
input2.style.width="275px";
input2.style.margin="10px";
input2.setAttribute("placeholder","Search By City Name");

var input3=document.createElement("input");
input3.setAttribute("type","text");
input3.setAttribute("id","namelist");
input3.style.width="275px";
input3.style.margin="10px";
input3.setAttribute("placeholder","Type phrase for Breweryname");


var button1=document.createElement("button");
button1.setAttribute("type","button1");
button1.classList.add("btn","btn-secondary");
button1.style.textAlign="center";
button1.style.margin="10px";
button1.style.marginBottom="10px";
button1.style.width="10%";
button1.innerHTML="GetList";
button1.addEventListener("click",nameli);

var span2=document.createElement("span");
span2.innerHTML="To Know about Breweryname with key word -->";
span2.style.color="yellow";
span2.style.margin="20px";

var lb1=document.createElement("br");
divc.append(input,span,input2, span1,label,button,lb,span2,input3, button1);

divc.append(divnamelist,divrow);
document.body.append(h1,divc);


async function foo(){
    try{
        var name  =document.getElementById("breweryname").value;
    var city  =document.getElementById("cityname").value;
    var typevalue =document.getElementById("btype").value;
 console.log(name);
    var val =null;
    divrow.innerHTML ="";
    divnamelist.innerHTML="";
    if(name!=null& name !=""){
        val =await fetch(`https://api.openbrewerydb.org/v1/breweries?by_name=${name}&per_page=500`);
        let res1 = await val.json();
        createLabel(res1);
       }else if(city!=null& city !=""){
     val =await fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=500`);
     let res1 = await val.json();
     createLabel(res1);
    }else if(typevalue!="NA"){
        val =await fetch(`https://api.openbrewerydb.org/v1/breweries?by_type=${typevalue}&per_page=20`);
        let res1 = await val.json();
        createLabel(res1);
    }else {
        val =await fetch(`https://api.openbrewerydb.org/v1/breweries?per_page=500`);
        let res1 = await val.json();
        createLabel(res1);
}
function createLabel(data) {
     for (let i = 0; i < data.length; i++) {
       divrow.innerHTML +=`<div class="col-md-4" >
       <div class="card bg-danger-subtle text-emphasis-danger border-primary mb-3 style="max-width:18rem;textAlign:center">
       <div class="card-header" style="color:red;font-family: Verdana;"><b>${data[i].name}</b></div>
       <div class="card-body" style="text-align:center">
       <p class="card-title">Brewery Type :${data[i].brewery_type} </p>
         <p class="card-title">Address :${data[i].address_1} </p>
         <p class="card-title">City :${data[i].city} </p>
         <p class="card-title">State :${data[i].state} </p>
         <p class="card-title">Postal Code :${data[i].postal_code} </p>
         <p class="card-title">Country :${data[i].country} </p>
         <p class="card-text">Phone No: ${data[i].phone}</p>
         <a href="${data[i].website_url}" target="_blank"  style="color:black"><b>Go To Website</b></a>
       </div>
       </div>
       </div>`;
        document.body.append(divc);
    }
}
    }catch{
        divrow.innerHTML=`<span>404 Page Not found try again</span><br><br>`;
      
    }
}

async function nameli(){
    try{
         var keyword  =document.getElementById("namelist").value;
        divrow.innerHTML ="";
        
        console.log(keyword);
    var val =null;
    if(keyword!=null& keyword !=""){
        val =await fetch(`https://api.openbrewerydb.org/v1/breweries/autocomplete?query=${keyword}`);
        let res1 = await val.json();
        createLabel(res1);
       }else {
        divnamelist.innerHTML=`<span>Please Enter valid key word </span><br><br>`;
       }
function createLabel(data) {
 
    for (let i = 0; i < data.length; i++) {
        divnamelist.innerHTML += ` <li style="color:white">${data[i].name}</li> `;
        document.body.append(divc);

    }
}
    }catch{
        divrow.innerHTML=`<span>Please Enter valid key word</span><br><br>`;
      
    }
}