'use strict'

//variables
let rowData =document.getElementById('row-data');
let submitBtn;

    $(document).ready(() => {
        searchByName("").then(() => {
            $(".loading").fadeOut(500);
            $("body").css("overflow", "auto");

        })
        

        
    })

//functions
$('.open-close-icon').click(()=>{
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav();
      
    } else {
      
        openSideNav();
    }
});

$('.logo').click(()=>{   window.location.reload(); });
function openSideNav(){
$('.side-nav-menu').animate({
    left:0}
    ,500);
    $(".open-close-icon i").removeClass("fa-align-justify");
    $(".open-close-icon i").addClass("fa-x");

    for (let i = 0; i < 5; i++) 
    {
        $('.nav-links li').eq(i).animate({
                top:0
            },(i + 5) * 100);
     
    }
}

function closeSideNav(){
let width= $('.nav-tab').innerWidth();
let headerWidth= $('.nav-header').innerWidth();

$( '.side-nav-menu').animate({
    left: -(width-headerWidth)
}, 500);

$(".open-close-icon i").addClass("fa-align-justify");
$(".open-close-icon i").removeClass("fa-x");

$(".nav-links li").animate({
    top: 300
}, 500)

}

closeSideNav();
// display all functions----------------------------------------------------------------
//---------------------------------------show meals----------------------------------------------------------------
function displayAllMeals(array) {
    closeSideNav();
    rowData.innerHTML="";   
        let box="";

    for (let i = 0; i < array.length; i++) {
        box+=`
        <!-- meal design -->
        <div class="col-md-3">
             <div   onclick="getMealData('${array[i].idMeal}')" class=" meal rounded-2  position-relative  overflow-hidden ">
                     <div class="img ">
                         <img class="w-100" src="${array[i].strMealThumb}" alt="" srcset="">
                         <div class="meal-overlay position-absolute  d-flex align-items-center text-black p-2" id="meal-overlay">
                             <h3>${array[i].strMeal}</h3>
                         </div>
                     </div>
                 
                 
             </div>
        </div> 
        `;
        
    }
   
    rowData.innerHTML=box;
}
//---------------------------------------show categories ----------------------------------------------------------------
function displayAllCategory(array) {
    closeSideNav();
    rowData.innerHTML="";
    $('#search-container').html("");

        let box="";

    for (let i = 0; i < array.length; i++) {
        box+=`
      
        <div class="col-md-3">
    
             <div onclick="getCategoryMeal ('${array[i].strCategory}')"  class=" meal rounded-2  position-relative  overflow-hidden ">
                 <div class="img ">
                     <img class="w-100" src="${array[i].strCategoryThumb}" alt="" srcset="">

                     <div class="meal-overlay position-absolute  d-flex flex-column align-items-center justify-content-center text-black p-2" id="meal-overlay">
                         <h3>${array[i].strCategory}</h3>
                         <p class="lead fs-6 text-center">${array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}  </p>
                     </div>
                 </div>
             </div>
          </div>

         
          </div> 
        `;
        
    }
   
    rowData.innerHTML=box;
}
//---------------------------------------show Area ----------------------------------------------------------------
function displayAllArea(array) {
    closeSideNav();
    rowData.innerHTML="";
    $('#search-container').html("");
            let box="";
    for (let i = 0; i < array.length; i++) {
        box+=`
            <!-- Area design -->
            <div class="col-md-3">
        
                <div onclick="getAreaMeal('${array[i].strArea}')" class=" meal rounded-2  text-center   p-2">
                    <div class="area-show ">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${array[i].strArea}</h3>
                    </div>

                </div>

            </div> 
        `;
        
    }
   
    rowData.innerHTML=box;
}


//---------------------------------------show Ingredients ----------------------------------------------------------------
function displayAllIngredients(array) {
    closeSideNav();
    rowData.innerHTML="";
    $('#search-container').html("");
                let box="";
 
    for (let i = 0; i < array.length; i++) {
        box+=`
        <!--Ingredients design -->
        <div class="col-md-3">
            <div onclick="getIngredientsMeal('${array[i].strIngredient}')" class=" meal rounded-2  text-center   p-2">
                <div class="area-show ">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${array[i].strIngredient}</h3>
                 
                    <p>${array[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>

            </div>

         </div> 
        `;
        
    }
   
    rowData.innerHTML=box;
}

