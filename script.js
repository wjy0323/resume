// Enhanced JavaScript for Wu Jiayin's Portfolio - UI8 Style

// Smooth scrolling and navigation effects
class PortfolioApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupFloatingElements();
        this.setupProfileSkillsCard();
        this.setupAvatarMagnifier();
    }

    init() {
        // Initialize AOS (Animate On Scroll) effect simulation
        this.observeElements();
        // Initialize typing effect for main title
        this.setupTypingEffect();
    }

    bindEvents() {
        // Enhanced navbar scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Download button effect
        const downloadBtn = document.querySelector('#download-resume-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', this.handleDownload.bind(this));
        }

        // Contact items interactive effects
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', this.handleContactClick.bind(this));
        });

        // Mouse move effect for floating elements
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        // Enhanced navbar background on scroll
        if (scrollY > 50) {
            navbar.style.background = 'rgba(245, 245, 247, 0.95)';
            navbar.style.backdropFilter = 'blur(32px)';
            navbar.style.borderBottom = '0.5px solid rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(245, 245, 247, 0.85)';
            navbar.style.backdropFilter = 'blur(24px)';
            navbar.style.borderBottom = '0.5px solid rgba(0, 0, 0, 0.06)';
        }

        // 滚动时隐藏icon浮动元素
        const floatingElements = document.querySelectorAll('.floating-element');
        if (scrollY > 10) {
            floatingElements.forEach(el => {
                el.style.display = 'none';
            });
        } else {
            floatingElements.forEach(el => {
                el.style.display = '';
            });
        }

        // Parallax effect for floating elements
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    handleNavClick(e) {
        const link = e.target.closest('.nav-item');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // 如果是页面跳转链接，不阻止默认行为
        if (href && href !== '#' && !href.startsWith('#')) {
            // 添加点击动画
            link.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                link.style.transform = '';
            }, 200);
            
            // 允许正常跳转
            return;
        }
        
        // 如果是锚点链接，阻止默认行为并平滑滚动
        e.preventDefault();
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        link.classList.add('active');

        // Add click animation
        link.style.transform = 'translateY(-2px) scale(1.05)';
        setTimeout(() => {
            link.style.transform = '';
        }, 200);
        
        // 如果是锚点链接，平滑滚动到目标位置
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    handleDownload(e) {
        // 阻止默认链接行为
        e.preventDefault();
        
        // 获取下载按钮
        const downloadBtn = document.querySelector('#download-resume-btn');
        const originalText = downloadBtn.innerHTML;
        
        // 显示下载动画
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 准备中...';
        downloadBtn.style.transform = 'scale(0.95)';
        
        // 创建下载链接
        const link = document.createElement('a');
        // 根据当前页面位置动态设置PDF路径
        const currentPath = window.location.pathname;
        const pdfPath = currentPath.includes('/assets/') 
            ? '吴嘉茵-立即到岗-连续实习6个月以上.pdf'
            : 'assets/吴嘉茵-立即到岗-连续实习6个月以上.pdf';
        link.href = pdfPath;
        link.download = '吴嘉茵-立即到岗-连续实习6个月以上.pdf';
        link.style.display = 'none';
        
        // 添加到页面并触发下载
        document.body.appendChild(link);
        
        setTimeout(() => {
            // 触发下载
            link.click();
            
            // 更新按钮状态
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> 下载完成！';
            downloadBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            
            // 清理下载链接
            document.body.removeChild(link);
        }, 1000);
        
        // 恢复按钮状态
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.background = '';
            downloadBtn.style.transform = '';
        }, 3000);
    }

    handleContactClick(e) {
        const contactItem = e.currentTarget;
        const icon = contactItem.querySelector('.contact-icon');
        
        // Add click ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(79, 70, 229, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        contactItem.style.position = 'relative';
        contactItem.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Icon bounce effect
        icon.style.transform = 'scale(1.3) rotate(10deg)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 300);
    }

    handleMouseMove(e) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Enhanced floating elements mouse follow effect
        document.querySelectorAll('.floating-element').forEach((element, index) => {
            const speed = 0.02 + (index % 4) * 0.005;
            const x = (clientX - centerX) * speed;
            const y = (clientY - centerY) * speed;
            
            element.style.transform += ` translateX(${x}px) translateY(${y}px)`;
        });

        // Main title follow effect
        const mainTitle = document.querySelector('.crypto-main-title');
        if (mainTitle) {
            const rect = mainTitle.getBoundingClientRect();
            const titleCenterX = rect.left + rect.width / 2;
            const titleCenterY = rect.top + rect.height / 2;
            
            const deltaX = (clientX - titleCenterX) * 0.01;
            const deltaY = (clientY - titleCenterY) * 0.01;
            
            mainTitle.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px)`;
        }
    }

    setupFloatingElements() {
        // 页面加载时icon立即显示，无动画延迟
        document.querySelectorAll('.floating-element').forEach((element, index) => {
            element.style.animationDelay = '0s';
            
            // 添加更丰富的交互效果
            element.addEventListener('mouseenter', () => {
                element.style.animationPlayState = 'paused';
                element.style.transform += ' scale(1.2)';
                element.style.filter = 'brightness(1.2) saturate(1.3)';
                element.style.zIndex = '10';
                
                // 添加微妙的震动效果
                this.addShakeEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.animationPlayState = 'running';
                element.style.transform = element.style.transform.replace(' scale(1.2)', '');
                element.style.filter = '';
                element.style.zIndex = '-1';
                
                // 移除震动效果
                this.removeShakeEffect(element);
            });
            
            // 添加点击效果
            element.addEventListener('click', () => {
                this.createClickRipple(element);
                this.showIconInfo(element, index);
            });
        });
        
        // 添加定期的"呼吸"效果
        this.startBreathingEffect();
    }
    
    // 添加震动效果
    addShakeEffect(element) {
        element.style.animation += ', iconShake 0.6s ease-in-out infinite';
    }
    
    // 移除震动效果
    removeShakeEffect(element) {
        element.style.animation = element.style.animation.replace(', iconShake 0.6s ease-in-out infinite', '');
    }
    
    // 创建点击波纹效果
    createClickRipple(element) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(79, 70, 229, 0.6) 0%, rgba(79, 70, 229, 0.2) 50%, transparent 70%);
            transform: scale(0);
            animation: rippleEffect 0.8s ease-out;
            pointer-events: none;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            z-index: 15;
        `;
        
        element.appendChild(ripple);
        
        // 移除波纹
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }
    
    // 显示图标信息
    showIconInfo(element, index) {
        const iconNames = ['比特币', '以太坊', 'AI技术', 'GPT模型', '机器人', 'LLM', '数据分析', 'Gemini'];
        const iconDescriptions = [
            '区块链技术的先驱',
            '智能合约平台',
            '人工智能核心',
            '生成式AI模型',
            '自动化助手',
            '大语言模型',
            '数据洞察工具',
            '多模态AI'
        ];
        
        const tooltip = document.createElement('div');
        tooltip.className = 'icon-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-title">${iconNames[index]}</div>
            <div class="tooltip-desc">${iconDescriptions[index]}</div>
        `;
        tooltip.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 12px;
            padding: 16px 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: tooltipFadeIn 0.3s ease-out;
            font-family: Inter, sans-serif;
        `;
        
        document.body.appendChild(tooltip);
        
        // 3秒后自动消失
        setTimeout(() => {
            tooltip.style.animation = 'tooltipFadeOut 0.3s ease-out';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }, 3000);
    }
    
    // 开始呼吸效果
    startBreathingEffect() {
        setInterval(() => {
            document.querySelectorAll('.floating-element').forEach((element, index) => {
                // 随机选择一个图标进行呼吸效果
                if (Math.random() < 0.3) {
                    const icon = element.querySelector('.crypto-icon');
                    if (icon) {
                        icon.style.animation += ', iconBreathe 2s ease-in-out';
                        setTimeout(() => {
                            icon.style.animation = icon.style.animation.replace(', iconBreathe 2s ease-in-out', '');
                        }, 2000);
                    }
                }
            });
        }, 8000); // 每8秒触发一次
    }



    setupProfileSkillsCard() {
        const profileSkillsCard = document.querySelector('.profile-skills-card');
        if (!profileSkillsCard) return;

        // Enhanced scroll-triggered animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        });

        profileSkillsCard.style.opacity = '0';
        profileSkillsCard.style.transform = 'translateY(50px)';
        profileSkillsCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        observer.observe(profileSkillsCard);

        // Interactive skill cards
        document.querySelectorAll('.core-skill-card').forEach((card, index) => {
            // Staggered entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150 + 800);

            // Enhanced click effect
            card.addEventListener('click', () => {
                // Create floating particles effect
                this.createSkillParticles(card);
            });
        });

        // Profile intro items animation
        document.querySelectorAll('.intro-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200 + 600);
        });
    }

    setupTypingEffect() {
        const titles = document.querySelectorAll('.crypto-main-title');
        titles.forEach(title => {
            const text = title.innerHTML;
            title.innerHTML = '';
            title.style.borderRight = '2px solid #4F46E5';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.innerHTML = text.slice(0, i + 1);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 100); // 由1000ms提前到100ms
        });
    }

    createParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #4F46E5, #7C3AED);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i * 45) * Math.PI / 180;
            const distance = 50 + Math.random() * 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    createSkillParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create sparkle effect for skill cards
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const colors = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: fixed;
                width: ${4 + Math.random() * 4}px;
                height: ${4 + Math.random() * 4}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
                box-shadow: 0 0 6px ${color};
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i * 30) * Math.PI / 180;
            const distance = 80 + Math.random() * 40;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0) rotate(180deg)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
            }).onfinish = () => particle.remove();
        }

        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(79, 70, 229, 0.3), transparent 70%);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(ripple);
        
        ripple.animate([
            { width: '0px', height: '0px', opacity: 0.8 },
            { width: '200px', height: '200px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
        }).onfinish = () => ripple.remove();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all major sections
        document.querySelectorAll('.experience-card, .hero-status-badges, .profile-skills-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            observer.observe(el);
        });
    }

    setupAvatarMagnifier() {
        // 等待一小段时间确保DOM完全加载
        setTimeout(() => {
            // 创建放大镜容器
            const magnifier = document.createElement('div');
            magnifier.className = 'avatar-magnifier';
            document.body.appendChild(magnifier);

            // 为所有头像添加放大镜功能
            const avatarImages = document.querySelectorAll('.avatar-image, .preview-avatar');
        
        avatarImages.forEach(avatar => {
            let isHovering = false;
            let mouseX = 0;
            let mouseY = 0;

            // 鼠标进入头像
            avatar.addEventListener('mouseenter', (e) => {
                isHovering = true;
                
                // 创建放大的头像图片
                magnifier.innerHTML = `<img src="${avatar.src}" alt="${avatar.alt}">`;
                
                // 显示放大镜
                magnifier.classList.add('active');
                
                // 设置初始位置
                updateMagnifierPosition(e);
            });

            // 鼠标在头像上移动
            avatar.addEventListener('mousemove', updateMagnifierPosition);

            // 鼠标离开头像
            avatar.addEventListener('mouseleave', () => {
                isHovering = false;
                magnifier.classList.remove('active');
            });

            // 移动端触摸支持和双击检测
            let touchTime = 0;
            let longPressTimer = null;
            
            avatar.addEventListener('touchstart', (e) => {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - touchTime;
                
                // 双击检测
                if (tapLength < 500 && tapLength > 0) {
                    e.preventDefault();
                    this.showFullScreenMagnifier(avatar);
                    return;
                }
                
                touchTime = currentTime;
                
                // 长按显示放大镜
                longPressTimer = setTimeout(() => {
                    isHovering = true;
                    magnifier.innerHTML = `<img src="${avatar.src}" alt="${avatar.alt}">`;
                    magnifier.classList.add('active');
                    
                    const touch = e.touches[0];
                    updateMagnifierPosition(touch);
                }, 300);
            });

            avatar.addEventListener('touchmove', (e) => {
                e.preventDefault();
                clearTimeout(longPressTimer);
                
                if (isHovering) {
                    const touch = e.touches[0];
                    updateMagnifierPosition(touch);
                }
            });

            avatar.addEventListener('touchend', () => {
                clearTimeout(longPressTimer);
                isHovering = false;
                magnifier.classList.remove('active');
            });

            // 更新放大镜位置的函数
            function updateMagnifierPosition(e) {
                if (!isHovering) return;
                
                mouseX = e.clientX || e.pageX;
                mouseY = e.clientY || e.pageY;
                
                // 计算放大镜位置，避免超出屏幕边界
                let left = mouseX + 20;
                let top = mouseY - 100;
                
                // 边界检测 - 根据屏幕大小调整
                const magnifierWidth = window.innerWidth <= 480 ? 120 : window.innerWidth <= 768 ? 150 : 200;
                const magnifierHeight = magnifierWidth;
                
                if (left + magnifierWidth > window.innerWidth) {
                    left = mouseX - magnifierWidth - 20;
                }
                if (top < 0) {
                    top = mouseY + 20;
                }
                if (top + magnifierHeight > window.innerHeight) {
                    top = window.innerHeight - magnifierHeight - 20;
                }
                
                magnifier.style.left = left + 'px';
                magnifier.style.top = top + 'px';
            }

            // 点击头像显示全屏放大
            avatar.addEventListener('click', (e) => {
                e.preventDefault();
                this.showFullScreenMagnifier(avatar);
            });
        });
        }, 100); // 关闭setTimeout
    }

    showFullScreenMagnifier(avatar) {
        // 创建全屏遮罩
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 30% 20%, rgba(167, 139, 250, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
                linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.9) 100%);
            backdrop-filter: blur(40px) saturate(180%);
            -webkit-backdrop-filter: blur(40px) saturate(180%);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.3s ease;
            cursor: zoom-out;
        `;

        // 创建浮动标语
        const slogans = [
            '用AI让世界变更好',
            '实践精神',
            '兼具理想主义与实干精神',
            '追求卓越，永不止步',
            '创新思维，改变世界',
            '让技术服务人类'
        ];

        const sloganElements = slogans.map((text, index) => {
            const sloganDiv = document.createElement('div');
            sloganDiv.className = `floating-slogan slogan-${index + 1}`;
            sloganDiv.textContent = text;
            return sloganDiv;
        });

        // 添加slogan到overlay
        sloganElements.forEach(slogan => {
            overlay.appendChild(slogan);
        });

        // 计算适合的尺寸
        const isMobile = window.innerWidth <= 768;
        const avatarSize = isMobile ? Math.min(window.innerWidth * 0.8, 300) : 400;
        
        // 创建放大的头像
        const enlargedAvatar = document.createElement('div');
        enlargedAvatar.style.cssText = `
            width: ${avatarSize}px;
            height: ${avatarSize}px;
            border-radius: 50%;
            background-image: url('${avatar.src}');
            background-size: cover;
            background-position: center;
            box-shadow: 
                0 0 0 8px rgba(255, 255, 255, 0.1),
                0 0 0 16px rgba(255, 255, 255, 0.05),
                0 30px 120px rgba(0, 0, 0, 0.25),
                0 15px 60px rgba(0, 0, 0, 0.15),
                0 5px 20px rgba(0, 0, 0, 0.1),
                inset 0 2px 4px rgba(255, 255, 255, 0.4),
                inset 0 -2px 8px rgba(0, 0, 0, 0.1);
            transform: scale(0.3);
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            filter: brightness(1.08) contrast(1.03) saturate(1.05);
            position: relative;
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;
        
        // 添加光晕效果
        const glowEffect = document.createElement('div');
        glowEffect.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
            top: 0;
            left: 0;
            pointer-events: none;
            animation: pulseGlow 4s ease-in-out infinite;
        `;
        enlargedAvatar.appendChild(glowEffect);

        // 添加关闭提示
        const closeHint = document.createElement('div');
        closeHint.style.cssText = `
            position: absolute;
            bottom: -80px;
            left: 50%;
            transform: translateX(-50%);
            color: #374151;
            font-size: 14px;
            font-weight: 500;
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            text-align: center;
            opacity: 0;
            background: rgba(255, 255, 255, 0.95);
            padding: 12px 24px;
            border-radius: 28px;
            backdrop-filter: blur(30px) saturate(150%);
            -webkit-backdrop-filter: blur(30px) saturate(150%);
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.12),
                0 2px 8px rgba(0, 0, 0, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.4);
            transition: all 0.4s ease;
            animation: hintFadeIn 0.8s ease 1s forwards;
        `;
        
        // 添加图标
        const hintIcon = document.createElement('span');
        hintIcon.style.cssText = `
            display: inline-block;
            margin-right: 8px;
            font-size: 16px;
            opacity: 0.7;
        `;
        hintIcon.textContent = '✨';
        
        closeHint.appendChild(hintIcon);
        closeHint.appendChild(document.createTextNode('点击任意位置关闭'));
        enlargedAvatar.appendChild(closeHint);

        overlay.appendChild(enlargedAvatar);
        document.body.appendChild(overlay);

        // 动画显示
        setTimeout(() => {
            overlay.style.opacity = '1';
            enlargedAvatar.style.transform = 'scale(1)';
            
            // 依次显示slogan - 优雅的进入动画
            sloganElements.forEach((slogan, index) => {
                setTimeout(() => {
                    slogan.classList.add('animate');
                    
                    // 添加动态进入效果
                    const enterDelay = index * 300;
                    setTimeout(() => {
                        slogan.style.animation = `${slogan.style.animation}, sloganEnter 0.8s ease-out`;
                    }, enterDelay);
                }, 500);
            });
        }, 10);

        // 点击关闭
        const closeOverlay = () => {
            overlay.style.opacity = '0';
            enlargedAvatar.style.transform = 'scale(0.3)';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 300);
        };

        overlay.addEventListener('click', closeOverlay);

        // 移动端滑动关闭
        let startY = 0;
        let startX = 0;
        
        enlargedAvatar.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        });

        enlargedAvatar.addEventListener('touchmove', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentY = e.touches[0].clientY;
            const currentX = e.touches[0].clientX;
            const deltaY = currentY - startY;
            const deltaX = currentX - startX;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // 滑动距离超过阈值时开始缩放
            if (distance > 50) {
                const scale = Math.max(0.3, 1 - distance / 300);
                const opacity = Math.max(0.3, 1 - distance / 400);
                enlargedAvatar.style.transform = `scale(${scale})`;
                overlay.style.opacity = opacity;
            }
        });

        enlargedAvatar.addEventListener('touchend', (e) => {
            e.stopPropagation();
            
            const currentY = e.changedTouches[0].clientY;
            const currentX = e.changedTouches[0].clientX;
            const deltaY = currentY - startY;
            const deltaX = currentX - startX;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // 滑动距离大于150px时关闭
            if (distance > 150) {
                closeOverlay();
            } else {
                // 恢复原状
                enlargedAvatar.style.transform = 'scale(1)';
                overlay.style.opacity = '1';
            }
        });

        // ESC键关闭
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                overlay.click();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }
}

// Add custom CSS for additional effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .skill-active {
        transform: translateY(-12px) scale(1.05) !important;
        box-shadow: 0 20px 60px rgba(79, 70, 229, 0.25) !important;
    }
    
    .skill-active::before {
        transform: scaleX(1) !important;
    }
    
    .gradient-text {
        background-size: 200% 200%;
        animation: gradientShift 3s ease-in-out infinite;
    }
    
    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
`;
document.head.appendChild(style);

