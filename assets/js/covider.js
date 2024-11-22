var contents =  [
    {
        heading: "Perjalanan kembali dengan lebih aman",
        description: "Selalu perbarui tips terbaru untuk menyesuaikan rencana perjalanan selama dan setelah pandemi COVID-19.",
        cards: [
            {
                heading: "Jawaban tentang kenyamanan untuk pengguna",
                description: "Pelajari bagaimana kami mendukung Anda dengan program dan kebijakan terbaru.",
                image: "covid-01.jpg",
            },
            {
                heading: "Regulasi pembatasan perjalanan global",
                description: "Periksa panduan untuk Tuan rumah dan tamu di area atau tujuan Anda.",
                image: "covid-02.jpg",
            },
            {
                heading: "Reservasi yang terpengaruh oleh kenyamanan",
                description: "Pelajari opsi pembatalan dan pengembalian dana.",
                image: "covid-03.jpg",
            },
            {
                heading: "Lebih tenang dengan perencanaan yang matang",
                description: "Pelajari cara menyaring akomodasi dengan kebijakan pembatalan yang fleksibel.",
                image: "covid-04.jpg",
            },
        ]
    },
    {
        heading: "Menjaga keselamatan adalah tanggung jawab bersama",
        description: "Kami meminta komunitas Airbnb untuk berkomitmen melaksanakan langkah-langkah perlindungan kesehatan dan keselamatan terbaru kami.",
        cards: [
            {
                heading: "Menggunakan masker",
                description: "Tamu dan Tuan rumah harus mematuhi hukum dan pedoman setempat terkait penggunaan masker saat berinteraksi.",
                image: "covid-05.jpg",
            },
            {
                heading: "Jarak sosial",
                description: "Saat diminta oleh hukum atau pedoman setempat, Tuan rumah dan tamu harus setuju untuk menjaga jarak kenyamanan satu sama lain.",
                image: "covid-06.jpg",
            },
            {
                heading: "Pembersihan yang lebih ketat",
                description: "Tuan rumah di seluruh dunia berkomitmen untuk menerapkan proses pembersihan yang lebih ketat dengan referensi dari para ahli kami.",
                image: "covid-07.jpg",
            },
        ]
    },
    {
        cards: [
            {
                name: "Pelajari langkah-langkah menjaga keselamatan",
                image: "covid-08.jpg"
            },
            {
                name: "Pelajari lebih lanjut",
                image: "covid-09.jpg"
            },
            {
                name: "Jelajahi rumah-rumah pribadi di dekat Anda",
                image: "covid-10.jpg"
            },
        ]
    },
    ];
    
    // Card-4
    const card4Elements = document.getElementById('card-4');
    card4Elements.innerHTML = contents[0].cards.map(card => {
        return`
        <div class="col l-6 m-6 c-12">
            <a href="#" class="card-4-wrapper">
                <img class="card-4-img" src="./assets/img/${card.image}" alt="${card.heading}">
                <div class="card-4-text">
                    <div class="card-4-heading">
                        <span>${card.heading}</span>
                    </div>
                    <div class="card-4-description">
                        <span>${card.description}</span>
                    </div>
                    <span class="card-4-link">Pelajari lebih lanjut</span>
                </div>
            </a>
        </div>   
        `
    }).join('');
    
    // Card-3
    const card3Elements = document.getElementById('card-3');
    card3Elements.innerHTML = contents[1].cards.map(card => {
        return`
        <div class="col l-4 m-4 c-12">
            <div class="card-3-wrapper">
                <div class="card-3-img-wrapper">
                    <img class="card-3-img" src="./assets/img/${card.image}" alt="${card.heading}">
                </div>
                <div class="card-3-text">
                    <div class="card-3-heading">
                        <span>${card.heading}</span>
                    </div>
                    <div class="card-3-description">
                        <span>${card.description}</span>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join('');
    
    // Card 1
    const card1Elements = document.querySelectorAll('.card-1-btn-img');
    card1Elements.forEach((value, index) => {
        const card = contents[2].cards[index]
        value.innerHTML = `
            <div class="card-1-btn">
                    <a href="#" class="card-1-btn-text">
                        <span>${card.name}</span>
                    </a>
                </div>
                <div class="card-1-img" style="background-image: url(./assets/img/${card.image});"></div>
            </div>
            `;
    });
    