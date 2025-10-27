export function initTabs() {
    const pagesWithTabs = ['#okullar-page', '#servis-yoneticileri-page', '#suruculer-page'];
    pagesWithTabs.forEach(pageSelector => {
        const pageElement = document.querySelector(pageSelector);
        if (!pageElement) return;
        const tabButtons = pageElement.querySelectorAll('.feature-tab-button');
        const tabPanes = pageElement.querySelectorAll('.feature-tab-pane');
        if (tabButtons.length === 0 || tabPanes.length === 0) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                tabPanes.forEach(pane => {
                    pane.classList.toggle('active', pane.getAttribute('data-tab') === tabId);
                });
            });
        });
    });
}


