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

const imgContainer = document.getElementById('landingPhotos');
imgContainer.addEventListener('click', () => {
        console.log('clicked');
        let selectedImg = imgContainer.getElementsByTagName("img");
        let links = imgContainer.getElementsByTagName("a");
        for (let i = 0; i< links.length; i++){
                const selectedLink = links[i].href;
                console.log(selectedLink);
        }
        condition = () =>{
                window.location(url) = selectedLink;
         }
      });

        

$('#wrapper').fadeIn(1400);