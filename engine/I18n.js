class I18n {
    constructor(engine) {
        this.engine = engine;
        this.currentLocale = 'en';
        this.locales = {
            en: {},
            ca: {}
        };
    }

    async loadLocales() {
        // First, check if locales are already loaded via global JS variables (to support file://)
        if (typeof locales_en !== 'undefined') this.locales.en = locales_en;
        if (typeof locales_ca !== 'undefined') this.locales.ca = locales_ca;

        // If they were loaded via variables, we might still want to try fetching for updates, 
        // but for file:// users, we skip if already set.
        if (Object.keys(this.locales.en).length > 0) {
            console.log("Locales loaded from pre-defined variables.");
            return;
        }

        try {
            const [enRes, caRes] = await Promise.all([
                fetch('data/locales/en.json'),
                fetch('data/locales/ca.json')
            ]);
            this.locales.en = await enRes.json();
            this.locales.ca = await caRes.json();
            console.log("Locales loaded successfully via fetch.");
        } catch (err) {
            console.error("Failed to load locale files via fetch:", err);
        }
    }

    setLocale(locale) {
        if (this.locales[locale]) {
            this.currentLocale = locale;
            // Trigger a redraw or UI update if necessary
            if (this.engine.renderer) this.engine.renderer.draw();
            if (this.engine.state) this.engine.state.updateInventoryUI();
            return true;
        }
        return false;
    }

    t(key) {
        const keys = key.split('.');
        let value = this.locales[this.currentLocale];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                return key; // Fallback to key itself
            }
        }
        return value;
    }
}
