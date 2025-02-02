
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const navbarUserLogin = document.querySelector('.navbar-user-login');
document.onclick = function(e) {
    if (e.target.closest('.navbar-user-login')) {
        document.querySelector('.navbar-user').classList.toggle('active');
    } else {
        document.querySelector('.navbar-user').classList.toggle('active', false);
    }
}

const navSearchList0 = $$('.nav-search-text[data-index="0"]'); // Lapor masuk - keluar
const navSearchList2 = $('.nav-search-text[data-index="2"]');
const navSearchList10 = $('.nav-search-text [data-index="0"]');
const navSearchList11 = $('.nav-search-text [data-index="1"]'); 

const navExpList = $$('.navbar-exp-link');
let isClosedFlexDate = true;
navExpList.forEach((btn, index) => {
    btn.onclick = function() {
        if (!btn.classList.contains('active')) {
            navExpList.forEach((expLink, index) => {
                expLink.classList.toggle('active', false);
            })
            btn.classList.toggle('active');
            if (index < 2) {
                if (index === 0) {
                    navSearchList0.forEach(list => list.classList.toggle('disabled', !isClosedFlexDate));
                    navSearchList2.classList.toggle('disabled', isClosedFlexDate);
                }
                if (index === 1) {
                    navSearchList0.forEach(list => list.classList.toggle('disabled', true));
                    navSearchList2.classList.toggle('disabled', true);
                }
                navSearchList10.classList.toggle('disabled', index === 1);
                navSearchList11.classList.toggle('disabled', index === 0);
            }
        }
    }
});

const navPlace = $$('.nav-search-place-option input');
function renderNavPlace() {
    const navPlaceChecked = $$('.nav-search-place-option input.checked');
    let html = '';
    navPlaceChecked.forEach((place,index) => {
        if (index < (navPlaceChecked.length - 1))
            html = html.concat(place.value,', ')
        else 
            html = html.concat(place.value,' ')
    })
    $('.nav-search-input').value = html;
    if (navPlaceChecked.length > 0)
        $('.nav-search-input').style.fontWeight = '700';
    else 
        $('.nav-search-input').style.fontWeight = '400';

}
navPlace.forEach(place => {
    place.onclick = function() {
        place.classList.toggle('checked');
        renderNavPlace();
    }
})

// Check-in - jadwal check-out
const navDate = $$('.nav-search-text[data-index="0"]');


isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !==0) || (year % 100 === 0 && year % 400 ===0);
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

let calendar = $('.calendar');

// Generate Calendar

let activeDate;
let activeDay = [];

generateCalendar = (month, year) => {
    let calendarDays = $('.calendar-days');
    let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    calendarDays.innerHTML = '';
    let currDate = new Date();

    $('#month').innerHTML = `Bulan ${++month}`;
    $('#year').innerHTML = `Tahun ${year}`;

    --month;
    let firstDate = new Date(year, month, 1);
    let firstDay = firstDate.getDay();

    for(let i = 1; i <= daysOfMonth[month] + firstDay - 1; i++) {
        let day = document.createElement('div');
        day.classList.add('disabled');
        if (firstDay === 0) {
            firstDay = 7;
        } else
        if (i >= firstDay) {
            day.innerHTML = i - firstDay + 1;
            if (year > currDate.getFullYear()) {
                day.classList.remove('disabled');
            }
            if (year >= currDate.getFullYear() &&  month > currDate.getMonth()) {
                day.classList.remove('disabled');
            }
            if (i - firstDay + 1 >= currDate.getDate() && year >= currDate.getFullYear() &&  month >= currDate.getMonth()) {
                day.classList.remove('disabled');
            }
            if (activeDay !== undefined){
                activeDay.forEach(dayActive => {
                    if (i - firstDay + 1 === dayActive.date && year === dayActive.year &&  month === dayActive.month) {
                        day.classList.toggle('active', true);
                    }
                })
            }
        }
        calendarDays.appendChild(day);
    }
}

let currDate = new Date();
let currMonth = currDate.getMonth();
let currYear = currDate.getFullYear();

generateCalendar(currMonth, currYear);

// Hit prev-next button

const prevMonth = $('#prev-month');
const nextMonth = $('#next-month');

