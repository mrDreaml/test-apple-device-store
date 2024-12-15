import PRODUCTS_DATA from './products.json' with { type: "json" }

const productTemplate = document.getElementById('product')

const search = new URLSearchParams(location.search)
const productId = search.get('productId')

const goHome = () => window.history.go(-1)

if (!productId) {
    goHome()
}

const data = PRODUCTS_DATA.find(item => item.id.toString() === productId)

if (!data) {
    alert('Sorry, no product found...')
    goHome()
}

const renderProduct = (data) => {
    const productEl = productTemplate.content.cloneNode(true)
    const imageSlider = productEl.querySelector('.product__image-slider')
 
    data.images.forEach(imageName => {
        const imgEl = document.createElement('img')
        imgEl.src = '../assets/' + imageName
        imgEl.alt = data.title
        imageSlider.appendChild(imgEl)
    })

    data.tags.forEach(tag => {
        productEl.querySelector('.product__content__tags').innerHTML += tag
    })

    productEl.querySelector('.product__content__title').textContent = data.title
    productEl.querySelector('.product__content__price').textContent = `Price: ${data.price}$`

    document.querySelector('.product__section').appendChild(productEl)
}

renderProduct(data)

const handleSubmit = (e) => {
    e.preventDefault()
    // handle submit on BE with e.target data
    alert('Order created successfully')
    goHome()
}

document.getElementById('profile-form').onsubmit = handleSubmit
document.getElementById('profile-form').onreset = goHome