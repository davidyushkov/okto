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
    }

    static get observedAttributes() {
        return Object.values(Attributes);
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

    toggleContent() {
        this.state.expanded = !this.state.expanded;
        if (this.state.expanded) {
            this.contentElement.classList.add("expanded");
            this.seeMoreBtn.textContent = "See less";
        } else {
            this.contentElement.classList.remove("expanded");
            this.seeMoreBtn.textContent = "See more";
        }
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
        this.likeButton.addEventListener('click', this.increaseLikes.bind(this));
        this.seeMoreBtn.addEventListener("click", this.toggleContent.bind(this));
    }

    disconnectedCallback() {
        this.likeButton.removeEventListener('click', this.increaseLikes.bind(this));
        this.seeMoreBtn.removeEventListener("click", this.toggleContent.bind(this));
    }

    increaseLikes() {
        this.state.likes++;
        this.likeButton.textContent = `${this.state.likes} ❤️`;
        this.likeButton.classList.add("pulse");
        this.likeButton.addEventListener("animationend", () => {
            this.likeButton.classList.remove("pulse");
        }, {once: true});
    }

    set displayName(value) {
        this.setAttribute("display-name", value);
    }
    get displayName() {
        return this.getAttribute("display-name") || "Unknown User";
    }

    set username(value) {
        this.setAttribute("username", value);
    }
    get username() {
        return this.getAttribute("username");
    }

    set content(value) {
        this.setAttribute("content", value);
    }
    get content() {
        return this.getAttribute("content");
    }

    set avatar(value) {
        this.setAttribute("avatar", value);
    }
    get avatar() {
        return this.getAttribute("avatar");
    }

    set date(value) {
        this.setAttribute("date", value);
    }
    get date() {
        return this.getAttribute("date");
    }
}

export default SocialPost;