function checkActive () {
    activeDate = $$('.calendar-days .active');
    if (activeDate !== null) {
        activeDate.forEach(date => {
            let active = {
                'date': parseInt(date.innerHTML),
                'month': currMonth,
                'year': currYear
            }
            if (activeDay.length === 2){
                Object.assign(activeDay[1], active);
            }
            else activeDay.push(active);
        })
    }
}

prevMonth.onclick = function () {
    if (currMonth < 1) {
        currMonth = 12;
        --currYear;
    } else {
        --currMonth;
    }
    generateCalendar(currMonth, currYear);
}

nextMonth.onclick = function () {
    if (currMonth > 12) {
        currMonth = 1;
        ++currYear;
    } else {
        ++currMonth;
    }
    generateCalendar(currMonth, currYear);
}

let checkOutRoom;

$('.nav-search-calendar').onclick = function (e) {
    if (e.target.closest('.calendar-body')) {
        if (!e.target.classList.contains('disabled')) {
            e.target.classList.toggle('active');
            checkActive();
            navDate[0].querySelector('.nav-search-description').innerHTML = `${e.target.innerHTML} ${$('#month').innerHTML}`;
            navDate[0].querySelector('.nav-search-description').style.fontWeight = '700';
            navDate[0].classList.toggle('active');
            navDate[1].classList.toggle('active');
            $('.nav-search-calendar').onclick = function (e) {
                if (e.target.closest('.calendar-body')) {
                    if (!e.target.classList.contains('disabled')) {
                        if (!e.target.classList.contains('active')) {
                            if (checkOutRoom !== e.target && checkOutRoom !== undefined) {
                                checkOutRoom.classList.toggle('active', false);
                            }
                            e.target.classList.toggle('active');
                            checkActive();
                            checkOutRoom = e.target;
                            navDate[1].querySelector('.nav-search-description').innerHTML = `${e.target.innerHTML} ${$('#month').innerHTML}`;
                            navDate[1].querySelector('.nav-search-description').style.fontWeight = '700';
                        }
                    }
                }
            }
        }
    }
}


// Menampilkan tanggal dari tanggal fleksibel
function renderFlexDate() {
    const howLong = $('.nav-search-flexible-how-long input.checked');

    const monthFlex = $$('.nav-search-flexible-when-month.checked');
    let html = ' ';
    monthFlex.forEach((month,index) =>{
        if (index < (monthFlex.length-1)) 
            html = html.concat('thg ',month.getAttribute("name"),', ');
        else
            html = html.concat('thg ',month.getAttribute("name"));
    });

    $('.nav-search-text[data-index="2"] .nav-search-description').innerHTML = `${howLong.value} vào ${html}`;
    $('.nav-search-text[data-index="2"] .nav-search-description').style.fontWeight = '700';
}

// Tanggal fleksibel
const howLongBtn = $$('.nav-search-flexible-how-long input');
howLongBtn.forEach(btn => {
    btn.onclick = function() {
        howLongBtn.forEach(btn => {
            btn.classList.toggle('checked', false);
        })
        btn.classList.toggle('checked', true);
        renderFlexDate();
    }
});
const whenBtn = $$('.nav-search-flexible-when-month');
const numWhenBtn = $$('.nav-search-flexible-when-month.checked');
let numWhenBtnLength = 1;
whenBtn.forEach((btn, index) => {
    btn.onclick = function() {
        let check = btn.classList.contains('checked');
        check = !check;
        if (check){
            btn.classList.toggle('checked', check);
            btn.querySelector('.nav-search-flexible-when-month-icon').innerHTML = '<i class="far fa-calendar-check"></i>';
            numWhenBtnLength++;
            renderFlexDate();
        }
        if (!check && numWhenBtnLength > 1){
            btn.classList.toggle('checked', check);
            btn.querySelector('.nav-search-flexible-when-month-icon').innerHTML = '<i class="far fa-calendar"></i>';
            numWhenBtnLength--;
            renderFlexDate();
        }
    }
})

// Beralih antara kalender dan tanggal secara fleksibel
const optionTextBtn = $$('.nav-search-option-text');
optionTextBtn.forEach((btn,index) => {
    btn.onclick = function() {
        if (!btn.classList.contains('active')) {
            optionTextBtn.forEach(btn => {
                btn.classList.toggle('active', false);
            })
            btn.classList.toggle('active');
            $('.nav-search-flexible').classList.toggle('disabled', index === 0);
            $('.nav-search-calendar').classList.toggle('disabled', index === 1);
            if (index === 1) {
                navSearchList0.forEach(list => list.classList.toggle('disabled'));
                navSearchList2.classList.toggle('disabled');
                isClosedFlexDate = !isClosedFlexDate;
                renderFlexDate();
            }
            if (index === 0) {
                navSearchList0.forEach(list => list.classList.toggle('disabled'));
                navSearchList2.classList.toggle('disabled');
            }
        }
    }
});

