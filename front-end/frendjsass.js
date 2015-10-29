Twitch.init({clientId: 'n49oe0lfq6jdohv7lidhdnfqpdw0z8u'}, function(error, status) {
    // the sdk is now loaded
    if (error) {
        // error encountered while loading
        console.log(error);
    }
    if (status.authenticated) {
    // user is currently logged in
    $('.twitch-connect').hide()
    }
    if (status.authenticated) {
      // we're logged in :)
      $('.status input').val('Logged in! Allowed scope: ' + status.scope);
      // Show the data for logged-in users
      $('.authenticated').removeClass('hidden');
    } else {
      $('.status input').val('Not Logged in! Better connect with Twitch!');
      // Show the twitch connect button
      $('.authenticate').removeClass('hidden');
    }
});

$('.twitch-connect').click(function() {
    Twitch.login({
        scope: ['user_read', 'channel_read']
    });
    
$('#logout button').click(function() {
        Twitch.logout();
})

$('#get-name button').click(function() {
    Twitch.api({method: 'user'}, function(error, user) {
        $('#get-name input').val(user.display_name);
    });
})

$('#get-stream-key button').click(function() {
    Twitch.api({method: 'channel'}, function(error, channel) {
        $('#get-stream-key input').val(channel.stream_key);
    });
})

