import {Attributes, CONTENT_MAX_LINES} from "./SocialPost.constants.js";
import {toCamelCase} from "./SocialPost.utils.js";
import templateHtml from "./SocialPost.html?raw";
import cssText from './SocialPost.css?inline';

class SocialPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.state = {
            likes: 0
        };

        const template = document.createElement('template');
        template.innerHTML = `<style>${cssText}</style>${templateHtml}`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.displayNameElement = this.shadowRoot.getElementById('display-name');
        this.usernameElement = this.shadowRoot.getElementById('username');
        this.contentElement = this.shadowRoot.getElementById('content');
        this.dateElement = this.shadowRoot.getElementById('date');
        this.avatarElement = this.shadowRoot.getElementById('avatar');
        this.likeButton = this.shadowRoot.getElementById('like-button');
        this.seeMoreBtn = this.shadowRoot.getElementById("see-more-button");

        this.style.setProperty('--max-lines', CONTENT_MAX_LINES.toString());
    }

    static get observedAttributes() {
        return Object.values(Attributes);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === Attributes.AVATAR) {
            this.avatarElement.setAttribute('src', newValue);
        } else if (name === Attributes.CONTENT) {
            this.contentElement.textContent = newValue;
            this.checkContentHeight();
        } else if (this[`${toCamelCase(name)}Element`]) {
            this[`${toCamelCase(name)}Element`].textContent = newValue;
        }
    }

    connectedCallback() {
        this.likeButton.addEventListener('click', this.increaseLikes);
        this.seeMoreBtn.addEventListener("click", this.toggleContent);
    }

    disconnectedCallback() {
        this.likeButton.removeEventListener('click', this.increaseLikes);
        this.seeMoreBtn.removeEventListener("click", this.toggleContent);
    }

    increaseLikes = () => {
        this.state.likes++;
        this.likeButton.textContent = `${this.state.likes} ❤️`;
        this.likeButton.classList.add("pulse");
        this.likeButton.addEventListener("animationend", () => {
            this.likeButton.classList.remove("pulse");
        }, {once: true});
    }

    checkContentHeight() {
        const lineHeight = parseFloat(getComputedStyle(this.contentElement).lineHeight);
        const maxHeight = lineHeight * CONTENT_MAX_LINES;

        if (this.contentElement.scrollHeight > maxHeight + 2) {
            this.seeMoreBtn.style.display = "flex";
        } else {
            this.seeMoreBtn.style.display = "none";
        }
    }

    toggleContent = () => {
        this.state.expanded = !this.state.expanded;
        if (this.state.expanded) {
            this.contentElement.classList.add("expanded");
            this.seeMoreBtn.textContent = "See less";
        } else {
            this.contentElement.classList.remove("expanded");
            this.seeMoreBtn.textContent = "See more";
        }
    }
}

Object.values(Attributes).forEach(attr => {
    Object.defineProperty(SocialPost.prototype, toCamelCase(attr), {
        get() {
            return this.getAttribute(attr);
        },
        set(value) {
            this.setAttribute(attr, value);
        }
    });
});

export default SocialPost;