module.exports = () => new Promise( resolve => resolve( browser.execute( () => {

    const item = document.querySelector( '.toolbar-script-menu-content .toolbar-filter-item' );
    if ( ! item ) {

        return false;

    }

    item.parentElement.removeChild( item );
    return true;

} ) ) );
