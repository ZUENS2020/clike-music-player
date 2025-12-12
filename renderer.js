// renderer.js
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const volumeSlider = document.getElementById('volume-slider');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const importLocalBtn = document.getElementById('import-local');
    const rssInput = document.getElementById('rss-input');
    const importRssBtn = document.getElementById('import-rss');
    const dynamicTrackList = document.getElementById('dynamic-track-list');

    let isPlaying = false;
    let playlist = [];
    let currentTrackIndex = -1;

    // Parse initial tracks from HTML
    const initialTrackElements = Array.from(dynamicTrackList.getElementsByTagName('a'));
    playlist = initialTrackElements.map(trackElement => {
        return {
            title: trackElement.textContent,
            artist: 'Various Artists', // Placeholder, as this info is not in the initial HTML
            url: trackElement.href
        };
    });
    currentTrackIndex = 0;


    function renderPlaylist() {
        dynamicTrackList.innerHTML = ''; // Clear the list
        playlist.forEach((track, index) => {
            const trackElement = document.createElement('a');
            trackElement.href = '#';
            trackElement.textContent = track.title;
            trackElement.classList.add('white', 'hover');
            if (index === currentTrackIndex) {
                trackElement.classList.add('selected');
            }
            trackElement.addEventListener('click', (e) => {
                e.preventDefault();
                currentTrackIndex = index;
                loadTrack(playlist[currentTrackIndex]);
                if (isPlaying) {
                    audioPlayer.play();
                }
            });
            dynamicTrackList.appendChild(trackElement);
        });
    }

    function loadTrack(track) {
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        audioPlayer.src = track.url;
        renderPlaylist(); // Re-render to update the 'selected' class
    }

    function togglePlayPause() {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    }

    function setVolume() {
        audioPlayer.volume = volumeSlider.value;
    }

    playPauseBtn.addEventListener('click', togglePlayPause);
    volumeSlider.addEventListener('input', setVolume);

    importLocalBtn.addEventListener('click', async () => {
        const filePath = await window.electron.openFile();
        if (filePath) {
            const newTrack = {
                title: filePath.split('/').pop(),
                artist: 'Local File',
                url: `file://${filePath}`
            };
            playlist.push(newTrack);
            currentTrackIndex = playlist.length - 1;
            loadTrack(newTrack);
            if (!isPlaying) {
                togglePlayPause();
            } else {
                audioPlayer.play();
            }
        }
    });

    importRssBtn.addEventListener('click', async () => {
        const url = rssInput.value;
        if (url) {
            const tracks = await window.electron.parseRss(url);
            if (tracks) {
                playlist = playlist.concat(tracks);
                currentTrackIndex = playlist.length - tracks.length;
                loadTrack(playlist[currentTrackIndex]);
                if (!isPlaying) {
                    togglePlayPause();
                } else {
                    audioPlayer.play();
                }
            } else {
                alert('Failed to parse RSS feed. Please check the URL.');
            }
        }
    });

    // Initial load
    if (playlist.length > 0) {
        loadTrack(playlist[currentTrackIndex]);
    }
});
