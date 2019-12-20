window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQC_Cva2c3s7Qqk02zl0cFofTrObWpr5_xJXbzc8aofFxINcwMgvQeFYuFwz83hB0LimoikPyflPOJJNScBy7bWJNzQVUdpskAANipAHvc2xkgGYvNRu1b93m4Mf-jw6_6MCvYwI2RgedPMMnU7QhYHSlqREATlWsNz2ZtSHnBBkM-XJjeg';
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
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            let {
                current_track,
                next_tracks: [next_track]
            } = state.track_window;

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);

            albumImage = current_track.album.images[0].url;
            songText = current_track.name;
            artistText = current_track.artists[0].name;
            document.getElementById("AlbumImage").style.backgroundImage = "url(" + albumImage + ")";
            document.getElementById("SongText").innerHTML = songText;
            document.getElementById("ArtistText").innerHTML = artistText;
        });
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

    function tooglePlayButton() {
        var playButton = document.getElementById("alt-play");
        if (playButton.innerHTML === " play_arrow ") {
            playButton.innerHTML = " pause ";
    
            player.togglePlay().then(() => {
                console.log('Toggled playback!');
            });
        } else {
            playButton.innerHTML = " play_arrow ";
    
            player.togglePlay().then(() => {
                console.log('Toggled playback!');
            });
        }
    }
};