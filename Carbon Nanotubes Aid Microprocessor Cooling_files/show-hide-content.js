jQuery(document).ready(function(){
  
  if (getCookie('email-to-pardot') == '1') {
    jQuery('.restricted-content').show();
  } else {
    jQuery('.restricted-form').show();
  }

});