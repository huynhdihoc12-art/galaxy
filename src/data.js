// Dữ liệu "Giới thiệu công ty" - Section 02
const companyInfo = {
    bgImage: "/FileUpload/Images/bg2_2.jpg",
    sideImage: "/Content/theme_btq/pictures/background/bg2.jpg",
    titleBold: "MocMoc",
    titleNormal: "Real Estate",
    greeting: "Kính gửi Quý khách hàng,",
    paragraphs: [
        "MỘC MỘC Real Estate là đơn vị tiên phong trong lĩnh vực phát triển và phân phối các dự án bất động sản trung và cao cấp, mang lại không gian sống đẳng cấp cho cộng đồng.",
        "Với danh mục dự án đa dạng từ căn hộ hạng sang đến các khu đô thị sinh thái, chúng tôi cam kết mang lại giá trị bền vững và cơ hội đầu tư sinh lời vượt trội cho khách hàng."
    ],
    detailLink: "/gioi-thieu-ve-galaxy-door/gioi-thieu-1.html"
};

// Render thông tin công ty ra HTML
const infoHome = document.querySelector(".info-home");
if (infoHome) {
    const bgCover = infoHome.querySelector(".bg-cover");
    if (bgCover) bgCover.style.backgroundImage = `url(${companyInfo.bgImage})`;

    const infoContent = infoHome.querySelector(".info-content");
    if (infoContent) {
        infoContent.innerHTML = `
            <p class="info-content-title"><strong>${companyInfo.titleBold}</strong><span class="small-title">${companyInfo.titleNormal}</span></p>
            <div class="box-info">
                <p><em>${companyInfo.greeting}</em></p>
                ${companyInfo.paragraphs.map(p => `<p>${p}</p>`).join('')}
                <div class="bottom-info">
                    <a rel="nofollow" href="${companyInfo.detailLink}" class="view-info">Chi tiết</a>
                </div>
            </div>
        `;
    }

    // Side image đã được chuyển thành video trong index.html
}

// Dữ liệu "Banner Slide" - Section 01
const bannerSlides = [
    {
        image: "/FileUpload/Images/pexels-phamthe-32755065.jpg",
        titleNormal: "Không gian ",
        titleBold: "Thượng lưu",
        description: "Kiến trúc hiện đại hòa quyện cùng thiên nhiên, mang đến trải nghiệm sống đẳng cấp và tinh tế cho cộng đồng cư dân tinh hoa."
    },
    {
        image: "/FileUpload/Images/pexels-thejourneyofframes-25920939.jpg",
        titleNormal: "Vị trí ",
        titleBold: "Tâm điểm",
        description: "Tọa lạc tại vị trí đắc địa, dễ dàng kết nối mọi tiện ích huyết mạch, kiến tạo nhịp sống năng động ngay giữa lòng đô thị."
    },
    {
        image: "/FileUpload/Images/pexels-lethangmr-8100034.jpg",
        titleNormal: "Tiện ích ",
        titleBold: "Hoàn hảo",
        description: "Tận hưởng hệ sinh thái tiện ích đa dạng, từ hồ bơi, công viên đến trung tâm thương mại, chăm sóc trọn vẹn cuộc sống gia đình bạn."
    },
    {
        image: "/FileUpload/Images/pexels-ngan-nguy-n-489932883-35662840.jpg",
        titleNormal: "Cơ hội ",
        titleBold: "Sinh lời",
        description: "Bất động sản có tiềm năng tăng giá vượt trội, là lựa chọn vàng cho các nhà đầu tư thông thái tìm kiếm giá trị bền vững theo thời gian."
    },
    {
        image: "/FileUpload/Images/pexels-skydesign-1346715-15596503.jpg",
        titleNormal: "Kiến trúc ",
        titleBold: "Đột phá",
        description: "Mỗi không gian là một tác phẩm nghệ thuật với thiết kế mở, tối ưu ánh sáng tự nhiên, tạo nên sự thông thoáng và sang trọng tuyệt đối."
    },
    {
        image: "/FileUpload/Images/pexels-minan1398-1042594.jpg",
        titleNormal: "An ninh ",
        titleBold: "An tâm",
        description: "Hệ thống bảo vệ đa lớp cùng quy trình quản lý chuyên nghiệp, đảm bảo sự riêng tư và an toàn tối đa cho tổ ấm của bạn."
    },
    {
        image: "/FileUpload/Images/pexels-anaussieinvietnam-21230649.jpg",
        titleNormal: "Mộc Mộc ",
        titleBold: "Real Estate",
        description: "Đơn vị phát triển bất động sản uy tín, cam kết mang đến những sản phẩm chất lượng và giá trị sống đích thực cho khách hàng."
    }
];

