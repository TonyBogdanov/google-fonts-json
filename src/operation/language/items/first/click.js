module.exports = dispatcher => new Promise( async resolve => {

    ( await browser.$( '.toolbar-script-menu-content button' ) ).click();
    await dispatcher.sleep( 1000 );

    resolve( true );

} );
