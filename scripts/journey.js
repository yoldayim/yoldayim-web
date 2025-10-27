import { qs, qsa } from './utils/dom.js';

export function initJourney() {
    const journeyData = [
        { id: 'parent', nodeId: 'node-parent', pathPercentage: 0.08, title: 'Veliler İçin Gözünüz Arkada Kalmasın', description: 'Çocuğunuzun her an güvende olduğunu bilmenin huzurunu yaşayın. Gelişmiş takip sistemimiz ve anlık bildirimlerle, okul yolculuğunun her adımını kolayca izleyin.', features: ['Servis aracını harita üzerinde canlı takip etme','Araç eve yaklaştığında otomatik bildirim alma','Öğrencinin servise biniş ve iniş anlarından haberdar olma','Sürücü veya okul ile anında iletişim kurma'] },
        { id: 'service', nodeId: 'node-service', pathPercentage: 0.5, title: 'Servis Firmaları İçin Verimlilik ve Kontrol', description: 'Operasyonel maliyetlerinizi düşürürken hizmet kalitenizi artırın. Akıllı rota planlama ve filo yönetimi ile iş süreçlerinizi optimize edin.', features: ['Yakıt ve zaman tasarrufu sağlayan rota optimizasyonu','Araç ve sürücü performansını tek panelden izleme','Velilerle ve okullarla anlık, kolay iletişim','Detaylı raporlama ile operasyonel verimliliği ölçme'] },
        { id: 'school', nodeId: 'node-school', pathPercentage: 0.92, title: 'Okul Yönetimi İçin Tam Koordinasyon', description: 'Tüm servis operasyonunu tek bir ekrandan yöneterek idari yükü azaltın. Öğrenci güvenliğini en üst düzeyeye çıkarın ve veli memnuniyetini artırın.', features: ['Tüm servislerin anlık konumunu ve durumunu görüntüleme','Öğrenci yoklama ve devamlılık takibini dijitalleştirme','Acil durum ve duyuruları tüm paydaşlara anında iletme','Veli, servis ve okul arasında şeffaf bir iletişim köprüsü kurma'] }
    ];
    let currentJourneyIndex = 0;
    let currentBusPercentage = 0;
    let isBusAnimating = false;
    const journeyPath = document.querySelector('#journey-path');
    const journeyBus = document.getElementById('journey-bus');
    const journeyNodes = document.querySelectorAll('.journey-node');
    const journeyTitleEl = document.getElementById('journey-details-title');
    const journeyDescEl = document.getElementById('journey-details-description');
    const journeyListEl = document.getElementById('journey-details-list');
    const journeyPrevBtn = document.getElementById('journeyPrevBtn');
    const journeyNextBtn = document.getElementById('journeyNextBtn');
    const journeyContentEl = document.querySelector('.journey-details-content');
    if (!journeyPath || !journeyBus) return;

    function getJourneyMobileOffset() {
        const journeyVisual = document.querySelector('.journey-visual');
        if (!journeyVisual || !journeyPath || !journeyVisual.classList.contains('is-mobile')) return { x: 0, y: 0 };
        const svgEl = journeyPath.ownerSVGElement;
        if (!svgEl) return { x: 0, y: 0 };
        const visualWidth = journeyVisual.offsetWidth;
        const svgWidth = svgEl.offsetWidth;
        const offsetX = (visualWidth - svgWidth) / 2;
        return { x: offsetX, y: 0 };
    }

    function animateBus(targetPercentage) {
        if (!journeyPath || !journeyBus || isBusAnimating || journeyPath.getTotalLength() === 0) return;
        isBusAnimating = true;
        const offset = getJourneyMobileOffset();
        const startPercentage = currentBusPercentage;
        const duration = 1200;
        const pathLength = journeyPath.getTotalLength();
        let startTime = null;
        const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        function frame(currentTime) {
            if (!isBusAnimating || !journeyPath || !journeyBus) { isBusAnimating = false; return; }
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            let progress = Math.min(elapsedTime / duration, 1);
            progress = easeInOutCubic(progress);
            const percentage = startPercentage + (targetPercentage - startPercentage) * progress;
            const point = journeyPath.getPointAtLength(pathLength * percentage);
            const nextPoint = journeyPath.getPointAtLength(pathLength * Math.min(percentage + 0.001, 1));
            const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
            journeyBus.style.transform = `translate(${point.x + offset.x}px, ${point.y + offset.y}px) translate(-50%, -50%) rotate(${angle}deg)`;
            if (progress < 1) requestAnimationFrame(frame);
            else { currentBusPercentage = targetPercentage; isBusAnimating = false; }
        }
        requestAnimationFrame(frame);
    }

    function updateJourneyDisplay(index, shouldAnimate) {
        if (!journeyTitleEl || !journeyDescEl || !journeyListEl || !journeyPath || !journeyBus || !journeyContentEl) return;
        const data = journeyData[index];
        const journeyVisual = document.querySelector('.journey-visual');
        const isMobile = journeyVisual && journeyVisual.classList.contains('is-mobile');
        journeyNodes.forEach(n => n.classList.remove('active'));
        document.getElementById(data.nodeId)?.classList.add('active');
        journeyContentEl.style.opacity = '0';
        setTimeout(() => {
            journeyTitleEl.textContent = data.title;
            journeyDescEl.textContent = data.description;
            journeyListEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
            journeyContentEl.style.opacity = '1';
        }, 300);
        if (isMobile) return;
        if (shouldAnimate) animateBus(data.pathPercentage);
        else {
            currentBusPercentage = data.pathPercentage;
            const pathLength = journeyPath.getTotalLength();
            if (pathLength > 0) {
                const offset = getJourneyMobileOffset();
                const point = journeyPath.getPointAtLength(pathLength * currentBusPercentage);
                const nextPoint = journeyPath.getPointAtLength(pathLength * Math.min(currentBusPercentage + 0.001, 1));
                const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
                journeyBus.style.transition = 'none';
                journeyBus.style.transform = `translate(${point.x + offset.x}px, ${point.y + offset.y}px) translate(-50%, -50%) rotate(${angle}deg)`;
                requestAnimationFrame(() => { if (journeyBus) journeyBus.style.transition = ''; });
            }
        }
    }

    function setupJourneyNodesPositions() {
        if (!journeyPath || window.getComputedStyle(journeyPath).display === 'none') return;
        const journeyVisual = document.querySelector('.journey-visual');
        if (journeyVisual && journeyVisual.classList.contains('is-mobile')) {
            journeyNodes.forEach(node => { node.style.left = ''; node.style.top = ''; });
            return;
        }
        const pathLength = journeyPath.getTotalLength();
        if (pathLength === 0) return;
        const offset = getJourneyMobileOffset();
        journeyData.forEach(data => {
            const nodeEl = document.getElementById(data.nodeId);
            if (nodeEl) {
                const point = journeyPath.getPointAtLength(pathLength * data.pathPercentage);
                nodeEl.style.left = `${point.x + offset.x}px`;
                nodeEl.style.top = `${point.y + offset.y}px`;
            }
        });
    }

    const journeyVisual = document.querySelector('.journey-visual');
    const handleJourneyLayout = () => {
        if (!journeyPath || !journeyVisual) return;
        isBusAnimating = false;
        const isMobile = window.innerWidth <= 768;
        const wasMobile = journeyVisual.classList.contains('is-mobile');
        let pathChanged = false;
        if (isMobile && !wasMobile) {
            journeyVisual.classList.add('is-mobile');
            journeyPath.setAttribute('d', 'M 50 25 C -20 125, 120 225, 50 325');
            journeyPath.parentElement?.setAttribute('viewBox', '0 0 100 350');
            pathChanged = true;
        } else if (!isMobile && wasMobile) {
            journeyVisual.classList.remove('is-mobile');
            journeyPath.setAttribute('d', 'M 50 50 C 200 100, 300 0, 400 50 S 600 100, 750 50');
            journeyPath.parentElement?.setAttribute('viewBox', '0 0 800 100');
            pathChanged = true;
        }
        const updatePositions = () => {
            requestAnimationFrame(() => {
                if (journeyPath.getTotalLength() === 0) {
                    setTimeout(() => requestAnimationFrame(updatePositions), 50);
                } else {
                    setupJourneyNodesPositions();
                    updateJourneyDisplay(currentJourneyIndex, false);
                }
            });
        };
        if (pathChanged) setTimeout(updatePositions, 50);
        else updatePositions();
    };

    handleJourneyLayout();
    journeyNextBtn?.addEventListener('click', () => {
        if (isBusAnimating) return;
        currentJourneyIndex = (currentJourneyIndex + 1) % journeyData.length;
        updateJourneyDisplay(currentJourneyIndex, true);
    });
    journeyPrevBtn?.addEventListener('click', () => {
        if (isBusAnimating) return;
        currentJourneyIndex = (currentJourneyIndex - 1 + journeyData.length) % journeyData.length;
        updateJourneyDisplay(currentJourneyIndex, true);
    });
    journeyNodes.forEach((node, index) => {
        node.addEventListener('click', () => {
            if (isBusAnimating || currentJourneyIndex === index) return;
            currentJourneyIndex = index;
            updateJourneyDisplay(currentJourneyIndex, true);
        });
    });
    window.addEventListener('resize', handleJourneyLayout);
}


