$(document).ready(function(){

    // Slide submit form on click
    $('#submit').on('click', function(e) {
    	$('#form').slideToggle('slow');  
    });


    
    // Extract the domain name from the website
    function website(str) {
	  for (var i = 7; i < str.length; i++) {
	    if (str[i]+str[i+1]+str[i+2]+str[i+3] === 'www.') {
	      var value = str.split('www.');
	      return value[value.length-1];
	    } else {
	      var http = str.split('//');
	      return http[http.length-1];
	    }
	  }
	}
    

    // Append the new element once the form has been submitted 
    $('#form').on('submit', function(e) {
    	//Check to see if URL is valid
    	var title = $('input').eq(0).val()
    	var url = $('input').eq(1).val()
    	
    	var cleanurl = website(url);



        
    	var newLi = `<li><span class="fa fa-star-o"></span><b> ${title}</b><span class="link"> (${cleanurl})</span></li>`;
    	//If yes, append

    	$('.urlLinks').append(newLi);
    	$('#form').slideToggle('slow');

    	$('#form').trigger('reset');
   
    });

    // Event Delegation must be used as new items are added. They wont have the event listener
    // Make the stars clickable if want to add to favorite
    $("ol").on("click", ".fa-star-o", function(e){
        $(e.target).toggleClass("fa-star").toggleClass("fa-star-o")
    })

    $("ol").on("click", ".fa-star", function(e){
        $(e.target).toggleClass("fa-star-o").toggleClass("fa-star")
    })


    // Filter out the favorites
    $("#favorites").on("click", function(e){
        $text = $("#favorites").text()


        if($text === "Favorites"){
            // Change text
            $("#favorites").text("All")


            // Hide if has empty star
            $("li").filter(function(i, el){
                return $(el).children().hasClass("fa-star-o")
            }).hide()

        } else {
            $("#favorites").text("Favorites")
            $("li").show()
        }


    })


    // Use event delegationt to add listener on ol
    // Filter down to only show elements which have the same domain name
    $("ol").on("click", ".link", function(e){
        var $hostName = $(e.target).text()

        $("li").filter(function(i, el){
            return $(el).find(".link").text() !== $hostName
        }).hide()

        $("#favorites").text("All")

    })

    // AJAX Portion


});

    
// JAVASCRIPT FOR MODAL!!
    function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
    }
    function showLoginForm(){
        $('#loginModal .registerBox').fadeOut('fast',function(){
            $('.loginBox').fadeIn('fast');
            $('.register-footer').fadeOut('fast',function(){
                $('.login-footer').fadeIn('fast');    
            });
            
            $('.modal-title').html('Login with');
        });       
         $('.error').removeClass('alert alert-danger').html(''); 
    }

    function openLoginModal(){
        showLoginForm();
        setTimeout(function(){
            $('#loginModal').modal('show');    
        }, 230);
        
    }
    function openRegisterModal(){
        showRegisterForm();
        setTimeout(function(){
            $('#loginModal').modal('show');    
        }, 230);
        
    }

    function loginAjax(){
        /*   Remove this comments when moving to server
        $.post( "/login", function( data ) {
                if(data == 1){
                    window.location.replace("/home");            
                } else {
                     shakeModal(); 
                }
            });
        */

    /*   Simulate error message from the server   */
         shakeModal();
    }

    function shakeModal(){
        $('#loginModal .modal-dialog').addClass('shake');
                 $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
                 $('input[type="password"]').val('');
                 setTimeout( function(){ 
                    $('#loginModal .modal-dialog').removeClass('shake'); 
        }, 1000 ); 
    }