// Jumlah tamu
const btnGuest = $$('.nav-search-guest-item .nav-search-guest-btn');
const numberGuest = $('.nav-search-number-guest');
let sumGuest = 0;
btnGuest.forEach(btn => {
    let valueInput = btn.querySelector('input').value;
    const valueMax = Number(btn.querySelector('input').name);
    
    btn.querySelector('.nav-search-guest-minus').toggleAttribute('disabled', valueInput === '0');
    btn.querySelector('.nav-search-guest-plus').onclick = function() {
        valueInput++;
        sumGuest++;
        numberGuest.classList.toggle('active', true);
        numberGuest.innerHTML = `${sumGuest} Khách`;

        if (valueInput === valueMax) {
            btn.querySelector('.nav-search-guest-plus').toggleAttribute('disabled', true);
        }
        btn.querySelector('input').value = valueInput;
        btn.querySelector('.nav-search-guest-minus').toggleAttribute('disabled', false);
    }
    btn.querySelector('.nav-search-guest-minus').onclick = function() {
        valueInput--;
        sumGuest--;
        if (sumGuest === 0){
            numberGuest.innerHTML = "Thêm khách";
            numberGuest.classList.toggle('active', false);
        } 
        else
            numberGuest.innerHTML = `${sumGuest} Khách`;
        btn.querySelector('input').value = valueInput;
        btn.querySelector('.nav-search-guest-minus').toggleAttribute('disabled', valueInput === 0);
        btn.querySelector('.nav-search-guest-plus').toggleAttribute('disabled', valueInput === valueMax);
    }
})

// Ekspor kalender dalam pengalaman - tanggal

let activeDay2 = [];

generateCalendar2 = (month, year) => {
    let calendarDays = $$('.calendar-days')[1];
    let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    calendarDays.innerHTML = '';
    let currDate = new Date();

    $('#month2').innerHTML = `Bulan ${++month}`;
    $('#year2').innerHTML = `Tahaun ${year}`;

    --month;
    let firstDate = new Date(year, month, 1);
    let firstDay = firstDate.getDay();

    for(let i = 1; i <= daysOfMonth[month] + firstDay - 1; i++) {
        let day = document.createElement('div');
        day.classList.add('disabled');
        if (firstDay === 0) {
            firstDay = 7;
        } else
        if (i >= firstDay) {
            day.innerHTML = i - firstDay + 1;
            if (year > currDate.getFullYear()) {
                day.classList.remove('disabled');
            }
            if (year >= currDate.getFullYear() &&  month > currDate.getMonth()) {
                day.classList.remove('disabled');
            }
            if (i - firstDay + 1 >= currDate.getDate() && year >= currDate.getFullYear() &&  month >= currDate.getMonth()) {
                day.classList.remove('disabled');
            }
            if (activeDay2 !== undefined){
                activeDay2.forEach(dayActive => {
                    if (i - firstDay + 1 === dayActive.date && year === dayActive.year &&  month === dayActive.month) {
                        day.classList.toggle('active', true);
                    }
                })
            }
        }
        calendarDays.appendChild(day);
    }
}

generateCalendar2(currMonth, currYear);

// Tekan tombol sebelumnya-berikutnya

const prevMonth2 = $('#prev-month2');
const nextMonth2 = $('#next-month2');

function checkActive () {
    activeDate = $$('.calendar-days .active');
    if (activeDate !== null) {
        activeDate.forEach(date => {
            let active = {
                'date': parseInt(date.innerHTML),
                'month': currMonth2,
                'year': currYear2
            }
            if (activeDay2.length === 2){
                Object.assign(activeDay2[1], active);
            }
            else activeDay2.push(active);
        })
    }
}

let currMonth2 = currDate.getMonth();
let currYear2 = currDate.getFullYear();

prevMonth2.onclick = function () {
    if (currMonth2 < 1) {
        currMonth2 = 12;
        --currYear2;
    } else {
        --currMonth2;
    }
    generateCalendar2(currMonth2, currYear2);
}