// 数字动画效果
function animateNumbers() {
    const numberElements = document.querySelectorAll('.number-display');
    
    numberElements.forEach(element => {
        const originalText = element.textContent;
        const isPercentage = originalText.includes('%');
        const isTime = originalText.includes('分钟');
        const isMultiplier = originalText.includes('x');
        
        if (isPercentage) {
            const number = parseFloat(originalText.replace('%', ''));
            animateNumber(element, 0, number, 1500, '%');
        } else if (isTime) {
            const number = parseFloat(originalText.replace('分钟', ''));
            animateNumber(element, 0, number, 1500, '分钟');
        } else if (isMultiplier) {
            const number = parseFloat(originalText.replace('x', ''));
            animateNumber(element, 0, number, 1500, 'x');
        }
    });
}

function animateNumber(element, start, end, duration, suffix = '') {
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // 使用缓动函数
        const easedProgress = easeOutQuart(progress);
        const currentNumber = start + (end - start) * easedProgress;
        
        if (suffix === '%') {
            element.textContent = Math.round(currentNumber) + '%';
        } else if (suffix === '分钟') {
            element.textContent = Math.round(currentNumber) + '分钟';
        } else if (suffix === 'x') {
            element.textContent = Math.round(currentNumber) + 'x';
        } else {
            element.textContent = Math.round(currentNumber);
        }
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// 缓动函数
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// 观察器，当元素进入视口时开始动画
function initResultAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateNumbers();
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const resultSections = document.querySelectorAll('.project-results');
    resultSections.forEach(section => {
        observer.observe(section);
    });
}

