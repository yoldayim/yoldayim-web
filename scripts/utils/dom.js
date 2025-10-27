// Basit DOM yardımcıları (SRP ve DRY için)
export function qs(selector, root = document) {
    return root.querySelector(selector);
}

export function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
}

export function on(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    return () => target.removeEventListener(event, handler, options);
}

export function createEl(tag, props = {}) {
    const el = document.createElement(tag);
    Object.assign(el, props);
    return el;
}

export function setText(el, text) {
    if (el) el.textContent = text;
}


