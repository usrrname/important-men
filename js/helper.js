//landing menu slide
$(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        // Assign active class to nav links while scolling
        $('img').each(function(i) {
                if ($(this).position().top <= scrollDistance) {
                        $('#menu a.active').removeClass('active');
                        $('#menu a').eq(i).addClass('active');
                }
        });
    }).scroll();
    
$(document).ready(function() {
    $('#menu a[href*=\\#]:not([href=\\#])').bind('click', function(e) {
            e.preventDefault(); // prevent hard jump, the default behavior

            var target = $(this).attr("href"); // Set the target as variable

            // perform animated scrolling by getting top-position of target-element and set it as scroll target
            $('html, body').stop().animate({
                    scrollTop: $(target).offset().top
            }, 770, function() {
                    location.hash = target; //attach the hash (#jumptarget) to the pageurl
            });

            return false;
    });
});

$('#wrapper').fadeIn(1400);

document.addEventListener("touchstart", function(){}, true);

//toggle show/hide 

const wasClicked = false;
const button = document.querySelector('.btn');

button.addEventListener('click', (e) => {
        const allresults = document.getElementsByClassName('results'); 
        if(wasClicked == "false")
        {
        button.classList.toggle('active');
        allresults.style.display == "block";
        [].map.call(document.querySelectorAll('.toggle-me'), (el) => {
                // classList supports 'contains', 'add', 'remove', and 'toggle'
                el.classList.toggle('toggle');  
                wasClicked = true;    
        });
        
        }
        // if (wasClicked !== "false"){
        //         let end;
        //         button.classList.toggle('active');
        //         end = allresults.style.display == "none" ? "block" : "none";
        // }
        
});

