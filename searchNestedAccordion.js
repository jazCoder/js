/**
* Search nested accordion for text pattern
*
*/

$(document).ready(function() {
      
    // main accordion
    function close_accordion_section() {
      $('.accordion .accordion-section-title').removeClass('active');
      $('.accordion .accordion-section-content').slideUp(300).removeClass('open');    
    }
        
    $('.accordion-section-title').click(function(e) {
        var currentAttrValue = $(this).attr('href');
        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
        	close_accordion_section();
        	$(this).addClass('active');
        	$('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
        e.preventDefault();
    }); // end main accordion
    
    // sub accordion
    function close_sub_accordion_section() {
      $('.accordion .accordion-sub-section-title').removeClass('active');
      $('.accordion .accordion-sub-section-content').slideUp(300).removeClass('open');
    }
        
    $('.accordion-sub-section-title').click(function(e) {
        var currentAttrValue = $(this).attr('href');
        if($(e.target).is('.active')) {
        	close_sub_accordion_section();
        }else {
        	close_sub_accordion_section();
        	$(this).addClass('active');
        	$('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
        e.preventDefault();
    }); // end sub accordion
    
    function close_unwanted_accordion() {
        $('.accordion-section-content').each(function() {
            top_acc_id = parseInt($(this).attr('id').split("-")[1]);
            if (top_acc_id != childIdInt ) {
                $(this).slideUp(300).removeClass('open');    
            }
        });
    }
     
    // activity in search box       
    $('#faq_search').on('change keyup paste click', function () {
        faqSearch();
    });
    
    // next result click
    $("#faq_btn_next").click(function(){
        close_sub_accordion_section();
        var new_skip_index = parseInt($("#faq_btn_next").attr('data')) + 1;
        $("#faq_btn_next").attr('data',new_skip_index);
        faqSearch();
    });
    
    
  function faqSearch() {
    $('.faq_highlight').contents().unwrap();
    var faq_term = $("#faq_search").val().toLowerCase();
    var match_found = false;
    var title = '';
    var content = '';
    var skip_count = 0;
    var skip_index = parseInt($("#faq_btn_next").attr('data'));
      
    if (faq_term.length >= 3) {
      $('.accordion-sub-section-title, .accordion-sub-section-content').each(function() {
        var txt = '';
        if ($(this).attr('href')) {
            txt = $(this).html().replace(/<[^>]+>/gim, '').toLowerCase();
        } else {
            txt = $(this).html().toLowerCase();
        }
        
        if (txt.indexOf(faq_term) != -1) {
             
          if (skip_index != skip_count) {
              skip_count++;
          } else { 
              var regex = new RegExp('('+faq_term+')', 'ig');
              $(this).html($(this).html().replace(regex, '<span class="faq_highlight">$1</span>'));
              childIdInt = ($(this).attr('href')) ? parseInt($(this).next().attr("id").split("-")[1]) : parseInt($(this).attr("id").split("-")[1]);  
              close_unwanted_accordion();
              $(this).parent().slideDown(300).addClass('open');
              $(this).slideDown(300).addClass('open');
              match_found = true;
              return false;
          }
        }
      }); // end .each()
    }
    
    // No match close accordion
    if (match_found == false) {
      close_accordion_section();
      $("#faq_btn_next").attr('data',0);
      $("#faq_btn_next").hide();
    } else {
      $("#faq_btn_next").show();
    } 
 
  } // end faqSearch()
            
}); // end ready()         

