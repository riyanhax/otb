$(document).ready(function() {
    $('a[href="#"]').click(function(e){
        e.preventDefault();
    });

    $('.m_lead-form input').on('focus', function(){
        $(this).parent().addClass('focused');
    });
    $('.m_lead-form input').on('blur', function(){
        $(this).parent().removeClass('focused');
    });

    // Forms
    // Маска для телефона
    $("[type='tel']").mask("+7(999) 999-99-99");
    //

    // Обработка форма на AJAX
    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    },
                          "Введите полный номер.");
    $.validator.addMethod("requiredphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 1;
    },
                          "Это поле необходимо заполнить.");

    $(".form").each(function(){
        $(this).validate({
            rules: {
                name: {
                    required: true,
                },
                tel: {
                    requiredphone: true,
                    minlenghtphone: true

                }
            },
            submitHandler: function(form, event){
                event = event || window.event;
                $(form).ajaxSubmit({
                    //dataType: 'script',
                    error: function(){
                        alert("Ошибка!");
                    },
                    success: function(responseText, statusText, xhr){
                            // Отправка данных формы в Comagic
                            /*
                            Comagic.addOfflineRequest({
                                name: $(form).find('[name="name"]').val(),
                                phone: $(form).find('[name="tel"]').val(),
                            });
                            */
                            // Цель на отправку формы
                            /****  Поменять номер счетчика ****/
                            //yaCounter29402220.reachGoal('ORDER');

                            // Очистка форм после отправки
                            $('.form-input').val('');

                            // Появление "спасибо"
                            // $('.popup').fadeOut();
                            // $('.popup_thank_you').centered_popup();
                            // $('.overlay').fadeIn();
                            // $('.popup_thank_you').fadeIn();

                            // Через 5 сек скрываем "спасибо"
                            //setTimeout(function(){
                            //    $('.popup_thank_you').fadeOut(500);
                            //    $('.overlay').fadeOut(500);
                            //}, 5 * 1000);
                }
            });
                return false;
        }
        });
    });
    // end Forms

    $('.radio-custom input[type="radio"]').on('change', function(){
        $('.tooltip').hide();
    });

    // Tabs
    var $tabsNavLink = $('.tabs-nav a');
    $('.tabs-item').hide();
    $('.tabs-content').find('.tabs-item:first').show();
    $('.tabs-nav').find('li:first').find('a').addClass('current');

    $tabsNavLink.click(function(e) {
      e.preventDefault();
      $tabsNavLink.removeClass('current');
      $(this).addClass('current');
      $(this.hash).show().siblings().hide();
    });
    // end Tabs

    // Video
    $('video,audio').mediaelementplayer({
        alwaysShowControls: true
    });

    // end Video

    // Carousel
    $('.carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.carousel-nav'
    });
    $('.carousel-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.carousel',
      dots: true,
      centerMode: false,
      focusOnSelect: true
    });
    // end Carousel


    $('.popup-modal').magnificPopup({
        type: 'inline'
    });

    $('.move-down, .how-to a').on('click', function(){
        $('html,body').animate({
           scrollTop: $(".m_demo").offset().top - 80
        });
    });

    $('.sbm-dis').prop('disabled', true).addClass('dis');
    $('.check-older').click(function() {
        if ($(this).prev().is(':checked')) {
            $(this).parents('.form').find('.sbm-dis').attr('disabled', 'disabled').addClass('dis');
        } else {
            $(this).parents('.form').find('.sbm-dis').removeClass('dis').removeAttr('disabled');
        }
    });

    //$('.radio-custom').on('click', function(){
    //    $(this)
    //});
    $('.form-submit').on('click', function(){
        var currencyVal = $(this).parents('.form').find('input[type="radio"]:checked').val();
        $(this).parents('.form').find('input[name="input_type"]').val(currencyVal);
    });

    $(window).load(function(){
        $('.anyClass').css('opacity', '1')
        $('.anyClass').liMarquee({
            circular: true
        });
    })

});