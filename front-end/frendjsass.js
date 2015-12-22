window.CLIENT_ID = 'n49oe0lfq6jdohv7lidhdnfqpdw0z8u'; // JD: 8
$(function() {
    // Initialize. If we are already logged in, there is no
    // need for the connect button
    Twitch.init({clientId: CLIENT_ID}, function(error, status) { // JD: 9, 10
        if (status.authenticated) {
            // we're logged in :)
            $('.status input').val('Logged in! Allowed scope: ' + status.scope); // JD: 11
            // Show the data for logged-in users
            $('.authenticated').removeClass('hidden');
        } else {
            $('.status input').val('Not Logged in! Better connect with Twitch!');
            // Show the twitch connect button
            $('.authenticate').removeClass('hidden');
        }
    });
    $(".image").resizeImage(); // JD 1211: 9


    $('.twitch-connect').click(function() { // JD: 9
        Twitch.login({
            scope: ['user_read', 'channel_read']
        });
    }) // JD: 12

    $('#logout button').click(function() { // JD: 9
        Twitch.logout();
        window.location = window.location.pathname // JD: 12
    }) // JD: 12

    $('#get-name button').click(function() { // JD: 9
        Twitch.api({method: 'user'}, function(error, user) { // JD: 9, 10
            $('#get-name input').val(user.display_name); // JD: 13
        });
    }) // JD: 12

    $('#get-stream-key button').click(function() { // JD: 9
        Twitch.api({method: 'channel'}, function(error, channel) { // JD: 9, 10
            $('#get-stream-key input').val(channel.stream_key); // JD: 13
        });
    }) // JD: 12

    $('#get-email button').click(function() { // JD: 9
        Twitch.api({method: 'user'}, function(error, user) { // JD: 9, 10
            $('#get-email input').val(user.email); // JD: 14
        });  
    }) // JD: 12
    
    $('#get-prof-pic button').click(function() { // JD: 9
        Twitch.api({method: 'user'}, function(error, user) { // JD: 9, 10
            $('#prof-pic').append('<img src="'+user.logo+'" id="logo" width="250" height="250" class="image"'+'>'); // JD: 15, 16
            // resize image plug-in
            $(".image").resizeImage();
        });
    }) // JD: 12
    
});
