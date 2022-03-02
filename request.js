const axios = require('axios');

const api = 'https://shopee.co.id/api/v4';

async function searchItem(keyword, limit) {
    const params = {
        by: 'relevancy',
        keyword,
        limit,
        newest: 0,
        order: 'desc',
        page_type: 'search',
        scenario: 'PAGE_GLOBAL_SEARCH',
        version: 2
    };

    const { data: { items } } = await axios.get(`${api}/search/search_items`, { params });

    return (await Promise.all(items.map(async item => {
        const detail = await getItemDetail({ shopid: item.shopid, itemid: item.itemid });
        return detail;
    })));
}

async function getItemDetail(params) {
    const { data: { data } } = await axios.get(`${api}/item/get`, { params });
    return {
        title: data.name,
        images: data.images.map(val => 'https://cf.shopee.co.id/file/' + val),
        rating: +(data.item_rating.rating_star.toFixed(1)),
        discount: data.discount,
        price: {
            before_discount: normalizePrice(data.price_max_before_discount),
            min: normalizePrice(data.price_min),
            max: normalizePrice(data.price_max)
        },
        location: data.shop_location,
        stock: data.stock,
        description: data.description
    }
}

function normalizePrice(val) {
    return val / 100000;
}

module.exports = {
    searchItem
};