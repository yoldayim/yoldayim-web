import { initHero } from './hero.js';
import { initScroll } from './scroll.js';
import { initJourney } from './journey.js';
import { initNavigation } from './navigation.js';
import { initNewsletter } from './newsletter.js';
import { initContact } from './contact.js';
import { initVelilerAccordion } from './accordion.js';
import { initTestimonials } from './testimonials.js';
import { initTabs } from './tabs.js';
import { initFaq } from './faq.js';
import { initMobileMenu } from './mobileMenu.js';
import { initVeliForm } from './veliForm.js';

document.addEventListener('DOMContentLoaded', () => {
    initScroll();
    initHero();
    initNavigation();
    initJourney();
    initNewsletter();
    initContact();
    initVelilerAccordion();
    initTestimonials();
    initTabs();
    initFaq();
    initMobileMenu();
    initVeliForm();
});


