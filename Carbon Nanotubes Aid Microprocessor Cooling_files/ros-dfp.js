var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
var gads = document.createElement('script');
gads.async = true;
gads.type = 'text/javascript';
var useSSL = 'https:' == document.location.protocol;
gads.src = (useSSL ? 'https:' : 'http:') +
'//www.googletagservices.com/tag/js/gpt.js';
var node = document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(gads, node);
})();

var dfpslots = [];

googletag.cmd.push(function() {
googletag.pubads().collapseEmptyDivs();
dfpslots[0] = googletag.defineSlot('/26202285/HPC-BTM-FB-468x60', [468, 60], 'div-gpt-ad-1409772249024-0').addService(googletag.pubads());
dfpslots[1] = googletag.defineSlot('/26202285/HPC-RSB-MR-300x250', [300, 250], 'div-gpt-ad-1409772249024-1').addService(googletag.pubads());
dfpslots[2] = googletag.defineSlot('/26202285/HPC-RSB-WSKY-160x600', [160, 600], 'div-gpt-ad-1409772249024-2').addService(googletag.pubads());
dfpslots[3] = googletag.defineSlot('/26202285/HPC-RSB-WVB-BTM-160x200', [160, 200], 'div-gpt-ad-1409772249024-3').addService(googletag.pubads());
dfpslots[4] = googletag.defineSlot('/26202285/HPC-RSB-WVB-MID-160x200', [160, 200], 'div-gpt-ad-1409772249024-5').addService(googletag.pubads());
dfpslots[5] = googletag.defineSlot('/26202285/HPC-RSB-WVB-TOP-160x200', [160, 200], 'div-gpt-ad-1409772249024-6').addService(googletag.pubads());
dfpslots[6] = googletag.defineSlot('/26202285/HPC-TOP-LB-728x90', [728, 90], 'div-gpt-ad-1409772249024-8').addService(googletag.pubads());
googletag.pubads().enableSingleRequest();
googletag.enableServices();
});

// ******* REMEMBER TO UPDATE SCRIPT VERSION NUMBER IN /includes/enqueue-dfp.php TO FORCE A NEW COPY OF THIS
// ******* FILE TO BE DOWNLOADED WHEN CHANGES ARE MADE, SUCH AS ADDING NEW AD ZONES **************

// setInterval(function(){googletag.pubads().refresh([dfpslots[0], dfpslots[1], dfpslots[2], dfpslots[3], dfpslots[7]]);}, 90000);
