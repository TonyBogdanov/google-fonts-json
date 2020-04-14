module.exports = dispatcher => new Promise( async resolve => {

    ( await browser.$( '.md-click-catcher' ) ).click();
    await dispatcher.sleep( 1000 );

    resolve( true );

} );
