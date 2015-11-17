function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

jQuery(document).ready(function(){
  
  if (getCookie('email-to-pardot') == '1') {
    jQuery('#comment_form_wrapper').show();
  } else {
    jQuery('#gravity_form_wrapper').show();
  }

  jQuery('#gform_2, #gform_3, #gform_5').submit(function(){
    createCookie('email-to-pardot', 1, 10*12*30);
  });

});