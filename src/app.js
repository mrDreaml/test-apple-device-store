import PRODUCTS_DATA from './products.json' with { type: "json" }

const productTemplate = document.getElementById('product')
const productsEl = document.getElementById('products')
const searchEl = document.getElementById('main-search')

const getProductElement = (data) => {
    const productEl = productTemplate.content.cloneNode(true)
    const imageSlider = productEl.querySelector('.product__image-slider')
 
    data.images.forEach(imageName => {
        const imgEl = document.createElement('img')
        imgEl.src = './assets/' + imageName
        imgEl.alt = data.title
        imageSlider.appendChild(imgEl)
    })

    data.tags.forEach(tag => {
        productEl.querySelector('.product__content__tags').innerHTML += tag
    })

    productEl.querySelector('.product__content__title').textContent = data.title
    productEl.querySelector('.product__content__price').textContent = `Price: ${data.price}$`
    productEl.querySelector('button').dataset.id = data.id

    return { el: productEl, data }
}

const productsElementsData = PRODUCTS_DATA.map(getProductElement)

const renderProducts = (searchValue = '') => {
    searchValue = searchValue.trim()
    productsEl.innerHTML = ''

    productsElementsData.forEach(({ el, data }) => {
        if (!searchValue || data.searchTags.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))) {
            productsEl.appendChild(el.cloneNode(true))
        }
    })
}

const debounde = (callback, delay = 1000) => {
    let startTime = Date.now()
    let timer = null

    return (...props) => {
        clearTimeout(timer)
        const diff = Date.now() - startTime
        if (Date.now() - startTime > delay) {
            callback(...props)
        } else {
            timer = setTimeout(() => {
                callback(...props)
            }, delay - diff)
        }
        
        startTime = Date.now()
    }
}

searchEl.addEventListener('input', debounde(e => {
    renderProducts(e.target.value)
}))

productsEl.addEventListener('click', (e) => {
    const productId = e.target.dataset.id
    window.location.href = `order?productId=${productId}`
})

renderProducts()