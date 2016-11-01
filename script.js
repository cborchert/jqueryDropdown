jQuery( "document" ).ready( function($){
   
    //add the data attributes to the li.lb-dropdown-option
    $(".lb-dropdown-option").each( function( i, e ) {
    
        var innerText = $(e).text(),
            href = $(e).find("a")[0].href;
        
        $(e).attr( "data-text", innerText).attr("data-href", href );
        
    });
    
    //Prevent default link click action
    $(".lb-dropdown-options").on( "click", "a", function(e) {
       
        e.preventDefault();
        
    });
    
    //On option click
    $(".lb-dropdown-options").on( "click", "li", function(e) {
       
        
        //Change selected text
        $(this).closest(".lb-dropdown").find(".lb-dropdown-selected")[0].innerHTML = $(this).data("text");
        
        //Close dropdown
        $("body").removeClass("lb-dropdown-open");
        $(this).closest(".lb-dropdown").removeClass("lb-dropdown-open");
        
        //Set selected
        $(this).closest(".lb-dropdown-options").find(".selected").removeClass("selected");
        $(this).addClass("selected");
        
        $(this).closest(".lb-dropdown").data("value", $(this).data("value"));
        $(this).closest(".lb-dropdown").find("input").val($(this).data("value"));
        
        //Navigate
        window.location = $(this).data("href");
        
        
    });
    
    //On selected click
    $(".lb-dropdown").on( "click", ".lb-dropdown-selected", function(e) {
       
        e.stopPropagation();
        
        //Toggle open class
        $("body").toggleClass("lb-dropdown-open");
        $(this).closest(".lb-dropdown").toggleClass("lb-dropdown-open");
        
        //Direction of options window
        var winOffsetTop = $(window).scrollTop(),
            winHeight    =  window.innerHeight,
            winBottomOffsetTop = winOffsetTop + winHeight,
            elOffsetTop = $(this).offset().top,
            elHeight = $(this).height(),
            elDistanceBottom = (winBottomOffsetTop - elOffsetTop),
            elDistanceTop = (elOffsetTop - winOffsetTop);
        
        if( $(this).closest(".lb-dropdown").hasClass("lb-dropdown-open") ) {
        
            if( elDistanceBottom < elDistanceTop ) {
                
                console.log('up');
                $(this).closest(".lb-dropdown").find(".lb-dropdown-options").addClass("direction-up");
                
                
            } else {
                console.log('down');
                $(this).closest(".lb-dropdown").find(".lb-dropdown-options").removeClass("direction-up");
                
            }
            
        }
            
    });
    
    $("body").on("click", function(e) {
        
        
        if( $("body").hasClass("lb-dropdown-open") ){
        
            e.preventDefault();
            $("body").removeClass("lb-dropdown-open");
            $(".lb-dropdown").removeClass("lb-dropdown-open");
            
        }
        
    });
    
});