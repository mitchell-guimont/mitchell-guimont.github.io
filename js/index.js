function onScrollInit(items, elemTrigger) {
  var offset = $(window).height() / 1.4;
  items.each(function() {
    var elem = $(this),
      animationClass = elem.attr('data-animation'),
      animationDelay = elem.attr('data-delay');

    elem.css({
      '-webkit-animation-delay': animationDelay,
      '-moz-animation-delay': animationDelay,
      'animation-delay': animationDelay
    });

    var trigger = elemTrigger ? trigger : elem;

    trigger.waypoint(
      function() {
        elem.addClass('animated').addClass(animationClass);
      },
      {
        triggerOnce: true,
        offset: offset
      }
    );
  });
}

$(function () {
  // Load animations while scrolling
  onScrollInit($('.waypoint'));

  // Contact form submission
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');

  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');

      // If form is valid, then submit it
      if (form.checkValidity()) {
        event.preventDefault();

        var status = document.getElementById("contactFormStatus");
        var data = new FormData(event.target);
        var statusHTML = "<div class='alert alert-#TYPE#'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>#MESSAGE#</strong></div>";
    
        fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: {
              'Accept': 'application/json'
          }
        }).then(response => {
          status.innerHTML = statusHTML.replace("#TYPE#", "success").replace("#MESSAGE#", "Your message has been sent successfully!");
          form.classList.remove('was-validated');
          form.reset();
        }).catch(error => {
          status.innerHTML = statusHTML.replace("#TYPE#", "danger").replace("#MESSAGE#", "Oops! There was a problem submitting your form. Please try again later!");
        });
      }

    }, false);
  });
  
  // Add current year to footer
  $("span.year").text((new Date()).getFullYear());
});
