import musics from '../data/data-music.json';

"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const audio = new Audio();
    const loader = document.getElementById('loaderImg');
    const coverMusic = document.getElementById('coverMusic');
    const containerTitleMusic = document.getElementById('containerTitleMusic');
    const titleMusic = document.getElementById('titleMusic');
    const artistMusic = document.getElementById('artistMusic');
    const timeMusicNum = document.getElementById('timeMusic');
    const durationMusicNum = document.getElementById('durationMusic');
    const progressBarInner = document.querySelector('.progress-bar-inner');
    const progressBar = document.querySelector('.progress-bar');
    const btnPreviousMusic = document.querySelector('.btn-previous-music');
    const btnPlayAndStopMusic = document.querySelector('.btn-play-music');
    const playerLoaderBtn = document.getElementById('playerLoaderBtn');
    const btnNextMusic = document.querySelector('.btn-next-music');

    let isPlaying = false;
    let currentTrackIndex = 1;
    let responseObj = {};

    function loadListMusics() {
        responseObj = musics;
        return responseObj;
    }

    function loadTrack(index) {
        const track = loadListMusics();

        for (const key in track) {
            let trackIndex = `music${index}`;
            if (key === trackIndex) {
                audio.src = track[key].src;

                coverMusic.src = track[key].cover ? track[key].cover : './images/bg.jpg';

                titleMusic.textContent = track[key].name;
                artistMusic.textContent = track[key].artist;

                coverMusic.classList.remove('hidden');
                loader.classList.replace('loader', 'hidden');
                containerTitleMusic.classList.remove('animate-pulse');

                audio.load();
            }
        }
    }

    async function playTrack() {
        try {
            await audio.play();
            isPlaying = true;
        } catch (error) {
            console.error('Failed to play the audio:', error);
        }
    }

    function pauseTrack() {
        audio.pause();
        btnPlayAndStopMusic.querySelector('img').src = './images/Play_fill.svg';
        isPlaying = false;
    }

    btnPlayAndStopMusic.addEventListener('click', async () => {
        if (isPlaying) {
            playerLoaderBtn.classList.remove('animate-spin');
            playerLoaderBtn.classList.add('hidden');
            pauseTrack();
        } else {
            playerLoaderBtn.classList.add('animate-spin');
            playerLoaderBtn.classList.remove('hidden');
            await playTrack();
        }
    });

    btnPreviousMusic.addEventListener('click', async () => {
        currentTrackIndex = (currentTrackIndex - 1 + Object.keys(responseObj).length) % Object.keys(responseObj).length || Object.keys(responseObj).length;

        await loadTrack(currentTrackIndex);
        if (isPlaying) {
            await playTrack();
        }
    });

    btnNextMusic.addEventListener('click', async () => {
        currentTrackIndex = (currentTrackIndex - 1 + Object.keys(responseObj).length) % Object.keys(responseObj).length || Object.keys(responseObj).length;

        await loadTrack(currentTrackIndex);
        if (isPlaying) {
            await playTrack();
        }
    });

    audio.addEventListener('timeupdate', function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBarInner.style.width = progress + '%';
        timeMusicNum.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', function () {
        durationMusicNum.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', function () {
        btnNextMusic.click();
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Make progress bar interactive
    let isDragging = false;

    progressBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateProgress(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateProgress(e);
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            playerLoaderBtn.classList.add('animate-spin');
            playerLoaderBtn.classList.remove('hidden');
            audio.play(); // Continue playing after seeking
        }
    });

    function updateProgress(e) {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const progress = offsetX / rect.width;
        audio.currentTime = progress * audio.duration;
        progressBarInner.style.width = `${progress * 100}%`;
        timeMusicNum.textContent = formatTime(audio.currentTime);
    }

    loadTrack(currentTrackIndex);
});