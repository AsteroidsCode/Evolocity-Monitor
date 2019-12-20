window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQDrzNIXoTWva1mzabr4cZPhy92FBeWRjbs5HAkJZwIXQZmd9csLAtj6jAGfn3L61k1RlUocUN6HpZaaAQx2NLyRu_AtPvkUhn2VX5vSG2aXiGqpLxChfTsxSypy2osofGpN6AGYMMhHdJ4YNDc9s9SCSV8i20sLQqcnB2QVlXYrQbspoEg';
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
        player.getCurrentState().then(state => {
            if (!state) {
                playButton.innerHTML = " play_arrow ";

                document.getElementById("AlbumImage").style.backgroundImage = "none";
            document.getElementById("SongText").innerHTML = "Connect Your Device";
            document.getElementById("ArtistText").innerHTML = "Spotify";
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            let {
                current_track,
                next_tracks: [next_track]
            } = state.track_window;

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
            if (state.paused) {
                playButton.innerHTML = " play_arrow ";
            } else {
                playButton.innerHTML = " pause ";
            }

            albumImage = current_track.album.images[0].url;
            songText = current_track.name;
            artistText = current_track.artists[0].name;
            document.getElementById("AlbumImage").style.backgroundImage = "url(" + albumImage + ")";
            document.getElementById("SongText").innerHTML = songText;
            document.getElementById("ArtistText").innerHTML = artistText;
        });
    });

    var playButton = document.getElementById("alt-play");
    (function () {
        function PlayButton() {
            player.togglePlay();
        }
        document.getElementById('alt-play').addEventListener('click', PlayButton, true);
    })();

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

    
};