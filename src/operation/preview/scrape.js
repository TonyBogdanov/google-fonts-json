module.exports = () => new Promise( async resolve => resolve( await browser.execute( () => {

    const result = {};
    const trim = value => value.replace( /^\s+/, '' ).replace( /\s+$/, '' );

    for ( const preview of document.querySelectorAll( '.font-preview-fonts-module' ) ) {

        const title = trim( preview.querySelector( '.fonts-module-title' ).textContent );
        if ( 8 >= title ) {

            continue;

        }

        const text = trim( preview.querySelector( '.font-preview-text' ).textContent );
        if ( 8 >= text ) {

            continue;

        }

        result[ title ] = text;

    }

    return result;

} ) ) );
