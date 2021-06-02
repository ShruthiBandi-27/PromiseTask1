var div1 = document.createElement('div');
document.body.style.backgroundColor = '#99bbff';

var h3 = document.createElement('h3');
h3.style.textAlign = 'center';
h3.innerHTML = "Cities within a rectangular zone along with their weather details,location from openweather API";

var table = document.createElement('table');
table.style.border = '2px solid black';
table.style.borderCollapse = 'collapse';
table.style.backgroundColor = 'rgba(255, 99, 71, 0.5)';
table.style.color = 'black';

var tbody = document.createElement('tbody');

table.style.width = "100%";

var row = document.createElement('tr');

var th1 = document.createElement('th');
th1.style.padding = '10px';
th1.innerHTML = "ID";
var th2 = document.createElement('th');
th2.innerHTML = "City Name";

var th3 = document.createElement('th');
th3.innerHTML = "Wind Speed";

var th4 = document.createElement('th');
th4.innerHTML = "Weather";

var th5 = document.createElement('th');
th5.innerHTML = "Temperature";

var th6 = document.createElement('th');
th6.innerHTML = "Longitude";

var th7 = document.createElement('th');
th7.innerHTML = "Latitude";

//Pagination 
var div2 = document.createElement('div');
div2.setAttribute('class','pagination');

fetch("https://api.openweathermap.org/data/2.5/box/city?bbox=10,40,15,37,10&appid=830d4f4212a9a768e6e9e3c13af3b2a1")
.then((result)=>{
    return result.json();
})
.then((data)=>{
   // console.log(data.list);
    console.log(data.list);
   console.log('length: '+data.list.length);
   var length = data.list.length;
   var divisor = 2;
    for(let i=2;i<=length/2;i++){
        if(length % i === 0){
            if(length/i <=3){
                divisor = i;
                break;
            }
        }
    }

    console.log('divisor: '+divisor);
   var pages = Math.ceil(length/divisor);
   console.log('pages:'+pages);
    var lastID = 0;
    
    //displaying 1st 10 records
    foo(1,'1');

    function createtrtd(elename,value=""){
        var element = document.createElement(elename);
        element.setAttribute('id','tabletd');
        element.innerHTML = value;
        return element;
    }
    
    //creating table rows with data
    function foo(j,str){
        c=0;
        // condition for previous button
        if(str==='previous' && lastID != 0){
            j = lastID/divisor;
            if(j!=1)
                j--;
        }
        tbody.innerHTML = '';
        for(let i=(j-1)*divisor; c<divisor; i++){
        // document.body.append(data[i].id + " " + data[i].name + " " + data[i].email +'<br>');
        c++;
        var tbodytr = document.createElement('tr');
        tbodytr.setAttribute('id','tablebody');

        var td1 = createtrtd('td',data.list[i].id);
        td1.style.border = '2px solid black';
        td1.style.padding = '10px';

        var td2 = createtrtd('td',data.list[i].name);
        td2.style.border = '2px solid black';

        var td3 = createtrtd('td',data.list[i].wind.speed);
        td3.style.border = '2px solid black';

        var td4 = createtrtd('td',data.list[i].weather[0].description);
        td4.style.border = '2px solid black';

        var td5 = createtrtd('td',data.list[i].main.temp);
        td5.style.border = '2px solid black';

        var td6 = createtrtd('td',data.list[i].coord.Lon);
        td6.style.border = '2px solid black';

        var td7 = createtrtd('td',data.list[i].coord.Lat);
        td7.style.border = '2px solid black';

        tbodytr.append(td1,td2,td3,td4,td5,td6,td7);
        tbody.append(tbodytr);
        }

       // lastID = td1.innerHTML;
       lastID = c*j;
    }

    // Changing buttons color on clicking
    function buttonColor(id){
        document.getElementById(id).style.backgroundColor = 'rgba(255, 99, 71, 0.5)';
            document.getElementById(id).style.color ='black';
            for(let j =1;j<=pages+3;j++){
                if(id!=j){
                    document.getElementById(j).style.color = 'black';
                    document.getElementById(j).style.backgroundColor = 'white';
                }
            }  
    }
    
    
    
    //first,Previous,Last buttons
    for(let i= pages+1;i<=pages+3;i++){
        
        var OtherButton = document.createElement('button');
        OtherButton.setAttribute('id',i);
        OtherButton.type = "button";
        OtherButton.style.backgroundColor = 'white';
        OtherButton.style.color = 'rgba(255, 99, 71, 0.5)';
        OtherButton.style.padding = '8px';
        OtherButton.style.border = '1px solid black';
        OtherButton.style.cursor = 'pointer';

        OtherButton.addEventListener('click',function(){
           
            if(i===pages+1)
                foo(1,'first');
            else if(i===pages+3){
                foo(pages,'last');
            }
            else 
                foo(1,'previous');
            
            buttonColor(i);
              
        })
        if(i===pages+1){
            OtherButton.innerHTML = 'First';
            OtherButton.style.backgroundColor = 'rgba(255, 99, 71, 0.5)';
            OtherButton.style.color = 'black';
        }
        else if(i===pages+2){
            OtherButton.innerHTML = 'Previous';
            OtherButton.style.color = 'black';
        }
        else{
            OtherButton.innerHTML = 'Last';
            OtherButton.style.color = 'black';
        }
       
        div2.append(OtherButton);
        
    }
   
    //1 - 10 buttons
    for(let i=1;i<=pages;i++){
        var button = document.createElement('button');
        button.setAttribute('id',i);
        button.type="button";
        button.addEventListener('click',function(){
            foo(i,'i');
            buttonColor(i);
        });
        //button.setAttribute('onclick',foo(2));
        button.innerHTML = i;
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.border = '1px solid black';
        button.style.padding = '8px';
        button.style.cursor = 'pointer';
        div2.append(button);
        
        // document.body.append(button);
    }

    //appending data
    row.append(th1,th2,th3,th4,th5,th6,th7);
    table.append(row,tbody);
    div1.append(h3,table);
    var br = document.createElement('br');
   
    document.body.append(div1,br,div2);
    document.body.append(div2);
})

















