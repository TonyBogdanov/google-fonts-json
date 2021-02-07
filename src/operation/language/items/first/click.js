module.exports = dispatcher => new Promise( async resolve => {

    ( await browser.$( '.script-filter-menu .mat-menu-item' ) ).click();
    await dispatcher.sleep( 310 );

    resolve( true );

} );
