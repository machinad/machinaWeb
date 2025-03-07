// 主要的 JavaScript 代码
document.addEventListener('DOMContentLoaded', function() {
    initializeSite();
});

// 缓存 DOM 元素
const elements = {
    header: document.querySelector('.header'),
    menuToggle: document.getElementById('menuToggle'),
    sidebar: document.getElementById('sidebar'),
    logoMachina: document.querySelector('.logo-machina'),
    ellieImg001: document.querySelector('.ellie-img-001'),
    links: document.querySelectorAll('.side-nav a'),
    sections: document.querySelectorAll('.content-section')
};

/**
 * 网站初始化函数
 */
function initializeSite() {
    console.log('网站加载完成');
    addScrollEffect();
    initializeSidebar();
    setupPageNavigation();
}

/**
 * 添加页面滚动效果
 */
function addScrollEffect() {
    window.addEventListener('scroll', function() {
        // 当页面滚动超过100px时，给header添加阴影效果
        elements.header.style.boxShadow = window.scrollY > 100 
            ? '0 2px 10px rgba(0,0,0,0.1)' 
            : '0 2px 5px rgba(0,0,0,0.1)';
    });
}

/**
 * 切换菜单状态
 * @param {boolean} isActive - 是否激活
 */
function toggleMenuState(isActive) {
    const action = isActive ? 'add' : 'remove';
    elements.menuToggle.classList[action]('active');
    elements.sidebar.classList[action]('active');
    elements.logoMachina.classList[action]('active');
    elements.ellieImg001.classList[action]('active');
}

/**
 * 初始化侧边栏
 */
function initializeSidebar() {
    // 点击菜单按钮切换状态
    elements.menuToggle.addEventListener('click', function() {
        const isActive = !elements.sidebar.classList.contains('active');
        toggleMenuState(isActive);
    });

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (!elements.sidebar.contains(e.target) && 
            !elements.menuToggle.contains(e.target) && 
            elements.sidebar.classList.contains('active')) {
            toggleMenuState(false);
        }
    });
}

/**
 * 切换页面内容
 * @param {string} targetId - 目标内容区块的ID
 */
function switchContent(targetId) {
    elements.sections.forEach(section => {
        section.classList.toggle('active', section.id === targetId);
    });
}

/**
 * 设置页面导航
 */
function setupPageNavigation() {
    elements.links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            switchContent(targetId);
            toggleMenuState(false); // 关闭菜单
        });
    });
} 