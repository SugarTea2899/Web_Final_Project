

(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })


    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        if($(input).attr('type') == 'password' && $(input).attr('name') == 'password') {
            const passRepate = document.getElementById('repeat-pass').value;
            if($(input).val().length < 6) {
                return false;
            }
            else
            {
                const passRepateParent = document.getElementById('repeat-pass-parent');
                if(passRepate != $(input).val())
                {
                    passRepateParent.classList.remove('true-validate');
                    passRepateParent.classList.add('alert-validate');
                }
                else
                {
                    passRepateParent.classList.remove('alert-validate');
                    passRepateParent.classList.add('true-validate');
                }
            }
        }
        if($(input).attr('type') == 'password' && $(input).attr('name') == 'repeat-password') {
            const pass = document.getElementById('pass').value;
            if (pass != $(input).val() || $(input).val().length < 6 )
                return false;
        }

        if($(input).attr('name') == 'fullName' || $(input).attr('name') == 'username' ) {
            if($(input).val().trim() == '') {
                return false;
            }
        }

    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    


})(jQuery);