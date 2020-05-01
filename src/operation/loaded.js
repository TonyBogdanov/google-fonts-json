module.exports = dispatcher => new Promise( async resolve => {

    await browser.execute( async () => {

        while ( 'complete' !== document.readyState && 'loaded' !== document.readyState ) {

            await new Promise( done => setTimeout( done, 50 ) );

        }

    } );

    resolve( true );

} );
