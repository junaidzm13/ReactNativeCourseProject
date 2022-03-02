const currencies = [
    {
        currency: 'USD',
        rate: 1
    },
    {
        currency: 'EUR',
        rate: 1.17
    },
    {
        currency: 'GBP',
        rate: 1.35
    },
    {
        currency: 'CAD',
        rate: 0.77
    }
]


export const getExchangeRates = async (source) => {
    try {
        const rates = await fetchExchangeRates(source);
        console.log(rates);
        return rates
    } catch (err) {
        return null;
    }
}


const fetchExchangeRates = async (source) => {
    // const response = await fetch(`https://v6.exchangerate-api.com/v6/9330b758f05e0e3a86ffcf62/latest/${source}`);
    // const result = await response.json();
    // console.log(result.result);
    const result = {'result': 'success', 'conversion_rates': {'USD': 1, 'CAD': 0.77, 'EUR': 1.1, 'GBP': 1.25}}
    if (result.result === 'success') {
        console.log("HERE")
        const currencies = Object
            .keys(result.conversion_rates)
            .map(
                (key, index) => ({currency: key, rate: result.conversion_rates[key], key: index})
            );
        return currencies;
    }
    const errMessage = result['error-type'];
    console.log(errMessage)
    throw new Error(errMessage);
}