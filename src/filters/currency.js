export default (value) => {
    switch (value) {
        case 'usd':
            return '$'
        case 'cdf':
            return 'FC'
        case 'euro':
            return '€'
        case 'fcfa':
            return 'FCFA'
    }
}
