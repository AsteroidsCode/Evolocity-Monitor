window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCHsbvx637B4X56rW2Xw6iNa6u_zThtOa2qaD_BVWmSAek1mOIJvuHwkyPlvYiTwG7CRV7XY3Sg1Glij9tYsjhzhvG-Xm5eOXSWJEpJ5852k1eHZDNChUCcKikmygykx7hYBYBerX4b1FrClLmhfWKVFcrvMh0jVxBe1NTpflmkD3hO1p8';
    const player = new Spotify.Player({
        name: 'Green Model B',
        getOAuthToken: cb => {
            cb(token);
        }
    });

    // Error handling
    player.addListener('initialization_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('authentication_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('account_error', ({
        message
    }) => {
        console.error(message);
    });
    player.addListener('playback_error', ({
        message
    }) => {
        console.error(message);
    });

    // Playback status updates
    player.addListener('player_state_changed', state => {
        console.log(state);
    });

    // Ready
    player.addListener('ready', ({
        device_id
    }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({
        device_id
    }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();

    player.getCurrentState().then(state => {
        if (!state) {
            console.error('User is not playing music through the Web Playback SDK');
            return;
        }

        let {
            current_track,
            next_tracks: [next_track]
        } = state.track_window;

        console.log('Currently Playing', current_track);
        console.log('Playing Next', next_track);
    });
};