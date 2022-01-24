// This regex is used to check if innerHTML is set.  Although not a complete
// test, we want to test whether the innerHTML has at least some visible
// characters or has only whitespace characters.
const VISIBLE_CHARS = /[A-Za-z0-9]/;

/**
 * DateStamp is a web component that displays the current date
 *
 * @extends HTMLElement
 */
class DateStamp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const now = Date.now();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const stamp = new Intl.DateTimeFormat('en-US', options).format(now);

        this.innerText = stamp;
    }
}

customElements.define('date-stamp', DateStamp);


/**
 * AnchorShowHref is an anchor web component that displays its href as html, if
 * the anchor has blank text.
 *
 * If the innerHTML is already set, the href is not displayed.
 *
 * @extends HTMLAnchorElement
 */
class AnchorShowHref extends HTMLAnchorElement {
    constructor() {
        super();
        // Need this to correctly set a reference to this object.
        this.setInnerHtmlHandler = this.setInnerHtml.bind(this);
    }

    // If this class is inherited by another class, you need to call
    // super.connectedCallback() to invoke.
    connectedCallback() {
        // According to MDN, this callback can sometimes be called when the
        // element isn't connected.  We skip if that is the case.
        console.log(`${this} is connected? ${this.isConnected}`);
        if (!this.isConnected) {
            return;
        }

        // The 'DOMContentLoaded' event fires after the DOM has completely
        // rendered, but may fire before all resources have been added (images,
        // data, etc.).
        document.addEventListener('DOMContentLoaded', this.setInnerHtmlHandler);
    }

    setInnerHtml() {
        const hasVisibleChars = VISIBLE_CHARS.test(this.innerHTML);

        console.log(`Inner HTML set? ${hasVisibleChars}`);
        console.log(`Inner HTML: ${this.innerHTML}`);

        if (!hasVisibleChars) {
            this.innerHTML = `${this.href}`;
        }

        console.log(`Removing EventListener for ${this}`);
        document.removeEventListener('DOMContentLoaded',
            this.setInnerHtmlHandler);
    }
}

customElements.define('show-href', AnchorShowHref, {extends: "a"});

/**
 * AnchorRedirect is an anchor web component that opens the link in a separate
 * tab.
 *
 * If target isn't set, target="_blank".  Otherwise, target can be overridden.
 *
 * If rel isn't set, rel="noopener noreferrer".  Otherwise, the original rel is
 * appended to the default rel.
 *
 * @extends AnchorShowHref
 */
class AnchorRedirect extends AnchorShowHref {
    constructor() {
        super();
        this.setAttribute("target", "_blank");
        this.setAttribute("rel", "");
    }

    connectedCallback() {
        // Need to call this.  Otherwise, innerHTML is never set.
        super.connectedCallback();

        const originalRel = this.getAttribute("rel");
        const newRel = [originalRel, "noopener", "noreferrer"].join(" ");
        this.setAttribute("rel", newRel);
    }
}

customElements.define('show-href-newtab', AnchorRedirect, {extends: "a"});