nextMonth2.onclick = function () {
    if (currMonth2 > 12) {
        currMonth2 = 1;
        ++currYear2;
    } else {
        ++currMonth2;
    }
    generateCalendar2(currMonth2, currYear2);
}

// Cetak tanggal di pengalaman/tanggal

let checkOutRoom2;

const navExpDate = $('.nav-search-text [data-index="1"]');
$('.nav-search-calendar-2').onclick = function (e) {
    if (e.target.closest('.calendar-body')) {
        if (!e.target.classList.contains('disabled')) {
            e.target.classList.toggle('active');
            checkActive();
            let html1 = `${e.target.innerHTML} ${$('#month2').innerHTML}`;
            navExpDate.querySelector('.nav-search-description').innerHTML = html1;
            navExpDate.querySelector('.nav-search-description').style.fontWeight = '700';
            $('.nav-search-calendar-2').onclick = function (e) {
                if (e.target.closest('.calendar-body')) {
                    if (!e.target.classList.contains('disabled')) {
                        if (!e.target.classList.contains('active')) {
                            if (checkOutRoom2 !== e.target && checkOutRoom2 !== undefined) {
                                checkOutRoom2.classList.toggle('active', false);
                            }
                            e.target.classList.toggle('active');
                            checkActive();
                            checkOutRoom2 = e.target;
                            let html2 = `${e.target.innerHTML} ${$('#month2').innerHTML}`;
                            console.log(html1)
                            console.log(html2)
                            if (html1 !== html2) {
                                html2 = `${html1} - ${html2}`;
                                navExpDate.querySelector('.nav-search-description').innerHTML = html2;
                            }
                        }
                    }
                }
            }
        }
    }
}

// Pengalaman - hari
let htmlExpDate = [];
function renderExpDate(calendar, index) {
    htmlExpDate[index] = calendar;
    const navExpDate = $('.nav-search-text [data-index="1"]');
    if (htmlExpDate[0] === htmlExpDate[1]) 
        navExpDate.querySelector('.nav-search-description').innerHTML = htmlExpDate[0];
    else
        navExpDate.querySelector('.nav-search-description').innerHTML = htmlExpDate.join(' Tiba ');
    navExpDate.querySelector('.nav-search-description').style.fontWeight = '700';

}

$$('.nav-search-calendar-2 input').forEach((calendar, index) => {
    let html = [];
    calendar.onchange = function () {
            renderExpDate(calendar.value, index)
    }
})


const navBarText = $$('.nav-search-text');
document.onclick = function (e) {
    if (window.innerWidth < 741) {
        if (e.target.closest('.nav-search-header-mobile-cancel')) {
            $('.nav-search-header-wrap').classList.toggle('disabled', false);
            $('.navbar').classList.toggle('activeMobile', false);
            $('.nav-search-header-mobile-wrap').classList.toggle('disabled', true);
        }
    } else {
        if (e.target.closest('.navbar-user-login')) {
            $('.navbar-user').classList.toggle('active');
        } else if (e.target.closest('.nav-search-bar')) {
            if (e.target.closest('.nav-search-btn')) {
                $('.nav-search-btn').classList.toggle('active', true);
                $('.nav-search-place-wrap').classList.toggle('disabled', false);
                $('.nav-search-date-wrap').classList.toggle('disabled', true);
                $('.nav-search-guest-wrap').classList.toggle('disabled', true);
                $('.nav-search-date-2-wrap').classList.toggle('disabled', true);
            }
            const navText = e.target.closest('.nav-search-text');
            navBarText.forEach((bar, index) => {
                if (bar === navText) {
                    navBarText.forEach(bar => {
                        bar.classList.toggle('active', false);
                    });
                    bar.classList.toggle('active', true);
                    switch (index) {
                        case 0:
                            $('.nav-search-btn').classList.toggle('active', true);
                            $('.nav-search-date-wrap').classList.toggle('disabled', true);
                            $('.nav-search-guest-wrap').classList.toggle('disabled', true);
                            $('.nav-search-place-wrap').classList.toggle('disabled');
                            $('.nav-search-date-2-wrap').classList.toggle('disabled', true);
                            break;
                        case 1:
                        case 2:
                        case 3:
                            $('.nav-search-btn').classList.toggle('active', true);
                            $('.nav-search-date-wrap').classList.toggle('disabled');
                            $('.nav-search-guest-wrap').classList.toggle('disabled', true);
                            $('.nav-search-place-wrap').classList.toggle('disabled', true);
                            $('.nav-search-date-2-wrap').classList.toggle('disabled', true);
                            break;
                        case 4:
                            if (!e.target.closest('.nav-search-btn')) {
                                if (e.target.closest('.nav-search-text [data-index="0"]'))
                                    $('.nav-search-guest-wrap').classList.toggle('disabled');
                                else if (e.target.closest('.nav-search-text [data-index="1"]')) 
                                    $('.nav-search-date-2-wrap').classList.toggle('disabled');
                                $('.nav-search-btn').classList.toggle('active', true);
                                $('.nav-search-place-wrap').classList.toggle('disabled', true);
                                $('.nav-search-date-wrap').classList.toggle('disabled', true);
                            }
                            break;
                        default:
                            break;
                    }
                }
            })
        } else if (e.target.closest('.overlay')) {
            if (!e.target.closest('.navbar')) {
                $('.overlay').classList.toggle('hide', true);
                $('.navbar').classList.toggle('activeSearch', false);
                $('.navbar-exp').classList.toggle('disabled', true);
                $('.nav-search-wrap').classList.toggle('disabled', true);
            }
        }
        else {
            navBarText.forEach(bar => bar.style.background = '#fff');
            navBarText.forEach(bar => bar.classList.toggle('active', false));
            $('.navbar-user').classList.toggle('active', false);
            $('.nav-search-btn').classList.toggle('active', false);
            $('.nav-search-place-wrap').classList.toggle('disabled', true);
            $('.nav-search-date-wrap').classList.toggle('disabled', true);
            $('.nav-search-guest-wrap').classList.toggle('disabled', true);
            $('.nav-search-date-2-wrap').classList.toggle('disabled', true);
        }

    }
    
}