// Render banner slides ra HTML
const slidePics = document.querySelector(".slide-pics");
if (slidePics) {
    slidePics.innerHTML = bannerSlides.map(slide => `
        <div class="home-1">
            <div class="bg-home" style="background-image: url(${slide.image})"></div>
            <div class="text-banner">
                <div class="description">
                    <div class="txt-description">
                        <span style="font-size: 175%">${slide.titleNormal}<strong>${slide.titleBold}</strong></span>
                        <p>${slide.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Dữ liệu danh mục "Các dòng sản phẩm"
const categories = [
    {
        image: "/FileUpload/Images/hungquach679png-house-7310177_1920.jpg",
        name: "Residential",
        link: "/cac-dong-san-pham/cua-nha-pho-biet-thu.html"
    },
    {
        image: "/FileUpload/Images/hathanhphu7-building-5671184_1920.jpg",
        name: "Commercial",
        link: "/cac-dong-san-pham/cua-can-ho-thephgfgo.html"
    },
    {
        image: "/FileUpload/Images/fonthipward-maldives-262511_1920.jpg",
        name: "Hospitality",
        link: "/cac-dong-san-pham/cua-thong-phong-wpcabsgo.html"
    },
    {
        image: "/FileUpload/Images/marcinjozwiak-production-4408573_1920.jpg",
        name: "Industrial",
        link: "/cac-dong-san-pham/cua-chong-chay-ei6090120.html"
    },
    {
        image: "/FileUpload/Images/71.png",
        name: "Land & Planning",
        link: "/cac-dong-san-pham/cua-cuon-chong-chay-ei60-e90-e120.html"
    },
    {
        image: "/FileUpload/Images/galaxycurtains2025_6.jpg",
        name: "Amenities & Landscape",
        link: "/cac-dong-san-pham/rem-ngan-chay-ei60-ei90.html"
    }
];

// Render danh mục ra HTML
const sliderCate = document.querySelector(".slider-cate");
if (sliderCate) {
    sliderCate.innerHTML = categories.map(cate => `
            <div class="item-product-home">
                <div class="pic-img">
                    <img src="${cate.image}" alt="${cate.name}" />
                </div>
                <div class="txt-pro-home">
                    <p>${cate.name}</p>
                </div>
                <a href="${cate.link}"></a>
            </div>
        `).join('');
}

// Dữ liệu "Dự án đã thực hiện"
const projects = [
    {
        image: "/FileUpload/Images/galaxy_doors_indochinaiph_1.jpg",
        title: "CHUNG CƯ IPH INDOCHINA",
        link: "/du-an/chung-cu-nha-dan-dung/chung-cu-iph-indochina-2019202043.html"
    },
    {
        image: "/FileUpload/Images/galaxy_doors_thongnhatcomplex_1.jpg",
        title: "CHUNG CƯ THỐNG NHẤT COMPLEX",
        link: "/du-an/chung-cu-nha-dan-dung/chung-cu-thong-nhat-complex-2019202042.html"
    },
    {
        image: "/FileUpload/Images/galaxy_doors_imperiaskygarden2_1.jpg",
        title: "CHUNG CƯ IMPERIA SKY GARDEN 2",
        link: "/du-an/chung-cu-nha-dan-dung/chung-cu-imperia-sky-garden-2-2019202041.html"
    },
    {
        image: "/FileUpload/Images/galaxy_doors_ecolifecapitol2_1.jpg",
        title: "CHUNG CƯ ECOLIFE CAPITAL 2",
        link: "/du-an/chung-cu-nha-dan-dung/chung-cu-ecolife-capital-2-2019202039.html"
    },
    {
        image: "/FileUpload/Images/galaxy_doors_nmlocdaudungquat_1.jpg",
        title: "NHÀ MÁY LỌC DẦU DUNG QUẤT",
        link: "/du-an/cong-trinh-dac-biet/nha-may-loc-dau-dung-quat-2019202038.html"
    }
];

// Render dự án ra HTML
const sliderProject = document.querySelector(".slider-project");
if (sliderProject) {
    sliderProject.innerHTML = projects.map(project => `
            <div class="item-project-home">
                <div class="pic-img">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="txt-project-home">
                    <div class="title-project"> <strong>Dự án</strong> Đã thực hiện</div>
                    <h3>${project.title}</h3>
                </div>
                <a href="${project.link}"></a>
            </div>
        `).join('');
}

// Dữ liệu "Thông tin mới" - Tin tức
const newsItems = [
    {
        image: "/FileUpload/Images/phuoc_thinh_tai_91_an_duong_vuong_tp_hue_1.jpg",
        title: "MỘC MỘC Real Estate ĐÃ CÓ MẶT TẠI 91 AN DƯƠNG VƯƠNG, TP. HUẾ",
        link: "/truyen-thong/khuyen-mai-uu-dai/galaxy-doors-da-co-mat-tai-91-an-duong-vuong-tp-hue-20192020195.html"
    },
    {
        image: "/FileUpload/Images/cafebizhinh_1_canh_cua_mo_ra_khong_gian_song_tai_khu_do_thi_watterpoint_nam_long.jpg",
        title: "MỘC MỘC KỂ CHUYỆN VẺ ĐẸP VỀ CỬA VÀ NỘI THẤT",
        link: "/truyen-thong/khuyen-mai-uu-dai/galaxy-ke-chuyen-ve-dep-ve-cua-va-noi-that-20192020194.html"
    }
];

// Dữ liệu "Sản phẩm, Giải pháp mới"
const infoPro = {
    title: "Cơ hội Đầu tư",
    description: "MỘC MỘC ESTATE: RA MẮT CĂN HỘ CAO CẤP TẠI TP. HUẾ - ƯU ĐÃI GIAI ĐOẠN 1",
    link: "/du-an/can-ho-cao-cap/ra-mat-du-an-moi-tp-hue.html"
};

// Render tin tức ra HTML
const newsContainer = document.querySelector(".news-home .container-main");
if (newsContainer) {
    // Render item-news-home
    const newsHTML = newsItems.map(news => `
        <div class="item-news-home">
            <div class="pic-img">
                <img src="${news.image}" alt="${news.title}" />
            </div>
            <div class="txt-news-home">
                <div class="title">${news.title}</div>
                <a href="${news.link}" class="view">Chi tiết</a>
            </div>
        </div>
    `).join('');

    // Render info-pro-home
    const infoProHTML = `
        <div class="info-pro-home">
            <div class="title">${infoPro.title}</div>
            <p>${infoPro.description}</p>
            <a href="${infoPro.link}" class="view-1">Xem chi tiết <span></span></a>
        </div>
    `;

    // Chèn sau .title-h
    const titleH = newsContainer.querySelector(".title-h");
    if (titleH) {
        titleH.insertAdjacentHTML('afterend', newsHTML + infoProHTML);
    }
}
