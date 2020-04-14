module.exports = dispatcher => new Promise( async resolve => {

    ( await browser.$( 'body' ) ).click();
    await dispatcher.sleep( 1000 );

    resolve( true );

} );
