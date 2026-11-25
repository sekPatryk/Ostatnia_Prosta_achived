(() => {
    "use strict";

    const STORAGE_KEY = "ostatnia-prosta-theme";
    const root = document.documentElement;
    const systemPreference = window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    function readSavedTheme() {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            return saved === "light" || saved === "dark" ? saved : null;
        } catch (error) {
            // Aplikacja nadal działa, gdy przeglądarka blokuje localStorage.
            return null;
        }
    }

    function preferredTheme() {
        return systemPreference && systemPreference.matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;

        const toggle = document.querySelector("[data-theme-toggle]");
        if (toggle) {
            const nextMode = theme === "dark" ? "jasny" : "ciemny";
            toggle.setAttribute("aria-pressed", String(theme === "dark"));
            const currentMode = theme === "dark" ? "ciemny" : "jasny";
            toggle.setAttribute("aria-label", `Przełącz motyw. Aktualny tryb: ${currentMode}`);
            toggle.setAttribute("title", `Włącz tryb ${nextMode}`);

            const label = toggle.querySelector("[data-theme-label]");
            if (label) {
                label.textContent = `Tryb ${nextMode}`;
            }
        }

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.setAttribute("content", theme === "dark" ? "#111111" : "#f5f5f3");
        }
    }

    // Ustawienie motywu przed załadowaniem arkusza CSS ogranicza migotanie strony.
    let savedTheme = readSavedTheme();
    applyTheme(savedTheme || preferredTheme());

    function initialiseControls() {
        // Synchronizuje etykietę i stan przycisku po utworzeniu elementu w DOM.
        applyTheme(root.dataset.theme || preferredTheme());
        const toggle = document.querySelector("[data-theme-toggle]");
        if (toggle) {
            toggle.addEventListener("click", () => {
                const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
                try {
                    window.localStorage.setItem(STORAGE_KEY, nextTheme);
                    savedTheme = nextTheme;
                } catch (error) {
                    // Przełącznik nadal zmienia motyw w bieżącej karcie.
                }
                applyTheme(nextTheme);
            });
        }

        if (systemPreference) {
            const onSystemPreferenceChange = (event) => {
                // Preferencja systemowa działa tylko do chwili ręcznego wyboru motywu.
                if (!savedTheme) {
                    applyTheme(event.matches ? "dark" : "light");
                }
            };

            if (typeof systemPreference.addEventListener === "function") {
                systemPreference.addEventListener("change", onSystemPreferenceChange);
            } else if (typeof systemPreference.addListener === "function") {
                // Starsze wersje Safari.
                systemPreference.addListener(onSystemPreferenceChange);
            }
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialiseControls, { once: true });
    } else {
        initialiseControls();
    }
})();
