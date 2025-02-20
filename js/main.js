// 主要的 JavaScript 代码将放在这里
document.addEventListener('DOMContentLoaded', function() {
    // 初始化函数
    initializeSite();
});

/**
 * 网站初始化函数
 * 包含所有需要在页面加载时执行的功能
 */
function initializeSite() {
    // 控制台输出加载完成信息
    console.log('网站加载完成');
    
    // 添加页面滚动效果
    addScrollEffect();
    initializeSidebar();
    setupPageNavigation();
}

/**
 * 添加页面滚动效果
 * 当页面滚动时添加一些视觉效果
 */
function addScrollEffect() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        // 当页面滚动超过100px时，给header添加阴影效果
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
}

function initializeSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });
}

function setupPageNavigation() {
    // 页面切换逻辑
    const links = document.querySelectorAll('.side-nav a');
    const sections = document.querySelectorAll('.content-section');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // 切换激活状态
            sections.forEach(section => {
                section.classList.remove('active');
                if(section.id === targetId) {
                    section.classList.add('active');
                }
            });

            // 关闭菜单
            document.getElementById('menuToggle').classList.remove('active');
            document.getElementById('sidebar').classList.remove('active');
        });
    });
} 