// 页面加载完成后初始化动画
document.addEventListener('DOMContentLoaded', function() {
    new PortfolioApp();
    
    // 轨道圆圈交互效果
    initOrbitingCircles();
    
    // 初始化数字动画
    setTimeout(() => {
        initResultAnimation();
    }, 500);
    
    // 初始化卡片悬停效果
    initCardHoverEffects();
});

// 卡片悬停效果
function initCardHoverEffects() {
    const progressCards = document.querySelectorAll('.result-item.progress-card');
    
    progressCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// 轨道圆圈交互功能
function initOrbitingCircles() {
    const orbitingIcons = document.querySelectorAll('.orbiting-icon');
    
    orbitingIcons.forEach((icon, index) => {
        // 鼠标悬停效果
        icon.addEventListener('mouseenter', function() {
            // 暂停当前图标的动画
            this.style.animationPlayState = 'paused';
        });
        
        icon.addEventListener('mouseleave', function() {
            // 恢复动画
            this.style.animationPlayState = 'running';
        });
        
        // 点击事件，显示技能信息
        icon.addEventListener('click', function() {
            const skillName = this.getAttribute('title');
            const skillData = this.getAttribute('data-name');
            
            // 创建技能信息提示
            showSkillTooltip(skillName, skillData, this);
            
            // 添加点击波纹效果
            createOrbitRipple(this);
        });
    });
}

// 显示技能提示信息
function showSkillTooltip(skillName, skillData, element) {
    // 移除已存在的提示
    const existingTooltip = document.querySelector('.skill-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // 技能信息数据
    const skillInfo = {
        'ChatGPT': { emoji: '🤖', desc: '对话式AI助手，用于内容创作和问题解决' },
        'Claude': { emoji: '🧠', desc: 'Anthropic开发的AI助手，擅长分析和推理' },
        'Google Drive': { emoji: '☁️', desc: '云端存储和协作平台' },
        'Figma': { emoji: '🎨', desc: '界面设计与原型制作工具' },
        '通义千问': { emoji: '💬', desc: '阿里巴巴开发的大语言模型' },
        '豆包': { emoji: '📦', desc: '字节跳动开发的AI助手' },
        'Visio': { emoji: '📊', desc: 'Microsoft流程图和图表工具' },
        '深度求索': { emoji: '🔍', desc: 'DeepSeek开发的AI模型' }
    };
    
    const info = skillInfo[skillName] || { emoji: '🔧', desc: '专业工具' };
    
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-emoji">${info.emoji}</div>
        <div class="tooltip-name">${skillName}</div>
        <div class="tooltip-desc">${info.desc}</div>
    `;
    
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        text-align: center;
        z-index: 1000;
        animation: tooltipFadeIn 0.3s ease-out forwards;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-width: 200px;
        max-width: 280px;
    `;
    
    document.body.appendChild(tooltip);
    
    // 自动移除提示
    setTimeout(() => {
        tooltip.style.animation = 'tooltipFadeOut 0.3s ease-out forwards';
        setTimeout(() => tooltip.remove(), 300);
    }, 2500);
}

// 创建轨道波纹效果
function createOrbitRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid rgba(156, 163, 175, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.8s ease-out;
        pointer-events: none;
        left: 50%;
        top: 50%;
        margin-left: -30px;
        margin-top: -30px;
        z-index: 15;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}



// Add performance optimization
window.addEventListener('load', () => {
    // Preload critical assets
    const preloadLinks = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}); 