import api from '../helpers/wp-api.js';
import { ajax } from '../helpers/ajax.js';
import { About } from './About.js'
import { Card } from './Card.js'
import { CardDetail } from './CardDetail.js'


export async function Rute() {

    const location = window.location.hash,
        $main = document.getElementById('main'),
        $loader = document.createElement('img')
    $loader.setAttribute('src', './app/assets/images/loader.gif')
    $loader.style.margin = 'auto'
    $loader.style.paddingTop = '50px'
    $loader.style.width = '60px'

    $main.appendChild($loader)

    $main.innerHTML = null

    if (!location || location == '#/') {
        await ajax({
            url: api.CARDS,
            cbSuccess: (cards) => {
                let html = ''
                cards.forEach(element => {
                    html += Card(element)
                });
                $loader.style.display = 'none'
                $main.innerHTML = html
            }
        })

        $(".page1__header .section1__main .item__list .item ul li:nth-child(1)").addClass("active")
        $(".page1__header .section2__main .item__list .item ul li:nth-child(1)").addClass("active")


    } else if (location.includes('#/about')) {
        $loader.style.display = 'none'
        $main.appendChild(About())
        $(".page1__header .section1__main .item__list .item ul li:nth-child(2)").addClass("active")
        $(".page1__header .section2__main .item__list .item ul li:nth-child(2)").addClass("active")

    } else {
        (location.includes('#/proyecto'))
        await ajax({
            url: `${api.DETAIL}${location.slice(2)}.json`,
            cbSuccess: (detail) => {
                $loader.style.display = 'none'
                $main.innerHTML = CardDetail(detail)
            }
        })

    }
}