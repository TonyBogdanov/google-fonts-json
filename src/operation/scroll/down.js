module.exports = () => new Promise( async resolve => {

    await browser.execute( () => window.scrollTo( 0, window.scrollY + window.innerHeight ) );
    resolve( true );

} );
