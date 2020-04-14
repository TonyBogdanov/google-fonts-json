module.exports = () => new Promise( async resolve =>
    resolve( await browser.execute( () => document.body.scrollHeight - window.innerHeight - window.scrollY ) ) );
