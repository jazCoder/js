/**
* mod of isotope.js for paincareclinic.co.uk
* selects videos based on 3 dropdown categories
* Feb 2019. Greg Birch
*
*/

$(document).ready(function (){
    
  var $vidSection = $('.vidSection');
  var showsingle = true; 
  // store filter for each group
  var filters = {};
  var $selects = $('.ui-group select');
  var iso = $vidSection.data('isotope');
  var $filterCount = $('.filter-count'); 


  
  $vidSection.imagesLoaded(function() {
    $vidSection.isotope({
      itemSelector: '.new-vid-thumb'
    });
  });
    
    
  $selects.change(function( event ) { 
    saveSelection("cats");
    saveSelection("paincon");
    saveSelection("bodyarea"); 
    $('.vidSection').css("display", "flex");
    $('#single-vid').css("display", "none"); 
      var $this = $(this); 
      var $button = $( event.currentTarget );
      // get group key
      var filterGroup = $this.attr('data-filter-group');
      // add selected data-filter
      filters[ filterGroup ] = $('#' + $this.attr('id') + ' option:selected').attr('data-filter');
      // combine filters
      var filterValue = concatValues( filters );
      // set filter for Isotope
      $vidSection.isotope({ filter: filterValue });
  });
          
          
  function saveSelection(item) {
    sessionStorage.setItem(item, $('#' + item + ' option:selected').attr('data-filter')); 
  }           

  function getSelection(item) {
    $("#" + item).val(sessionStorage.getItem(item));
    return notBlank(sessionStorage.getItem(item));
  }
             
  function notBlank(val){
    return (val === undefined || val == null || val.length <= 0) ? false : true;
  }
  
  // flatten object by concatting values
  function concatValues( obj ) {
    var value = '';
    for ( var prop in obj ) {
      value += obj[ prop ];
    }
    return value;
  }
  
  $vidSection.on( 'arrangeComplete', function( event, filteredItems ) {
    var vidCount = (filteredItems.length == 1) ? " video" : " videos" ;
    $filterCount.text(filteredItems.length + vidCount);
  });
  
  $('.vid-img').hover(function() {
    $(this).find('.vid-overlay').slideDown("fast");
  }, function() {
        $(this).children('.vid-overlay').slideUp("fast");
     }
  );
  
  $("#selectall").on("click", function(e) {
    $("#cats").prop('selectedIndex', 0);
    $("#cats").change();
    $("#paincon").prop('selectedIndex', 0);
    $("#paincon").change();
    $("#bodyarea").prop('selectedIndex', 0);
    $("#bodyarea").change();
    e.preventDefault();          
  });
          
  if (getSelection("cats"))
    showsingle = false;
  if (getSelection("paincon"))
    showsingle = false;
  if (getSelection("bodyarea"))
    showsingle = false;
  
  if(!showsingle) {
    console.log("no single"); 

    $('.vidSection').css("display", "flex");
    $('#single-vid').css("display", "none"); 
    $selects.trigger( "change" ); 
  }   
    
});


