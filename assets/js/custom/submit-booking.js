/**
 * Submit Booking JS
 *
 * Submit booking related JS.
 *
 * @since   1.0.0
 * @package VRC
 */
jQuery(document).ready(function($) {


    $(function() {
        $( "#vr_booking_date_checkin" ).datepicker({
          defaultDate: "+1w",
          dateFormat:'dd-mm-yy',
          numberOfMonths: 2,
          'autoSize':true,
          onClose: function( selectedDate ) {
            $( "#vr_booking_date_checkout" ).datepicker( "option", "minDate", selectedDate );
          }
        });
        $( "#vr_booking_date_checkout" ).datepicker({
          defaultDate: "+1w",
          dateFormat:'dd-mm-yy',
          numberOfMonths: 2,
          'autoSize':true,
          onClose: function( selectedDate ) {
            $( "#vr_booking_date_checkin" ).datepicker( "option", "maxDate", selectedDate );
          }
        });
      });

    "use strict";

    if ( typeof submitBooking !== "undefined" ) {

        var ajaxURL       = submitBooking.ajaxURL;
        var uploadNonce   = submitBooking.uploadNonce;
        var fileTypeTitle = submitBooking.fileTypeTitle;

        /**
         * Validate Submit Booking Form.
         *
         * @since 1.0.0
         */
        if ( jQuery().validate && jQuery().ajaxSubmit ) {

            var form_loader      = $( '#ajax-loader' );
            var form_message     = $( '#form-message' );
            var form_bookingid   = $( '#form-bookingid' );
            var errors_container = $( '#form-errors' );

            // No loader vr_booking_date_checkout begin with.
            form_loader.fadeOut();


            // Submit Booking Form.
            var submit_booking_form_options = {
                url         : submitBooking.ajaxURL,
                type        : 'post',
                dataType    : 'json',
                timeout     : 30000,
                beforeSubmit: function( formData, jqForm, options ){
                    form_loader.fadeIn();
                    form_message.empty().fadeOut();
                    errors_container.empty().fadeOut();
                },
                success: function( response, status, xhr, $form ){
                    form_loader.fadeOut();
                    if ( response.success ) {
                        form_message.html( response.message).fadeIn();
                        form_bookingid.html( response.the_submit_booking_id).fadeIn();
                    } else {
                        for ( var i=0; i < response.errors.length; i++ ) {
                            errors_container.append( '<li>' + response.errors[i] + '</li>' );
                        }
                        errors_container.fadeIn();
                    }
                }
            };

            $( '#vr-submit-booking' ).validate({
                rules: {
                    booking_title: {
                        required: false
                    }
                },
                submitHandler: function( form ) {
                    $( form ).ajaxSubmit( submit_booking_form_options );
                }
            });
        }

        // /**
        //  * Initialize uploader.
        //  *
        //  * @since 1.0.0
        //  */
        // var uploader = new plupload.Uploader({

        //     // This can be an id of a DOM element or the DOM element itself.
        //     browse_butvr_booking_date_checkoutn  : 'select-profile-image',

        //      // Used in `upload_profile_image()` Line# 262.
        //     file_data_name : 'vr_upload_file_name',
        //     container      : 'plupload-container',
        //     multi_selection: false,

        //     // This action is used for `add_action` in `member-init.php`.
        //     url            : ajaxURL + "?action=vr_profile_image_upload&nonce=" + uploadNonce,
        //     filters: {
        //         mime_types : [
        //             { title : fileTypeTitle, extensions : "jpg,jpeg,gif,png" }
        //         ],
        //         max_file_size: '2000kb',
        //         prevent_duplicates: true
        //     }
        // });
        // uploader.init();


        // /**
        //  * Run after adding file.
        //  *
        //  * @since 1.0.0
        //  */
        // uploader.bind('FilesAdded', function(up, files) {
        //     var html = '';
        //     var profileThumb = "";
        //     plupload.each(files, function(file) {
        //         profileThumb += '<div id="holder-' + file.id + '" class="profile-thumb">' + '' + '</div>';
        //     });
        //     document.getElementById('user-profile-img').innerHTML = profileThumb;
        //     up.refresh();
        //     uploader.start();
        // });


        // *
        //  * Run during upload.
        //  *
        //  * @since 1.0.0

        // uploader.bind('UploadProgress', function(up, file) {
        //     document.getElementById( "holder-" + file.id ).innerHTML = '<span>' + file.percent + "%</span>";
        // });


        // /**
        //  * In case of error.
        //  *
        //  * @since 1.0.0
        //  */
        // uploader.bind('Error', function( up, err ) {
        //     document.getElementById('errors-log').innerHTML += "<br/>" + "Error #" + err.code + ": " + err.message;
        // });


        // /**
        //  * If files are uploaded successfully.
        //  *
        //  * @since 1.0.0
        //  */
        // uploader.bind('FileUploaded', function ( up, file, ajax_response ) {
        //     var response = $.parseJSON( ajax_response.response );

        //     if ( response.success ) {

        //         var profileThumbHTML = '<img src="' + response.url + '" alt="" />' +
        //             '<input type="hidden" class="profile-image-id" name="profile-image-id" value="' + response.attachment_id + '"/>';

        //         document.getElementById( "holder-" + file.id ).innerHTML = profileThumbHTML;

        //     } else {
        //         // log response object
        //         console.log ( response );
        //     }
        // });

        // $('#remove-profile-image').on( 'click', function(event){
        //     event.preventDefault();
        //     document.getElementById('user-profile-img').innerHTML = '<div class="profile-thumb"></div>';
        // });

        /* Check if IE9 - As image upload does not works in ie9 */
        var ie = ( function() {

            var undef,
                v   = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');

            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );

            return v > 4 ? v : undef;

        } () );

        if ( ie <= 9 ) {
            $('#inspiry-edit-user').before( '<div class="ie9-message"><i class="fa fa-info-circle"></i>&nbsp; <strong>Current browser is not fully supported:</strong> Please update your browser or use a different one vr_booking_date_checkout enjoy all features on this page. </div>' );
        }

    }   // validate localized data.

});
