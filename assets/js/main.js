
(function ($) {
    'use strict';

          $(window).on('load', function () {
            
            /*  -------------------------------------------------------------------------  *
             *                            Preloader                                        *
             *  -------------------------------------------------------------------------  */
            $('#preloader').delay(300).fadeOut('slow',function(){
              $(this).remove();
            });


          });
          

          $(document).ready(function () {




            /*  -------------------------------------------------------------------------  *
             *                            Sticky Menu                                      *
             *  -------------------------------------------------------------------------  */
            $(".menu-area > .sticky").sticky({
                topSpacing: 0,
            });

            

            /*  -------------------------------------------------------------------------  *
             *                            Portfolio                                        *
             *  -------------------------------------------------------------------------  */
            
              $('.works .work-items').isotope({
                itemSelector: '.col-md-4'
            });

            // init Isotope
            var $container = $('.work-items').isotope({
                itemSelector: '.item'
            });

            // filter functions
            var filterFns = {
                // show if number is greater than 50
                numberGreaterThan50: function () {
                    var number = $(this).on('.number').text();
                    return parseInt(number, 10) > 50;
                },
                // show if name ends with -ium
                ium: function () {
                    var name = $(this).on('.name').text();
                    return name.match(/ium$/);
                }
            };

            // bind filter button click
            $('#filters').on('click', 'li', function () {
                var filterValue = $(this).attr('data-filter');
                // use filterFn if matches value
                filterValue = filterFns[filterValue] || filterValue;
                $container.isotope({
                    filter: filterValue
                });
            });

            // change is-checked class on buttons
            $('.filters').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'li', function () {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                });
            });
        



        /*  -------------------------------------------------------------------------  *
         *                     Skills Progress bar                                     *
         *  -------------------------------------------------------------------------  */        
            var skillbar = $(".skillbar");
            skillbar.waypoint(function () {
                skillbar.each(function () {
                    $(this).find(".skillbar-child").animate({
                        width: $(this).data("percent")
                    }, 1000);
                });
            }, {
                offset: "80%"
            });

        


        /*  -------------------------------------------------------------------------  *
         *                            Navigation js                                    *
         *  -------------------------------------------------------------------------  */

            $(document).on('click', '.navbar-collapse.in', function (e) {
              if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                  $(this).collapse('hide');
              }
            });

            $('body').scrollspy({
              target: '.navbar-collapse',
              offset: 195
            });

            $(document).ready(function(){
                $('a[href^="#"]').on('click',function (e) {
                    e.preventDefault();

                    var target = this.hash;
                    var $target = $(target);

                    $('html, body').stop().animate({
                        'scrollTop': $target.offset().top
                    }, 900, 'swing', function () {
                        window.location.hash = target;
                    });
                });
            });




        /*  -------------------------------------------------------------------------  *
         *                            Contact Form                                     *
         *  -------------------------------------------------------------------------  */

          // Get the form.
          var form = $('#ajax-contact');

          // Get the messages div.
          var formMessages = $('#form-messages');

          // Set up an event listener for the contact form.
          $(form).on('submit', function(e) {
              // Stop the browser from submitting the form.
              e.preventDefault();

              // Serialize the form data.
              var formData = $(form).serialize();

              // Submit the form using AJAX.
              $.ajax({
                  type: 'POST',
                  url: $(form).attr('action'),
                  data: formData
              })
              .done(function(response) {
                  // Make sure that the formMessages div has the 'success' class.
                  $("#form-messages").removeClass('error');
                  $("#form-messages").addClass('success');

                  // Set the message text.
                  $(formMessages).text(response);

                  // Clear the form.
                  $('#name').val('');
                  $('#email').val('');
                  $('#subject').val('');
                  $('#message').val('');
              })
              .fail(function(data) {
                  // Make sure that the formMessages div has the 'error' class.
                  $("#form-messages").removeClass('success');
                  $("#form-messages").addClass('error');

                  // Set the message text.
                  if (data.responseText !== '') {
                      $(formMessages).text(data.responseText);
                  } else {
                      $(formMessages).text('Oops! An error occured and your message could not be sent.');
                  }
              });

          });

      });

     

  })(jQuery);