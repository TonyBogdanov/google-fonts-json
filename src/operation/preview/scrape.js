module.exports = () => new Promise( async resolve => resolve( await browser.execute( () => {

    const result = {};
    const trim = value => value.replace( /^\s+/, '' ).replace( /\s+$/, '' );

    for ( const preview of document.querySelectorAll( '.font-preview-fonts-module' ) ) {

        const title = trim( preview.querySelector( '.fonts-module-title' ).textContent );
        if ( 8 >= title.length ) {

            continue;

        }

        result[ title ] = preview.querySelector( '.font-preview-text' ).textContent;

    }

    return result;

} ) ) );