function displayMealDetails(mealData) {
    closeSideNav();
    rowData.innerHTML="";
    $('#search-container').html("");
            let box="";
    let Ingredient="",Tags,tageStr="";
    for (let i=0; i<20 ;i++) {
        mealData[`strIngredient${i}`] ? Ingredient+= `<li class="alert alert-info m-2 p-1" >${mealData[`strMeasure${i}`] } ${mealData[`strIngredient${i}`] }</li>`:"";
    }
    mealData.strTags?Tags=mealData.strTags.split(",") : Tags = [];

    for (const i of Tags) {
        tageStr+= `<li class="alert alert-danger m-2 p-1" >${i}</li>`;
    }
      
    rowData.innerHTML+=`
                <div class="col-md-4">
                <img class="w-100 rounded-3" src="${mealData.strMealThumb}" alt="">
                    <h2>${mealData.strCategory}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${mealData.strInstructions} </p>
                    <h3><span class="fw-bolder">Area : </span>${mealData.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${mealData.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${Ingredient}
                    </ul>

                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tageStr}
                    </ul>

                    <a target="_blank" href="${mealData.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${mealData.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
        `;
        
 

}

//----------------------------------------------------------------********************************----------------------------------------------------------------
//api calling
//search By Name  get api calls
async function searchByName(name) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        response = await response.json();
      
        response.meals ? displayAllMeals(response.meals) : displayMeals([])
        $(".inner-loading-screen").fadeOut(300)
    
}

//search By FLetter api calls
async function searchByFLetter(fLetter) {
    closeSideNav();
    rowData.innerHTML="";
    fLetter==""? fLetter="a":"";

    $(".inner-loading-screen").fadeIn(300);
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fLetter}`)
        response = await response.json();
        response.meals ? displayAllMeals(response.meals) : displayMeals([]);
        $(".inner-loading-screen").fadeOut(300)
    
}


//get Category api calls
    async function searchByCategory() {
        closeSideNav();
        rowData.innerHTML="";
        $(".inner-loading-screen").fadeIn(300);
         let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            response = await response.json();
   
            response.categories ? displayAllCategory(response.categories) : displayAllCategory([])
            $(".inner-loading-screen").fadeOut(300)
        
    }

//get Area api calls
    async function searchByArea() {
        closeSideNav();
        rowData.innerHTML="";
        $(".inner-loading-screen").fadeIn(300);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            response = await response.json();
        
            response.meals ? displayAllArea(response.meals) : displayAllArea([])
            $(".inner-loading-screen").fadeOut(300)
        
    }
//get  Ingredients api calls
async function searchByIngredients() {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        response = await response.json();
    
        response.meals ? displayAllIngredients(response.meals.slice(0, 20)) : displayAllIngredients([])
        $(".inner-loading-screen").fadeOut(300)
    
}
//get  meal details api calls
async function getMealData(mealID) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        response = await response.json();
    
        response.meals ? displayMealDetails(response.meals[0]) : "";
        $(".inner-loading-screen").fadeOut(300)
    
}
//get  category meal details api calls
async function getCategoryMeal(category) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        response = await response.json();
    
        response.meals ? displayAllMeals(response.meals.slice(0, 20)) : displayAllMeals([]);
        $(".inner-loading-screen").fadeOut(300)
    
}
//get  area meal details api calls
async function getAreaMeal(area) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        response = await response.json();
    
        response.meals ? displayAllMeals(response.meals.slice(0, 20)) : displayAllMeals([]);
        $(".inner-loading-screen").fadeOut(300)
    
}

//get  Ingredients details api calls
async function getIngredientsMeal(Ingredients) {
    closeSideNav();
    rowData.innerHTML="";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
        response = await response.json();
    
        response.meals ? displayAllMeals(response.meals.slice(0, 20)) : displayAllMeals([]);
        $(".inner-loading-screen").fadeOut(300)
    
}


//----------------------------------------------------------------********************************----------------------------------------------------------------

//show contact inputs
function showContactInputs() {
rowData.innerHTML=`
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
                <div class="row g-4">
                <div class="col-md-6  ">
                <input id="name-input" class="form-control name-input" type="text" placeholder="Enter Your Name">
                <div class="name-alert alert alert-danger my-2 d-none" role="alert">
                     Special characters and numbers not allowed
                </div>
                </div>
                <div class="col-md-6">
                <input id="mail-input"  class="form-control mail-input" type="email" placeholder="Enter Your Email">
                <div class="mail-alert alert alert-danger my-2 d-none" role="alert">
                Email not valid *exemple@yyy.zzz
                </div>
                </div>
                <div class="col-md-6">
                <input id="phone-input"  class="form-control phone-input" type="tel" placeholder="Enter Your Phone">
                <div class="phone-alert alert alert-danger my-2 d-none" role="alert">
                   Enter valid Phone Number
                </div>
                </div>
                <div class="col-md-6">
                <input id="age-input"   class="form-control age-input" type="number" placeholder="Enter Your Age">
                <div class="alert alert-danger my-2 d-none age-alert" role="alert">
                    Enter valid age
                </div>
                </div>
                <div class="col-md-6">
                <input id="password-input"  class="form-control password-input " type="password" placeholder="Enter Your Password">
                <div class="alert alert-danger my-2 d-none password-alert" role="alert">
                         Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
                </div>
                <div class="col-md-6">
                <input id="repassword-input"  class="form-control repassword-input " type="password" placeholder="Repassword">
                <div class="alert alert-danger my-2 d-none repassword-alert" role="alert">
                       Enter valid repassword
                </div>
                </div>
                <div class="col-md-12 text-center">
                <button id="submitBtn" class="btn btn-dark border border-danger px-3 text-danger" disabled>Sumbit</button>
                </div>
                </div>
            </div>
        </div>

