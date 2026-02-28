class Screens {
    constructor(engine) {
        this.engine = engine;
        this.introConfig = null;
    }

    setupIntroScreen(config) {
        /*
        config format:
        {
            title: "Game Title",
            bgImage: "path/to/img.jpg", // optional
            startButtonId: "btn-id",
            screenId: "screen-id",
            titleId: "title-id"
        }
        */
        this.introConfig = config;

        if (config.title && config.titleId) {
            const titleEl = document.getElementById(config.titleId);
            if (titleEl) titleEl.innerText = config.title;
        }

        if (config.bgImage && config.screenId) {
            const screenEl = document.getElementById(config.screenId);
            if (screenEl) {
                screenEl.style.backgroundImage = `url(${config.bgImage})`;
                screenEl.style.backgroundSize = 'cover';
                screenEl.style.backgroundPosition = 'center';
            }
        }
    }

    showIntroScreen() {
        if (!this.introConfig) return;
        const screenEl = document.getElementById(this.introConfig.screenId);
        if (screenEl) {
            screenEl.classList.remove('hidden');
        }
    }

    hideIntroScreen() {
        if (!this.introConfig) return;
        const screenEl = document.getElementById(this.introConfig.screenId);
        if (screenEl) {
            screenEl.classList.add('hidden');
        }
    }
}
