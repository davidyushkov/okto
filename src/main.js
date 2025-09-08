import SocialPost from './Post/SocialPost.js';
import ThemeToggle from "./ThemeToggle/ThemeToggle.js";
import './global.css'

customElements.define('social-post', SocialPost);
customElements.define('theme-toggle', ThemeToggle);

const app = document.getElementById('app');

app.innerHTML = `
    <theme-toggle></theme-toggle>
    <social-post
       display-name="Jane Doe"
       asd="asd"
       username="@janedoe"
       content="Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma — which is living with the results of other people’s thinking. Don’t let the noise of others’ opinions drown out your own inner voice. And most important, have the courage to follow your heart and intuition."
       date="2h ago"
       avatar="https://api.dicebear.com/9.x/big-ears-neutral/svg"
    ></social-post>
    <social-post
      display-name="Liam Thompson"
      username="@liamcode"
      content="We are what we repeatedly do. Excellence, then, is not an act, but a habit."
      date="30m ago"
      avatar="https://api.dicebear.com/9.x/micah/svg?seed=liam"
    ></social-post>
    <social-post
      display-name="Ava Rodríguez"
      username="@ava_dev"
      content="Design is not just how something looks, it’s how it works. When you design for real people you make trade-offs, you simplify complexity, and you make choices that protect users from friction. Good design anticipates needs before users articulate them."
      date="1d ago"
      avatar="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=ava"
    ></social-post>
    <social-post
      display-name="Maya Chen"
      username="@mayacreates"
      content="Creativity is a muscle — it grows when you use it. Make something small every day. Sketch, refactor, write — then iterate. Over time the practice compounds, and projects you once thought impossible become inevitable."
      date="just now"
      avatar="https://api.dicebear.com/9.x/miniavs/svg?seed=maya"
    ></social-post>
    <social-post>
    <div>asd</div>
</social-post>
`;
