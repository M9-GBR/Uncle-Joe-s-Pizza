let svgFull = '<svg class="full-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>',
    svgEmpt = '<svg class="empt-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>'

async function addRatings() {
    const userData = await ((await fetch('./ratings.json')).json()),
        div = document.querySelector('#ratings-inner')
    let count = 0

    for (const data of userData) {
        div.innerHTML +=
            `<div class="rating card">\
                        <div class="card-header">\
                            <div class="user">\
                                <img src="./svgs/user.svg" class="user-img">\
                                <p class="user-name">${data.name}</p>\
                            </div>\
                        </div>\
                        <div class="card-body">\
                            <div class="m-1">${data.review}</div>\
                        </div>\
                        <div class="card-footer">\
                            <div class="star" id="r-${count}"></div>\
                        </div>\
                    </div>`

        addStar(document.querySelector(`#r-${count}`), data.rating)
        count++
    }
}

function addStar(elem, amt) {
    for (let i = 0; i < 5; i++) {
        if (amt > 0) {
            elem.innerHTML += svgFull
        } else {
            elem.innerHTML += svgEmpt
        }

        amt--
    }
}

addRatings()

let navbar = document.querySelector('nav'),
    currentY = 0,
    lastY = currentY

document.addEventListener('scroll', ev => {
    currentY = window.scrollY

    if (Math.abs(currentY - lastY) != currentY - lastY) {
        navbar.classList.remove('navbar-hide')
        navbar.classList.add('navbar-show')
    } else if (Math.abs(currentY - lastY) == currentY - lastY) {
        navbar.classList.remove('navbar-show')
        navbar.classList.add('navbar-hide')
    }

    lastY = currentY
})