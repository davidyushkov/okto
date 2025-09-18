import {THEMES} from './ThemeToggle.constants.js';
import templateHtml from "./ThemeToggle.html?raw";
import cssText from "./ThemeToggle.css?inline";

class ThemeToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.state = {
            currentTheme: document.documentElement.getAttribute('data-theme') || THEMES.LIGHT,
        }

        const template = document.createElement('template');
        template.innerHTML = `<style>${cssText}</style>${templateHtml}`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.toggleButton = this.shadowRoot.getElementById('toggle-button');
        this.setButtonText();

        this.observer = new MutationObserver(() => {
            this.state.currentTheme = document.documentElement.getAttribute('data-theme') || THEMES.LIGHT;
            this.setButtonText();
        });
    }

    connectedCallback() {
        this.toggleButton.addEventListener('click', this.toggleTheme);
        this.observer.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    }

    disconnectedCallback() {
        this.toggleButton.removeEventListener('click', this.toggleTheme);
        this.observer.disconnect();
    }

    toggleTheme = () => {
        this.state.currentTheme = this.state.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        document.documentElement.setAttribute('data-theme', this.state.currentTheme);
        this.setButtonText();
    }

    setButtonText() {
        this.toggleButton.textContent = this.state.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    }
}

export default ThemeToggle;