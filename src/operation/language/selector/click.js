module.exports = dispatcher => new Promise( async resolve => {

    ( await browser.$( 'gf-toolbar-script-filter' ) ).click();
    await dispatcher.sleep( 410 );

    resolve( true );

} );
