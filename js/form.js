$(function()
{
    function after_form_submitted(data)
    {
        if(data == 'success')
        {
            $('form#reused_form').show();
            $('#success_message').show();
            $('#error_message').hide();
            $('#error_recaptcha').hide();
            //clear fields
            $('input[type="text"],textarea').val('');
            $('input[type="email"],textarea').val('');
            grecaptcha.reset();
            
        }
        
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            // warn to select recaptcha checkbox to continue if not done yet:
            if(data =='recaptcha missing')
            {
                $('#success_message').hide();
                $('#error_message').hide();
                $('#error_recaptcha').show();
            }
            else{
                $('#success_message').hide();
                $('#error_message').show();
            }

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' );
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });

        }//else
    }

        $('#reused_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            //$btn.prop('type','button' );
            //$btn.prop('orig_label',$btn.text());
            //$btn.text('Siunčiama ...');
        });


                    $.ajax({
                type: "POST",
                url: 'http://laselis.lt/kontakciukai/onemore/phpmailer/processor.php',
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'text'
            });

      });
});
