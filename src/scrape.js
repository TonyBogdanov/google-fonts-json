const path = require( 'path' );
const fs = require( 'fs' );

const dispatcher = require( './dispatcher' );

describe( 'Scrape', () => it( 'Fonts', async () => {

    await browser.setWindowSize( 1920, 1080 );

    await browser.url( `https://www.googleapis.com/webfonts/v1/webfonts?key=${ process.env.GFONTS_API_KEY }` );
    await dispatcher.sleep( 2000 );

    const result = await browser.execute( () => JSON.parse( document.body.textContent ).items.reduce(

        ( fonts, font ) => {

            fonts[ font.family ] = font;
            fonts[ font.family ].preview = [];

            return fonts;

        },
        {}

    ) );

    await browser.url( 'https://fonts.google.com' );
    await dispatcher.sleep( 2000 );

    await dispatcher.dispatch( 'language/items/first/remove' );

    while ( 0 < await dispatcher.dispatch( 'language/items/count' ) ) {

        await dispatcher.dispatch( 'language/selector/click' );
        await dispatcher.dispatch( 'language/items/first/click' );

        await dispatcher.dispatch( 'body/click' );

        while ( 0 < await dispatcher.dispatch( 'scroll/distance-to-bottom' ) ) {

            const previews = await dispatcher.dispatch( 'preview/scrape' );
            for ( const font in previews ) {

                if ( ! previews.hasOwnProperty( font ) ) {

                    continue;

                }

                if ( ! result.hasOwnProperty( font ) ) {

                    throw `Invalid font: ${ font }.`;

                }

                if ( -1 === result[ font ].preview.indexOf( previews[ font ] ) ) {

                    result[ font ].preview.push( previews[ font ] );

                }

            }

            await dispatcher.dispatch( 'scroll/down' );

        }

        await dispatcher.dispatch( 'language/items/first/remove' );
        await dispatcher.dispatch( 'scroll/through/top' );

    }

    fs.mkdirSync( path.resolve( __dirname, '../data' ) );
    fs.writeFileSync( path.resolve( __dirname, '../data/fonts.json' ), JSON.stringify( result, null, 2 ) );

} ) );
