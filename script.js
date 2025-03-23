(() => {
    const init = async () => {
        if (!isHomePage()) return console.log("wrong page");
        await loadJQuery();
        buildHtml();
        buildCss();
        await fetchProducts();
        setNavigation();
        setEvents();

    }
    const LOCAL_STORAGE_KEY = "ebebekCarouselProducts";
    const FAVORITES_KEY = "ebebekFavorites";
    const productURL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
    const carouselTitle = "Beğenebileceğinizi Düşündüklerimiz";
    const appendLocationClass = "Section1";
    const badges = {
        bestSeller: "https://www.e-bebek.com/assets/images/cok-satan.png",
        starred: "https://www.e-bebek.com/assets/images/yildiz-urun.png",
        freeShipping: "https://www.e-bebek.com/assets/images/kargo-bedava.png",
    };

    let favorites = [];

    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        favorites = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.warn("Favori verisi okunamadı:", e);
        favorites = [];
    }

    const loadJQuery = async () => {
        if (typeof window.jQuery !== 'undefined') {
            console.log('jQuery zaten yüklenmiş!');
            return;
        }
        const startTime = performance.now();
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://code.jquery.com/jquery-3.7.1.min.js?cacheBust=${Date.now()}`;
            script.type = 'text/javascript';

            script.onload = () => resolve();
            script.onerror = () => reject(new Error('jQuery yüklenemedi!'));

            document.head.appendChild(script);
        });

        const endTime = performance.now();
        console.log(`jQuery ${(endTime - startTime).toFixed(2)} ms'de yüklendi.`);
    };

    const isHomePage = () => location.hostname === 'www.e-bebek.com' && location.pathname === '/';

    const buildHtml = () => {
        if (document.querySelector('.you-might-like')) {
            console.log('HTML zaten yüklenmiş!');
            return;
        }
        const html = `
            <section class="you-might-like">
                <div class="carousel-container">
                    <div class="container">
                        <div class="carousel-header">
                            <div class="carousel-title">
                                <h2 class="title-text">${carouselTitle}</h2>
                            </div>
                        </div>
                        <div class="carousel">
                            <button aria-label="back" class="carousel-prev"></button>
                            <div class="carousel-body">
                                <div class="carousel-track">
                                </div>
                            </div>
                            
                            <button aria-label="next" class="carousel-next"></button>
                        </div>
                    </div>
                </div>
            </section>
        `;

        $(`.${appendLocationClass}`).append(html);
    }

    const buildCss = () => {
        if (document.querySelector('.ebebekCarouselStyle')) {
            console.log('CSS zaten yüklenmiş!');
            return;
        }
        const css = `
                .you-might-like {
                    padding-top: 20px;
                    padding-bottom: 50px;
                }

                .carousel-title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #fef6eb;
                    padding: 25px 67px;
                    border-top-left-radius: 35px;
                    border-top-right-radius: 35px;
                    font-family: Quicksand-Bold;
                    font-weight: 700;
                }

                @media (max-width: 480px) {
                    .carousel-title {
                        padding: 0 22px 0 10px;
                        background-color: #fff
                    }
                }

                .title-text {
                    font-family: Quicksand-Bold;
                    font-size: 3rem;
                    font-weight: 700;
                    line-height: 1.11;
                    color: #f28e00;
                    margin: 0;
                }


                @media (max-width: 480px) {
                    .title-text {
                        font-size: 2.2rem;
                        line-height: 1.5
                    }
                }

                .carousel {
                    position: relative;
                    box-shadow: 15px 15px 30px 0 #ebebeb80;
                    background-color: #fff;
                    border-bottom-left-radius: 35px;
                    border-bottom-right-radius: 35px;
                }

                @media (max-width: 480px) {
                    .carousel {
                        box-shadow: none;
                        padding-bottom: 30px;
                    }
                }

                .carousel .carousel-prev {
                    background: url(https://cdn06.e-bebek.com/assets/svg/prev.svg) no-repeat;
                    background-color: #fef6eb;
                    background-position: 18px;
                    left: -65px;
                }

                .carousel .carousel-next {
                    background: url(https://cdn06.e-bebek.com/assets/svg/next.svg) no-repeat;
                    background-color: #fef6eb;
                    background-position: 18px;
                    right: -65px;
                }

                .carousel .carousel-next,
                .carousel .carousel-prev {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    position: absolute;
                    bottom: 50%;
                    top: auto;
                    border: 1px solid #0000;
                    cursor: pointer;
                }

                .carousel .carousel-next:hover,
                .carousel .carousel-prev:hover {
                    background-color: #fff;
                    border: 1px solid #f28e00;
                }

                .carousel-body {
                    overflow: hidden;
                }

                .carousel-track {
                    display: flex;
                    padding: 20px 0;
                    transition: transform 0.3s ease-in-out;
                    gap: 15px;
                }

                .carousel-item {
                    flex: 0 0 auto;
                    overflow: hidden;
                    font-family: Poppins, "cursive";
                    font-size: 12px;
                    border: 1px solid #ededed;
                    border-radius: 10px;
                    background-color: #fff;
                    transition: transform 0.3s;
                    color: #7d7d7d;
                    padding: 5px;
                    position: relative;
                    cursor: pointer;
                }

                .carousel-item:hover {
                    color: #7d7d7d;
                    cursor: pointer;
                    box-shadow: 0 0 0 0 #00000030, inset 0 0 0 3px #f28e00;
                }

                .image-wrapper {
                    margin-bottom: 65px;
                    display: flex;
                    justify-content: center;
                    position: relative;
                }

                .image-wrapper img {
                    width: 100%;
                    height: auto;
                    display: block;
                }


                .item-badge {
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    position: absolute;
                    left: 13px;
                    top: 5px;
                    border-radius: 15px;
                    line-height: 26px;
                }

                .item-favorite {
                    position: absolute;
                    cursor: pointer;
                    background-color: #fff;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px 0 #00000024;
                    width: 50px;
                    height: 50px;
                    right: 15px;
                    top: 10px;
                    transition: all 0.3s;
                    border:none;
                }

                .item-favorite:hover {
                    border: 1px solid #f28e00;
                    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                }

                .item-favorite.favorite svg{
                fill: #f28e00;
                }

                .item-favorite svg {
                    width: 25px;
                    height: 25px;
                    position: absolute;
                    top: 13px;
                    right: 12px;
                }
                .item-favorite:hover svg {
                    fill: #f28e00;
                }

                .image-wrapper .item-image {
                    max-width: 100% !important;
                    width: auto;
                    height: 203px;
                    object-fit: contain;
                }

                @media (max-width: 480px) {
                    .image-wrapper .item-image {
                        height: 150px;
                    }
                }

                .special-to-online{
                    font-size: 1rem;
                    position: absolute;
                    left: 19px;
                    bottom: -50px;
                    font-weight: 500;
                    color: #008acf;
                }

                .special-to-online .icon {
                    display: inline-block;
                    vertical-align: text-top;
                    font-size: 16px;
                    margin-left: 7px;
                    height: 15px;
                }

                .item-content {
                    padding: 0 17px 17px;
                    padding-bottom: 13px;
                }


                .item-brand {
                    font-size: 1.2rem;
                    height: 42px;
                    overflow: hidden;
                    margin-bottom: 10px;
                }

                .rating-stars {
                    display: flex;
                    align-items: center;
                    padding: 5px 0 10px;
                }

                .rating-stars .star {
                    font-size: 14px;
                    margin-right: 7.5px;
                }

                .rating-stars .full {
                    color: gold;
                }

                .rating-stars .empty {
                    color: #ccc;
                }

                .item-price {
                    position: relative;
                    display: flex;
                    justify-content: flex-end;
                    flex-direction: column;
                    height: 43px;
                    top: 10px;
                }

                .item-price-discount .old-price {
                    font-size: 1.4rem;
                    font-weight: 500;
                    text-decoration: line-through;
                }

                .item-price-discount .discount-percent {
                    color: #00a365;
                    font-size: 18px;
                    font-weight: 700;
                    display: inline-flex;
                    justify-content: center;
                    margin-left: 10px;
                }

                .item-price-discount .discount-percent .icon {
                    display: inline-block;
                    height: 22px;
                    font-size: 22px;
                    margin-left: 3px;
                }

                .item-price .discounted-price {
                    color: #00a365;
                }

                .item-price .price {
                    display: block;
                    width: 100%;
                    font-size: 2.2rem;
                    font-weight: 600;
                }

                .item-actions {
                    padding: 0 17px 17px;
                    padding-bottom: 13px;
                    margin-top: 70px;
                }

                .item-actions .item-link {
                    position: relative;
                    width: 100%;
                    padding: 15px 20px;
                    border-radius: 37.5px;
                    background-color: #fff7ec;
                    color: #f28e00;
                    font-family: Poppins, "cursive";
                    font-size: 1.4rem;
                    font-weight: 700;
                    margin-top: 25px;
                    border: none;
                    cursor: pointer;
                }

                .item-actions .item-link:hover {
                    background-color: #f28e00;
                    color: #fff;
                }

                @media (min-width: 1480px) {
                    .carousel-item {
                        flex: 0 0 calc(20% - 15px); /* 100 / 5 = 20% */
                    }
                }

                @media (min-width: 1280px) and (max-width: 1479px) {
                    .carousel-item {
                        flex: 0 0 calc(25% - 15px); /* 100 / 4 = 25% */
                    }
                }

                @media (min-width: 768px) and (max-width: 1279px) {
                    .carousel-item {
                        flex: 0 0 calc(33.33% - 15px); /* 100 / 3 = ~33.33% */
                    }
                }
                @media (max-width: 767px) {
                    .carousel-item {
                        flex: 0 0 calc(50% - 15px); /* 100 / 2 = 50% */
                    }
                }

                @media (max-width: 576px) {
                    .container {
                        max-width: 100vw;
                        padding-left: 15px;
                        padding-right: 15px
                    }
                }

                @media (min-width: 576px) {
                    .container {
                        max-width: 540px
                    }
                }

                @media (min-width: 768px) {
                    .container {
                        max-width: 720px
                    }
                }

                @media (min-width: 992px) {
                    .container {
                        max-width: 960px
                    }
                }

                @media (min-width: 1280px) {
                    .container {
                        max-width: 1180px
                    }
                }

                @media (min-width: 1480px) {
                    .container {
                        max-width: 1296px
                    }
                }

                @media (min-width: 1580px) {
                    .container {
                        max-width: 1320px
                    }
                }
        `;

        $(`<style>`).addClass(`ebebekCarouselStyle`).html(css).appendTo(`head`);
    }

    const calculateDiscount = (price, oldPrice) => {
        return oldPrice > price ? "%" + ((oldPrice - price) / oldPrice * 100).toFixed(0) : "%0";
    };
    const cacheData = (key, data, expiryInMinutes = 1440) => {
        try {
            const expiryTimestamp = Date.now() + expiryInMinutes * 60 * 1000;

            const cacheObject = {
                data,
                expiry: expiryTimestamp
            };

            localStorage.setItem(key, JSON.stringify(cacheObject));
            return data;
        } catch (e) {
            console.error("Cache kaydedilemedi:", e);
            return data;
        }
    };

    const cachedData = (key) => {
        try {
            const cacheString = localStorage.getItem(key);
            if (!cacheString) return null;

            const { data, expiry } = JSON.parse(cacheString);

            if (Date.now() > expiry) {
                localStorage.removeItem(key);
                return null;
            }

            return data;
        } catch (e) {
            console.error("Cache okunamadı:", e);
            return null;
        }
    };

    const fetchProducts = async () => {
        let onPending = true;

        if (onPending) {
            console.log("Yükleniyor:", onPending);
        }
        
        const cachedProducts = cachedData(LOCAL_STORAGE_KEY);
        if (cachedProducts) {
            console.log("Veriler önbellekten yüklendi:");
            console.table(cachedProducts);
            renderProducts(cachedProducts);
            onPending = false;
        } else {
            try {
                const response = await fetch(productURL);
                let products = await response.json();
                products = products.map(product => ({
                    ...product,
                    discount: calculateDiscount(product.price, product.original_price)
                }));
                cacheData(LOCAL_STORAGE_KEY, products);
                console.log("Veriler sunucudan yüklendi:");
                console.table(products);
                renderProducts(products);
                onPending = false;
            }
            catch (e) {
                console.log("Hata oluştu", e);
            }
        }
    }

    const getRandomBadges = () => {
        const result = [];
        if (Math.random() < 0.5) {
            result.push("bestSeller");
        } else {
            result.push("freeShipping");
        }
        if (result.includes("bestSeller")) {
            if (Math.random() < 0.5) {
                result.push("starred");
            }
        }

        return result.map(key => ({ name: key, url: badges[key] }));
    };

    const generateStarRating = () => {
        const fullStars = Math.floor(Math.random() * 3) + 3;
        const emptyStars = 5 - fullStars;
        const reviewCount = Math.floor(Math.random() * 100) + 1;

        let html = '<div class="rating-stars">';

        for (let i = 0; i < fullStars; i++) {
            html += '<cx-icon class="star full cx-icon fas fa-star ng-star-inserted"></cx-icon>';
        }

        for (let i = 0; i < emptyStars; i++) {
            html += '<cx-icon class="star empty cx-icon fas fa-star ng-star-inserted"></cx-icon>';
        }

        html += `<span class="review-count">(${reviewCount})</span></div>`;
        return html;
    }


    const renderProducts = (products) => {
        const carouselBody = $('.carousel-track');
        carouselBody.empty();
        products.forEach(product => {
            let discount = product.discount;
            let discountHtml = "";
            let discountedPriceClass = "";
            if (discount !== "%0") {
                discountHtml = `
                    <div class="item-price-discount">
                        <span class="old-price">${product.original_price} TL</span>
                        <span class="discount-percent ml-2">${product.discount} <i class="icon icon-decrease"></i></span>
                    </div>
                `;
                discountedPriceClass = "discounted-price";

            }

            let badgeHtml = `
                <span class="badges">
                ${getRandomBadges().map(badge => `<img src="${badge.url}" alt="${badge.name}">`).join("")}
                </span>
            `;

            const ratingHtml = generateStarRating();

            let special = false;
            if (Math.random() < 0.5) {
                special = true;
            }
            let specialHtml = "";
            if (special) {
                specialHtml = `<span class="special-to-online">İNTERNETE ÖZEL ÜRÜN  <i class="icon icon-interactive"></i></span>`;
            }

            const productHtml = `
                <div class="carousel-item" data-url="${product.url}">
                    <div class="image-wrapper">
                        <div class="item-badge">
                             ${badgeHtml}
                        </div>
                        <button class="item-favorite" alt="heart" data-id="${product.id}">
                            <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group 3">
                                    <g id="heart">
                                    <path id="Shape" fill-rule="evenodd" clip-rule="evenodd" d="M22.6339 2.97449C21.4902 1.83033 19.9388 1.1875 18.3211 1.1875C16.7034 1.1875 15.152 1.83033 14.0084 2.97449L12.8332 4.14968L11.658 2.97449C9.27612 0.592628 5.41435 0.592627 3.03249 2.97449C0.650628 5.35635 0.650628 9.21811 3.03249 11.6L4.20769 12.7752L12.8332 21.4007L21.4587 12.7752L22.6339 11.6C23.778 10.4564 24.4208 8.90494 24.4208 7.28723C24.4208 5.66952 23.778 4.11811 22.6339 2.97449Z" stroke="#FF8A00" stroke-width="2.17391" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <img class="item-image" src="${product.img}" alt="${product.name}">
                        ${specialHtml}
                    </div>
                    <div class="item-content">
                        <h2 class="item-brand">
                            <b>${product.brand} - </b>
                            <span>${product.name}</span>
                        </h2>
                        ${ratingHtml}
                        <div class="item-price">
                            ${discountHtml}
                            <span class="price ${discountedPriceClass}">${product.price} TL</span>
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="item-link">Sepete Ekle</button>
                    </div>
                </div>
            `;
            carouselBody.append(productHtml);


            document.querySelectorAll('.item-favorite').forEach(button => {
                if (favorites.includes(button.dataset.id)) {
                    button.classList.add('favorite');
                }
            });

        });

    }

    const setEvents = () => {
        $(document).off('click', '.item-favorite');
        $(document).on('click', '.item-favorite', function (event) {
            event.stopPropagation();
            const productId = $(this).data('id');
            toggleFavourite(productId, this);
        });
        $(document).off('click', '.carousel-item');
        $(document).on('click', '.carousel-item', function (event) {
            if ($(event.target).closest('.item-favorite').length === 0) {
                const url = $(this).data('url');
                window.open(url, '_blank');
            }
        });
    };

    const toggleFavourite = (id, button) => {
        const index = String(id);
        if (favorites.includes(index)) {
            favorites = favorites.filter(favId => favId !== index);
            button.classList.remove('favorite');
        } else {
            favorites.push(index);
            button.classList.add('favorite');
        }
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    };

    const setNavigation = () => {
        const track = document.querySelector('.carousel-track');
        const prev = document.querySelector('.carousel-prev');
        const next = document.querySelector('.carousel-next');
        const items = document.querySelectorAll('.carousel-item');
        let itemWidth;
        let visibleItems;
        let maxScroll;
        let position = 0;

        const calculateDimensions = () => {
            itemWidth = items[0].getBoundingClientRect().width + 15;
            visibleItems = Math.floor(track.offsetWidth / itemWidth);
            maxScroll = Math.max((items.length - visibleItems) * itemWidth, 0);
            position = Math.min(position, maxScroll);
            updateTransform();
            updateNavigationButtons();
        };

        const updateTransform = () => {
            track.style.transform = `translateX(-${position}px)`;
        };

        const updateNavigationButtons = () => {
            prev.disabled = position === 0;
            next.disabled = position >= maxScroll;
        };

        prev.addEventListener('click', () => {
            position = Math.max(position - itemWidth, 0);
            updateTransform();
            updateNavigationButtons();
        });

        next.addEventListener('click', () => {
            position = Math.min(position + itemWidth, maxScroll);
            updateTransform();
            updateNavigationButtons();
        });


        let startX = 0;
        let endX = 0;

        const handleSwipe = (diffX) => {
            if (Math.abs(diffX) < 50) return;
            if (diffX > 0 && position < maxScroll) {
                position = Math.min(position + itemWidth, maxScroll);
            } else if (diffX < 0 && position > 0) {
                position = Math.max(position - itemWidth, 0);
            }
            updateTransform();
            updateNavigationButtons();
        };


        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe(startX - endX);
        });

        window.addEventListener('resize', calculateDimensions);
        calculateDimensions();
    };
    init();
})();
