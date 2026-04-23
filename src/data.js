// Dữ liệu "Giới thiệu công ty" - Section 02
const companyInfo = {
    bgImage: "/FileUpload/Images/bg2_2.jpg",
    sideImage: "/Content/theme_btq/pictures/background/bg2.jpg",
    titleBold: "Mộc Mộc",
    titleNormal: " Vietnam",
    greeting: "Kính gửi Quý khách hàng,",
    paragraphs: [
        "MỘC MỘC Việt Nam cung cấp giải pháp toàn diện về cửa và nội thất, phân phối đa kênh tại thị trường Việt Nam với 2 thương hiệu MỘC MỘC Door, MỘC MỘC Concept.",
        "Hiện tại, MỘC MỘC Việt Nam vận hành nhà máy diện tích 30.000m2 ứng dụng dây truyền công nghệ Nhật Bản, tạo ra năng lực khả cung hơn 350,000m2 sản phẩm cửa/năm và 200,000m2 sản phẩm nội thất cho thị trường Việt Nam..."
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
            <p class="info-content-title"><strong>${companyInfo.titleBold}</strong>${companyInfo.titleNormal}</p>
            <div class="box-info">
                <p><em>${companyInfo.greeting}</em></p>
                ${companyInfo.paragraphs.map(p => `<p>${p}</p>`).join('')}
                <div class="bottom-info">
                    <a rel="nofollow" href="${companyInfo.detailLink}" class="view-info">Chi tiết</a>
                </div>
            </div>
        `;
    }

    const imgInfo = infoHome.querySelector(".img-info img");
    if (imgInfo) imgInfo.src = companyInfo.sideImage;
}

// Dữ liệu "Banner Slide" - Section 01
const bannerSlides = [
    {
        image: "/FileUpload/Images/thesonggalaxydoorsvungtau_5.JPG",
        titleNormal: "Nhà đẹp ",
        titleBold: "từ cửa",
        description: "Trong kiến trúc hiện đại, hạng mục cửa giữ vai trò quan trọng và đồng nhất với kiến trúc tổng thể, các vị trí cửa như một dòng năng lượng chảy không ngừng trong tòa nhà."
    },
    {
        image: "/FileUpload/Images/bg13.jpg",
        titleNormal: "Khả cung ",
        titleBold: "vượt trội",
        description: "MỘC MỘC Door vận hành 01 nhà máy diện tích 2ha, hơn 300 nhân sự, tạo ra năng lực khả cung hơn 350.000 m2 sản phẩm/năm cho thị trường Việt Nam và phụ cận."
    },
    {
        image: "/FileUpload/Images/galaxydoorsgalaxyconceptbannerhome2025_5.jpg",
        titleNormal: "Giải pháp ",
        titleBold: "toàn diện",
        description: "MỘC MỘC Door là đơn vị sản xuất, cung cấp giải pháp toàn diện về cửa và thi công uy tín hàng đầu Việt Nam."
    },
    {
        image: "/FileUpload/Images/galaxydoorszalo_1280x720px.jpg",
        titleNormal: "Phân phối ",
        titleBold: "bán lẻ",
        description: "MỘC MỘC Door trực tiếp sản xuất và thi công dự án xây dựng trọng điểm, thúc đẩy phân phối bán lẻ thông qua hơn 100 Đại lý trên toàn quốc."
    },
    {
        image: "/FileUpload/Images/greendiamondgalaxydoorsbannerwebgalaxy.JPG",
        titleNormal: "Thi công ",
        titleBold: "Dự án",
        description: "MỘC MỘC Door có gần 20 năm kinh nghiệm cung cấp giải pháp toàn diện về cửa và thi công hơn 60% các dự án xây dựng lớn tại Việt Nam."
    },
    {
        image: "/FileUpload/Images/galaxydoorsgalaxyconceptbannerhome2025_1.jpg",
        titleNormal: "Dịch vụ ",
        titleBold: "xuất sắc",
        description: "MỘC MỘC Door không chỉ đầu tư vào chất lượng sản phẩm, giải pháp đồng bộ, cam kết sứ mệnh thương hiệu mà còn tập trung phát triển khách hàng, mở rộng thị trường để chuỗi cung ứng cùng phát triển bền vững!"
    },
    {
        image: "/FileUpload/Images/thestandarbinhduonggalaxydoors_6.JPG",
        titleNormal: "Chất lượng ",
        titleBold: "đồng bộ",
        description: "Tất cả các sản phẩm cửa chất liệu thép của MỘC MỘC Door đã được Cục Cảnh sát Phòng cháy Chữa cháy kiểm định và xác nhận đạt tiêu chuẩn chống cháy TCXDVN 368;2007 tương đương với tiêu chuẩn Anh BS EN 1634-2000."
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
        image: "/FileUpload/Images/galaxydoorstradionalavatarhuynh4canhkinh_1.jpg",
        name: "CỬA NHÀ PHỐ, BIỆT THỰ",
        link: "/cac-dong-san-pham/cua-nha-pho-biet-thu.html"
    },
    {
        image: "/FileUpload/Images/2_2.png",
        name: "CỬA CĂN HỘ THÉP/HGF/GỖ",
        link: "/cac-dong-san-pham/cua-can-ho-thephgfgo.html"
    },
    {
        image: "/FileUpload/Images/galaxylaminatedoor_cualaminate.jpg",
        name: "CỬA THÔNG PHÒNG WPC/ABS/GỖ",
        link: "/cac-dong-san-pham/cua-thong-phong-wpcabsgo.html"
    },
    {
        image: "/FileUpload/Images/cuachongchay.png",
        name: "CỬA CHỐNG CHÁY EI60/90/120",
        link: "/cac-dong-san-pham/cua-chong-chay-ei6090120.html"
    },
    {
        image: "/FileUpload/Images/71.png",
        name: "CỬA CUỐN CHỐNG CHÁY EI60-E90-E120",
        link: "/cac-dong-san-pham/cua-cuon-chong-chay-ei60-e90-e120.html"
    },
    {
        image: "/FileUpload/Images/galaxycurtains2025_6.jpg",
        name: "RÈM NGĂN CHÁY EI60-EI90",
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
        title: "MỘC MỘC DOORS ĐÃ CÓ MẶT TẠI 91 AN DƯƠNG VƯƠNG, TP. HUẾ",
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
    title: "Sản phẩm, Giải pháp mới",
    description: "MỘC MỘC DOORS ĐÃ CÓ MẶT TẠI 91 AN DƯƠNG VƯƠNG, TP. HUẾ",
    link: "/truyen-thong/san-pham-giai-phap-moi/galaxy-doors-da-co-mat-tai-91-an-duong-vuong-tp-hue-20192020195.html"
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
