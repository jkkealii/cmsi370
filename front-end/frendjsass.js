Twitch.init({clientId: 'n49oe0lfq6jdohv7lidhdnfqpdw0z8u'}, function(error, status) {
    // the sdk is now loaded
});

$('.twitch-connect').click(function() {
    Twitch.login({
        scope: ['user_read', 'channel_read']
    });
})

if (status.authenticated) {
    // Already logged in, hide button
    $('.twitch-connect').hide()
}

