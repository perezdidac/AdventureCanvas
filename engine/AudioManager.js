class AudioManager {
    constructor(engine) {
        this.engine = engine;
        this.music = null;
        this.isMuted = false;
    }

    playMusic(path, loop = true) {
        if (this.music) {
            this.music.pause();
        }
        this.music = new Audio(path);
        this.music.loop = loop;
        this.music.volume = 0.5;

        if (!this.isMuted) {
            // Browsers often block autoplay until first interaction
            const playPromise = this.music.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented. Music will start on first click.");
                    // Setup a one-time listener to start music on first interaction
                    const startOnInteraction = () => {
                        this.music.play();
                        window.removeEventListener('click', startOnInteraction);
                    };
                    window.addEventListener('click', startOnInteraction);
                });
            }
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.music) {
            if (this.isMuted) {
                this.music.pause();
            } else {
                this.music.play();
            }
        }
        return this.isMuted;
    }
}
