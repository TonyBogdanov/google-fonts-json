module.exports = () => new Promise( async resolve => resolve( await browser.execute( () => {

    const result = {};
    const trim = value => value.replace( /^\s+/, '' ).replace( /\s+$/, '' );

    for ( const preview of document.querySelectorAll( '.font-preview-fonts-module' ) ) {

        const title = trim( preview.querySelector( '.font-preview-headers h1' ).textContent );
        if ( 3 > title.length ) {

            continue;

        }

        result[ title ] = preview.querySelector( '.font-preview-text' ).textContent;

    }

    return result;

} ) ) );
