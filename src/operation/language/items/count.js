module.exports = () => new Promise( async resolve => resolve( await browser.execute( () =>
    document.querySelectorAll( '.toolbar-script-menu-content .toolbar-filter-item' ).length ) ) );
