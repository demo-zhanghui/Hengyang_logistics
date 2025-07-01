document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Initialize slider
    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // 导航链接活动状态
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 业务标签页切换
    const businessTabs = document.querySelectorAll('.business-tabs .tab');
    const businessContent = document.querySelector('.business-content');

    // 模拟内容数据
    const contents = {
        '智慧科技与数字产业服务': {
            title: '智慧科技与数字产业服务',
            text: '智慧科技与数字产业服务能够处理和分析海量数据，从中提取有价值的信息和趋势。帮助企业做出更明智的决策，优化运营流程，了解市场需求，预测行业发展趋势。智慧城市、智能家居、智能医疗、智能交通等都是智慧科技应用的领域。'
        },
        '通信技术服务': {
            title: '通信技术服务',
            text: '提供包括5G网络规划、优化、维护以及物联网连接解决方案等全面的通信技术服务，确保高效、可靠的通信体验。'
        },
        '城市运营配套服务': {
            title: '城市运营配套服务',
            text: '结合智慧城市理念，提供智能交通、公共安全监控、环境监测等一体化城市运营配套服务，提升城市管理效率和居民生活品质。'
        }
    };

    businessTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            businessTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const contentKey = tab.textContent.trim();
            const contentData = contents[contentKey];

            if (contentData) {
                businessContent.innerHTML = `
                    <h3>${contentData.title}</h3>
                    <p>${contentData.text}</p>
                `;
            }
        });
    });

    // 服务大厅逻辑
    const routes = [
        {
            id: 1, from: '衡阳', to: '百色', transit1: '广州', transit2: '-', duration: 3, transport: '公铁联运', cargo: '集装箱',
            detailed_route: [
                { from: '衡阳', to: '广州', transport: '公路运输' },
                { from: '广州', to: '百色', transport: '铁路运输' },
            ]
        },
        {
            id: 2, from: '营口', to: '衡阳', transit1: '东莞', transit2: '-', duration: 12, transport: '海铁联运', cargo: '集装箱',
            detailed_route: [
                { from: '营口', to: '东莞', transport: '水路运输' },
                { from: '东莞', to: '衡阳', transport: '铁路运输' },
            ]
        },
        {
            id: 3, from: '济宁', to: '衡阳', transit1: '扬州', transit2: '岳阳', duration: 18, transport: '水铁联运', cargo: '集装箱',
            detailed_route: [
                { from: '济宁', to: '扬州', transport: '水路运输' },
                { from: '扬州', to: '岳阳', transport: '水路运输' },
                { from: '岳阳', to: '衡阳', transport: '铁路运输' },
            ]
        },
        {
            id: 4, from: '衡阳', to: '新加坡', transit1: '广州', transit2: '-', duration: 11, transport: '海铁联运', cargo: '集装箱',
            detailed_route: [
                { from: '衡阳', to: '广州', transport: '铁路运输' },
                { from: '广州', to: '新加坡', transport: '水路运输' },
            ]
        },
        {
            id: 5, from: '衡阳', to: '俄罗斯', transit1: '-', transit2: '-', duration: 18, transport: '中欧班列', cargo: '集装箱',
            detailed_route: [
                { from: '衡阳', to: '俄罗斯', transport: '铁路运输' },
            ]
        }
    ];

    const routesList = document.getElementById('routes-list');
    const startPointSelect = document.getElementById('start-point');
    const endPointSelect = document.getElementById('end-point');
    const transportModeSelect = document.getElementById('transport-mode');
    const cargoTypeSelect = document.getElementById('cargo-type');
    const quickFilters = document.querySelectorAll('.quick-filters input[type="checkbox"]');
    const queryBtn = document.querySelector('.query-btn');
    const resetBtn = document.querySelector('.reset-btn');

    function getIconForTransport(transport) {
        switch (transport) {
            case '铁路运输':
            case '中欧班列':
                return '素材/铁路运输.png';
            case '公路运输':
                return '素材/公路运输.png';
            case '水路运输':
            case '海铁联运':
                return '素材/水路运输.png';
            default:
                return ''; // 或者一个默认图标
        }
    }

    function renderRoutes(filteredRoutes) {
        routesList.innerHTML = '';
        filteredRoutes.forEach(route => {
            const card = document.createElement('div');
            card.className = 'route-card';

            let detailsHtml = '<div class="route-details">';
            detailsHtml += `<div class="segment"><span>起</span> ${route.detailed_route[0].from}</div>`;
            route.detailed_route.forEach(segment => {
                detailsHtml += `<div class="segment"><img src="${getIconForTransport(segment.transport)}" class="transport-icon"> ${segment.transport}</div>`;
                detailsHtml += `<div class="segment">→ ${segment.to}</div>`;
            });
            detailsHtml += `<div class="segment"><span>终</span></div>`;
            detailsHtml += '</div>';

            card.innerHTML = `
                <div class="route-summary">
                    <div class="path">${route.from} → ${route.to}</div>
                    <div class="info"><strong>${route.duration}天</strong></div>
                    <div class="info">${route.transport}</div>
                    <div class="actions">
                        <button class="contact-btn">立即联系</button>
                        <button class="favorite-btn">收藏路线</button>
                    </div>
                </div>
                ${detailsHtml}
            `;
            routesList.appendChild(card);
        });
    }

    function populateFilters() {
        const startPoints = [...new Set(routes.map(r => r.from))];
        const endPoints = [...new Set(routes.map(r => r.to))];
        const transportModes = [...new Set(routes.map(r => r.transport))];
        const cargoTypes = [...new Set(routes.map(r => r.cargo))];

        startPoints.forEach(p => startPointSelect.innerHTML += `<option value="${p}">${p}</option>`);
        endPoints.forEach(p => endPointSelect.innerHTML += `<option value="${p}">${p}</option>`);
        transportModes.forEach(m => transportModeSelect.innerHTML += `<option value="${m}">${m}</option>`);
        cargoTypes.forEach(t => cargoTypeSelect.innerHTML += `<option value="${t}">${t}</option>`);
    }

    function filterRoutes() {
        let filtered = [...routes];
        const start = startPointSelect.value;
        const end = endPointSelect.value;
        const transport = transportModeSelect.value;
        const cargo = cargoTypeSelect.value;

        if (start) filtered = filtered.filter(r => r.from === start);
        if (end) filtered = filtered.filter(r => r.to === end);
        if (transport) filtered = filtered.filter(r => r.transport === transport);
        if (cargo) filtered = filtered.filter(r => r.cargo === cargo);

        
        renderRoutes(filtered);
    }

    function handleQuickFilterChange(e) {
        const checkbox = e.target;
        const value = checkbox.value;
        const isChecked = checkbox.checked;

        // 联动逻辑
        if (['散货', '集装箱', '散改集', '集改散'].includes(value)) {
            cargoTypeSelect.value = isChecked ? value : '';
        } else if (['补贴路线', '中欧班列'].includes(value)) {
            transportModeSelect.value = isChecked ? value : '';
        }
        filterRoutes();
    }
    
    // 初始化
    if(routesList){
        populateFilters();
        renderRoutes(routes);
    
        queryBtn.addEventListener('click', filterRoutes);
        resetBtn.addEventListener('click', () => {
            startPointSelect.value = '';
            endPointSelect.value = '';
            transportModeSelect.value = '';
            cargoTypeSelect.value = '';
            quickFilters.forEach(cb => cb.checked = false);
            renderRoutes(routes);
        });
    
        quickFilters.forEach(cb => cb.addEventListener('change', handleQuickFilterChange));
    
        [cargoTypeSelect, transportModeSelect].forEach(select => {
            select.addEventListener('change', () => {
                const selectedValue = select.value;
                quickFilters.forEach(cb => {
                    if (cb.value === selectedValue) {
                        cb.checked = true;
                    } else {
                        cb.checked = false;
                    }
                });
                filterRoutes();
            });
        });
    }
});