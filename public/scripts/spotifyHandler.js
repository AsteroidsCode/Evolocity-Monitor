window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQBQj0julHzHFaOSU2dvJV3z8TRI9ax0ZC11U5r50Ix8zEluA7di272p1wq-4iEU80F2wXjjxf0Cy2wUkbg5x8SGceYuZpCLQlp71dzvDeD9c_34uZH8DjujLglY3c6XPqoNn4bGUDkJuHwgU-eNUhr-lfygdHrOX9Ln4s1N4oIDaNVXbdU';
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
            document.getElementById("AlbumImage").src = albumImage;
            document.getElementById("SongText").innerHTML = songText;
            document.getElementById("ArtistText").innerHTML = artistText;

            let color_thief = new ColorThief();
            let sample_image = new Image();

            sample_image.onload = () => {
                let result = ntc.name('#' + color_thief.getColor(sample_image).map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;

                }).join(''));
                document.getElementById("musicWindow").style.backgroundColor = result[0];

                lightOrDark(result[0]);

                console.log(result[0]); // #f0c420     : Dominant HEX/RGB value of closest match
                console.log(result[1]); // Moon Yellow : Dominant specific color name of closest match
                console.log(result[2]); // #ffff00     : Dominant HEX/RGB value of shade of closest match
                console.log(result[3]); // Yellow      : Dominant color name of shade of closest match
                console.log(result[4]); // false       : True if exact color match
            };

            sample_image.crossOrigin = 'anonymous';
            sample_image.src = document.getElementById('AlbumImage').src
        });
    });

    function lightOrDark(color) {

        // Variables for red, green, blue values
        var r, g, b, hsp;
        
        // Check the format of the color, HEX or RGB?
        if (color.match(/^rgb/)) {
    
            // If HEX --> store the red, green, blue values in separate variables
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            
            r = color[1];
            g = color[2];
            b = color[3];
        } 
        else {
            
            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            color = +("0x" + color.slice(1).replace( 
            color.length < 5 && /./g, '$&$&'));
    
            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
        }
        
        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
        );
    
        // Using the HSP value, determine whether the color is light or dark
        if (hsp>127.5) {
            document.getElementsByClassName('MusicNavButton')[0].style.color = "#000000";
            document.getElementsByClassName('MusicNavButton')[1].style.color = "#000000";
            document.getElementsByClassName('MusicNavButton')[2].style.color = "#000000";
            document.getElementsByClassName('MusicNavButton')[3].style.color = "#000000";
            document.getElementById('ArtistText').style.color = "#000000";
            document.getElementById('SongText').style.color = "#000000";
            return 'light';
        } 
        else {
            document.getElementsByClassName('MusicNavButton')[0].style.color = "#ffffff";
            document.getElementsByClassName('MusicNavButton')[1].style.color = "#ffffff";
            document.getElementsByClassName('MusicNavButton')[2].style.color = "#ffffff";
            document.getElementsByClassName('MusicNavButton')[3].style.color = "#ffffff";
            document.getElementById('ArtistText').style.color = "#ffffff";
            document.getElementById('SongText').style.color = "#ffffff";
            return 'dark';
        }
    }

    var playButton = document.getElementById("alt-play");
    (function () {
        function PlayButton() {
            player.togglePlay();
        }
        document.getElementById('alt-play').addEventListener('click', PlayButton, true);
    })();

    (function () {
        function NextButton() {
            player.nextTrack();
        }
        document.getElementById('alt-next').addEventListener('click', NextButton, true);
    })();

    (function () {
        function PreviousButton() {
            player.previousTrack();
        }
        document.getElementById('alt-previous').addEventListener('click', PreviousButton, true);
    })();

    // Ready
    player.addListener('ready', ({
        device_id
    }) => {
        console.log('Ready with Device ID', device_id);
        document.getElementById("SplashScreen").style.display = "none";
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