`;
submitBtn=document.getElementById("submitBtn");
let getAllInputs=document.querySelectorAll('input');
    // for (const i of getAllInputs) {

    //     i.addEventListener("input", () => {
    //         checkAllInputsValisation();
    //         const myArray = i.id.split("-");
    
            
    //         })
            
    // }
    document.getElementById("name-input").addEventListener("input", () => {
        checkName() ;
    })

    document.getElementById("mail-input").addEventListener("input", () => {
       checkMail();
    })

    document.getElementById("phone-input").addEventListener("input", () => {
      checkPhone();
    })

    document.getElementById("age-input").addEventListener("input", () => {
      checkAge();
    })

    document.getElementById("password-input").addEventListener("input", () => {
    checkPassword();
    })

    document.getElementById("repassword-input").addEventListener("input", () => {
       checkRepassword();
    })

}

//Contact us functions validation

//-------------------------------------------------- check name ----------------------------------------------------------------
function checkName() {
    if (ValidationName()) {
        $('.name-alert').removeClass( "d-block" );
        $('.name-alert').addClass( "d-none" ); 
        activateSumbit() ;
    } else {
        $('.name-alert').addClass( "d-block" );
        $('.name-alert').removeClass( "d-none" );
    }

}
//-------------------------------------------------- check mail ----------------------------------------------------------------
function checkMail() {
    if (ValidationEmail()) {
        $('.mail-alert').removeClass( "d-block" );
        $('.mail-alert').addClass( "d-none" );
        activateSumbit() ;
    } else {
        $('.mail-alert').addClass( "d-block" );
        $('.mail-alert').removeClass( "d-none" );
    }
}
//-------------------------------------------------- check phone ----------------------------------------------------------------
function checkPhone() {
    if (ValidationPhone()) {
        $('.phone-alert ').removeClass( "d-block" );
        $('.phone-alert ').addClass( "d-none" );
        activateSumbit() ;
        } else {
            $('.phone-alert ').addClass( "d-block" );
            $('.phone-alert ').removeClass( "d-none" );
        }
}
//-------------------------------------------------- check age ----------------------------------------------------------------
function checkAge() {
    if (ValidationAge()) {
        $('.age-alert ').removeClass( "d-block" );
        $('.age-alert ').addClass( "d-none" );
        activateSumbit() ;
       
    } else {
        $('.age-alert ').addClass( "d-block" );
        $('.age-alert ').removeClass( "d-none" );
    }
}
//-------------------------------------------------- check password ----------------------------------------------------------------
function checkPassword() {
    if (ValidationPassword()) {
        $('.password-alert').removeClass( "d-block" );
        $('.password-alert').addClass( "d-none" );
        activateSumbit() ;
} else {
        $('.password-alert').addClass( "d-block" );
        $( '.password-alert').removeClass( "d-none" );
    }
}
//-------------------------------------------------- check Repassword ----------------------------------------------------------------
function checkRepassword() {
    if (ValidationRepassword()) {
        $('.repassword-alert').removeClass( "d-block" );
        $('.repassword-alert').addClass( "d-none" );
        activateSumbit() ;
     
    } else {
        $('.repassword-alert').addClass( "d-block" );
        $( '.repassword-alert').removeClass( "d-none" );
    }
}

//--------------------------------------------------------------------------------------------------------------------
function activateSumbit() {
        if (ValidationName() &&  ValidationEmail() && ValidationPhone() && ValidationAge() && ValidationPassword() &&  ValidationRepassword()) 
             {submitBtn.removeAttribute("disabled"); }
       else { submitBtn.setAttribute("disabled", true);  }
    
}
 

//redgex validation
function ValidationName() {
    return (/^[a-zA-Z ]+$/.test($('.name-input').val() ))
}

function ValidationEmail() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('.mail-input').val() ))
}

function ValidationPhone() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test( $('.phone-input').val() ))
}

function ValidationAge() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($('.age-input').val() ))
}

function ValidationPassword() {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test( $('.password-input').val()))
}

function ValidationRepassword() {
    return  $('.repassword-input').val() == $('.password-input').val() ;
}

//---------------------------------------------------------------- show search inputs----------------------------------------------------------------

function showSearchInputs() {
    $('.search-container').html(`
   
    <div class="container">
            <div class="row py-5 g-4 " id="row-data">
                <div class="col-md-6">
                    <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
                </div>
                <div class="col-md-6">
                    <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
                </div>
            </div>  
    </div>
  
 `);
    rowData.innerHTML="";

}