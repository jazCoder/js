/**
*
* search list of schools and change display.
* created for NextGen Clothing new website.
* May 2019. Greg Birch
*/

var countOS = 0;
var resetOS = false;

jQuery('.school-input').on('change keyup', function () {
    countOS++;
    schoolDisplay();
});

jQuery('.reset-school-list').click(function () {
    resetOS = true;
    document.getElementById("schoolInput").value = '';
    schoolDisplay();
});

function schoolDisplay() {

    var inputOS, filterOS, ulOS, liOS, aOS, i, noSchools;
    inputOS = document.getElementById("schoolInput").value;
    filterOS = inputOS.toUpperCase();
    ulOS = document.getElementById("allSchools");
    liOS = ulOS.getElementsByTagName("li");
    if (inputOS.length == 0) { 
      resetOS=true;
      countOS = 0; 
    }
    
    if(countOS>2 || resetOS) {
      jQuery(ulOS).animate({opacity: 0}, 100, function() {
         replaceSchools();
         setTimeout(replaceList, 100);
      });
    }
   
    function replaceSchools() {
        resetOS = false;
        noSchools=true;
        for (i = 0; i < liOS.length; i++) {
          aOS = liOS[i].getAttribute('data-school-name').toUpperCase();
          if (inputOS == 0) {
            noSchools=false;
            liOS[i].style.display = "";
          } else if (aOS.toUpperCase().indexOf(filterOS) == 0) {
            noSchools=false;
            liOS[i].style.display = "";
          } else {
            liOS[i].style.display = "none";
          }  
        }
        noSchoolErr();
    }
     
    function replaceList() {
        jQuery(ulOS).animate({opacity: 1}, 200);   
    }
    
    function noSchoolErr() {
        displayProp = (noSchools ? 'block' : 'none' );
        jQuery('.sch-list-err').css('display', displayProp);
    }
    
}

