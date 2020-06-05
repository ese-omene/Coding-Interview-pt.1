window.onload = function(){
    // THIRD TIME IS A CHARM.  After some in class discussion I've decided to start again.  Keeping some of the knowledge 
    // gained on the first two tries, and applying some insight given through discussion
    /*
    1) Pull data from the URLs
    2) Analyze the data -- what are we getting?
    3) Print out the info on the page -- will we do all deets on one employee or all employees first names
    4) Markup
    5) Styling
    6) Done! -- this is where the interview really begins.  
    */

    //AJAX function to pull data from the URLS -- define the functions
   function loadDoc(url, cFunction)
   {
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                cFunction(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    //call the functions
    loadDoc("http://sandbox.bittsdevelopment.com/code1/fetchemployees.php", myFunction1);
   // loadDoc("http://sandbox.bittsdevelopment.com/code1/fetchroles.php", myFunction2);

    //let's start with grabbing the employees first
    function myFunction1(xhttp)//function to grab the employees
    {
        var team = xhttp.responseText;
        var obj = JSON.parse(team);

       // var roles = obj[2].roles;
       // console.log(roles); -- debug step

        
        //let's test out and grab one employees name
        //document.getElementById('profile').innerHTML = obj[1].employeefname + "  "+ obj[1].employeelname;
         console.log(team) // -- lets see what the response is (debug step)
        // i want to loop through and print each employees name out
        var count = Object.keys(obj).length; //this is how we get the number of employees
       // console.log(count); -- debug step
        //i'm scared of loops but here goes nothing
        //i'm use to starting the loop at 0, but since the first object is 1 i changed i=0 to i=1
        for(i=1;i<=count;i++)
          {
              //we create and element and add a class name to each profile. 
              var div = document.createElement('div');
              div.className = "profile";
              var pic = document.createElement('div');
              pic.className = "pic";
              var h1 = document.createElement('h1');
              h1.className = "name";
              var bio = document.createElement('p');
              bio.className = "bio";

              var member = obj[i]; //an individual team memeber
              
              //now that we have the elements, we can add the data we've grabbed and create 'card' for each employee
              pic.innerHTML = "<img src='http://sandbox.bittsdevelopment.com/code1/employeepics/"+obj[i].employeeid+".jpg'>";
              h1.innerText = member.employeefname + " " + member.employeelname
              bio.innerText = member.employeebio
             // div.innerText = obj[i].employeefname;
             // document.body.appendChild(div);
             

             //***out of order for steps to completion -- how do we get the crown...conditional statement based on isfeatured.  We would want to append that first if its the case.***/
             // let's check if an employee is featured or not
             var feat = member.employeeisfeatured;
            // console.log(feat); -- debug step

             if (feat == '1')
             {
                 var crown = document.createElement('div');
                 crown.className = 'featured';
                 crown.innerHTML = "&#x1F451";
                 div.appendChild(crown);
             }
             

             //lastly we append accordingsly either the profile 'card' or to the body of the document
             div.appendChild(pic);
             div.appendChild(h1);
             div.appendChild(bio);

             var roles = member.roles;
             //console.log(roles); -- debug step
             
             
             // now for roles...do we need a loop in here?  let's try!
             // had to place here so the span would append after bio div.  the loop contains all the steps, but just for roles.  
             //So we create the tag, add the class, insert the data then append all in the loop

             for(j=0; j<roles.length; j++)
             {
                // console.log(roles[j]); -- debug step
                 var role = document.createElement('div');
                 role.className = "roles ";
                 role.className += roles[j].rolename;
                 role.innerText = roles[j].rolename;
                 div.appendChild(role); 

                 // let's try to create some dynamic styling
                 var x = document.createElement("style");
                 var t = document.createTextNode("."+ roles[j].rolename +" {color: white; background-color:"+ roles[j].rolecolor +";}");
                 x.appendChild(t);
                 document.head.appendChild(x);

             }
             var main = document.getElementById('main');
             main.appendChild(div);

          //  document.body.appendChild(div);
          }
        
    }
 /*







    //EVERYTHING BELOW IS MY SECOND ATTEMPT - realizing maybe I should use a Callback Function to handle running more than one AJAX task in a site
    
    loadDoc("http://sandbox.bittsdevelopment.com/code1/fetchemployees.php", myFunction1);
    

    function loadDoc(url, cFunction){

        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                cFunction(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function myFunction1(xhttp){ //function to grab the employees
    
        var team = JSON.parse(xhttp.responseText);
        console.log(team) // -- lets see what the response is
        var members = [team] -- don't need
        console.log(members) -- lets put the respons in an array
        var obj = JSON.parse(team) -- don't need
        console.log(obj) // we have an object of our employees

       //with the obj variable we have the content from fetchemployees as an object.
       //can we now use object notiation to grab the information we need?
        document.getElementById("fullname").innerHTML += obj[1].employeefname + "  " + obj[1].employeelname + "<br>"; -- let's test it out with one item in the object (it works)
       
       Now I'll try to create a second funciton to hand grabbing the roles

        i tried as two separated functions but am thinking i need to nest the function in order to compare the fetched role to the employee role
       
       loadDoc("http://sandbox.bittsdevelopment.com/code1/fetchroles.php", myFunction2);
       function myFunction2(xhttp){ //function to grab the roles
       
        var roles = JSON.parse(xhttp.responseText); // first tried just the response text, ended up with a JSON file, so then had to parse through and get as an array
    
        console.log(roles[1].rolename);

         document.getElementById("fullname").innerHTML = team[1].employeefname + " " + team[1].employeelname + "<br>";
         document.getElementById('bio').innerHTML = team[1].employeebio + "<br>";
         if(team[1].employeehaspic == '1'){
             document.getElementById('pic').innerHTML = "<img src='http://sandbox.bittsdevelopment.com/code1/employeepics/" + team[1].employeeid+ ".jpg' > <br>";
         }
         if(team[1].employeeisfeatured == '1'){
             document.getElementById('featured').innerHTML = "<img src='https://hotemoji.com/images/emoji/5/1x0qwry1xodau5.png'><br>";

         }
         console.log(team[1].roles[0].rolename)
        document.getElementById('roles').innerHTML = team.roles[1].rolename;
       var count = Object.keys(team).length;
       console.log(count);
       var i;
       console.log(team[3].employeeisfeatured)

       for(i=1; i<=count; i++){ 

        document.getElementById("profile").innerHTML +=  "<div class='card'>"+team[i].employeefname + " " + team[i].employeelname + "<br>"
        + team[i].employeebio + "<br>" +  "<img src='http://sandbox.bittsdevelopment.com/code1/employeepics/"+[i]+".jpg' > <br> </div>";
        document.getElementById('bio').innerHTML += ;    
        document.getElementById('pic').innerHTML += "<img src='http://sandbox.bittsdevelopment.com/code1/employeepics/"+[i]+".jpg' > <br> </div>";
        if(team[i].employeeisfeatured == "1"){
            var featured = document.createElement("div");
            featured.className = "feature";
            
            featured.innerHTML += "<img src='https://hotemoji.com/images/emoji/5/1x0qwry1xodau5.png'><br></div>";
            document.getElementById('profile').appendChild(featured);
        }
        

       }

  



         document.getElementById("")
        
        if(roles[1].rolename == "Communications"){
         document.getElementById('roles').innerHTML = roles[1].rolename;
        }
      

        // now that i have a nested function, lets see if i can access both from the inner properly
          //-- printed out all the rolls
        document.getElementById('bio').innerHTML = team;  -- printed out all the team members
       
        console.log(roles) //lets see what the response is
        var roles = [roles]; -- don't need
        console.log(roles);// lets put the roles in an array
        var obj = JSON.parse(roles); -- don't need
       // console.log(obj); // we have an array of our roles
  

    }

      }

   
    
    document.getElementById("bio").innerHTML = myFunction2();





/// EVERYTHING BELOW WAS FROM MY FIRST ATTEMPT //      
var fetchemployees;
fetchemployees =  new XMLHttpRequest();
       fetchemployees.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
             var team = this.responseText;
              console.log(team);
             var members = [team]
             console.log(members)
            var obj = JSON.parse(team)
            console.log(obj)
            document.getElementById("fullname").innerHTML += obj[1].employeefname + "  " + obj[1].employeelname + "<br>";
            }
         };
        fetchemployees.open("GET", "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php", true);
        fetchemployees.send();

var fetchroles = new XMLHttpRequest();
        fetchroles.onreadystatechange = function(){
         if(this.readyState == 4 && this.status == 200){
                var roles = this.responseText;
             var rolesArray = JSON.parse(roles)
              console.log (rolesArray[0].rolecolor)

                document.getElementById("roles").innerHTML += rolesArray[0].rolename + "<br>"
               role = rolesArray[1].rolename
               roleColor = rolesArray[0].rolecolor;
               if (role == 'Communications'){
                var roleDetails = document.getElementById("roles");
                roleDetails.style.color = 'white'
                roleDetails.style.background = roleColor;
                roleDetails.innerHTML = role;
            }
  
            }
        };
      fetchroles.open("GET", "http://sandbox.bittsdevelopment.com/code1/fetchroles.php", true)
      fetchroles.send();
    
      

    
    */
}

