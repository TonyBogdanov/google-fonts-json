module.exports = () => new Promise( async resolve => resolve( await browser.execute( () =>
    document.querySelectorAll( '.script-filter-menu .menu-item' ).length ) ) );
