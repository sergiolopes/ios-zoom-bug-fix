$(document).ready(function(){
	
	$('a.scrollto').scroller();
    
});



// FOOTER TO TOP SCROLL
$.fn.scroller = function()
{
    return this.each( function()
    {
        $(this).click( function()
        {
            var scroll_target = $(this).attr('href');
            $.scrollTo(scroll_target,800); 
            return false;
        });  
    });
}
