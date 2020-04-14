module.exports = () => new Promise( async resolve => resolve( await browser.execute( () => {

    const result = {};

    for ( const preview of document.querySelectorAll( '.font-preview-fonts-module' ) ) {

        let title = preview.querySelector( '.fonts-module-title' ).textContent;
        let text = preview.querySelector( '.font-preview-text' ).textContent;

        title = title.replace( /^\s+/, '' ).replace( /\s+$/, '' );
        text = text.replace( /^\s+/, '' ).replace( /\s+$/, '' );

        result[ title ] = text;

    }

    return result;

} ) ) );
