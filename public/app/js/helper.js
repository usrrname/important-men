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

$('#wrapper').fadeIn(1400);
//accessible button-cliks WIP
const handleBtnClick = (event) => {
	toggleButton(event.target);
  };

const toggleButton = (element) => {
// Check to see if the button is pressed
let pressed = (element.getAttribute('aria-pressed') === 'true');
// Change aria-pressed to the opposite state
element.setAttribute('aria-pressed', !pressed);
  };

const handleBtnKeyPress = (event) => {
// Check to see if space or enter were pressed
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    toggleButton(event.target);
}
};