function checkScrollNavBar() {
    if (window.innerWidth < 741) {
        if (window.scrollY > 58){
            $('.navbar').style.top = '0';
            $('.navbar').classList.toggle('active', true);
        } else {
            $('.navbar').style.top = 58 - window.scrollY + 'px';
            $('.navbar').classList.toggle('active', false);
            // Navbar Search Mobile
            $('.nav-search-header-wrap').classList.toggle('disabled', false);
            $('.nav-search-header-mobile-wrap').classList.toggle('disabled', true);
        }
    } else {
        if (window.scrollY > 58){
            $('.navbar').style.top = '0';
            $('.navbar').classList.toggle('active', true);
            $('.navbar-logo img').src = "./assets/img/logo.png";
            $('.nav-search-header-wrap').classList.toggle('disabled', false)
            $('.nav-search-wrap').classList.toggle('disabled', true);
            $('.navbar-exp').classList.toggle('disabled', true);
        } else {
            $('.navbar').style.top = 58 - window.scrollY + 'px';
            $('.navbar').classList.toggle('active', false);
            $('.navbar-logo img').src = "./assets/img/logo-white.png";
            $('.nav-search-header-wrap').classList.toggle('disabled', true)
            $('.nav-search-wrap').classList.toggle('disabled', false);
            $('.navbar-exp').classList.toggle('disabled', false);
        }
    }
}

document.onscroll = function() {
    checkScrollNavBar();
};

$('.nav-search-header-wrap').onclick = function() {
    if (window.innerWidth < 741) {
        if (window.scrollY < 58){
            window.scrollTo(0, 59);
        }
        $('.nav-search-header-wrap').classList.toggle('disabled', true);
        $('.navbar').classList.toggle('activeMobile', true);
        $('.nav-search-header-mobile-wrap').classList.toggle('disabled', false);
    } else {
        $('.navbar').classList.toggle('activeSearch', true);
        $('.overlay').classList.toggle('hide', false);
        $('.nav-search-wrap').classList.toggle('disabled', false);
        $('.navbar-exp').classList.toggle('disabled', false);
        document.onscroll = function () {
            $('.navbar').classList.toggle('activeSearch', false);
            $('.navbar-exp').classList.toggle('disabled', true);
            $('.nav-search-wrap').classList.toggle('disabled', true);
            $('.overlay').classList.toggle('hide', true);
            checkScrollNavBar();
        }
    }
}

if (window.innerWidth < 741) {
    $('.nav-search-wrap').classList.toggle('disabled', true);
    $('.nav-search-header-wrap').classList.toggle('disabled', false);
}