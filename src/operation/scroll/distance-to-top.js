module.exports = () => new Promise( async resolve => resolve( await browser.execute( () => window.scrollY ) ) );
