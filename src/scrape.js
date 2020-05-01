const path = require( 'path' );
const fs = require( 'fs' );
const fetch = require( 'node-fetch' );

const dispatcher = require( './dispatcher' );

describe( 'Scrape', () => it( 'Fonts', async () => {

    // Fetch current collection.
    const result = await ( await fetch( 'https://tonybogdanov.github.io/google-fonts-json/fonts.json' ) ).json();

    // Fetch fresh fonts.
    await browser.setWindowSize( 1920, 1080 );
    await browser.url( `https://www.googleapis.com/webfonts/v1/webfonts?key=${ process.env.GFONTS_API_KEY }` );
    await dispatcher.sleep( 2000 );

    const fresh = await browser.execute( () => JSON.parse( document.body.textContent ).items.reduce(

        ( fonts, font ) => {

            fonts[ font.family ] = font;
            fonts[ font.family ].preview = [];

            return fonts;

        },
        {}

    ) );

    // Remove obsolete fonts.
    for ( const family in result ) {

        if ( ! result.hasOwnProperty( family ) || fresh.hasOwnProperty( family ) ) {

            continue;

        }

        delete result[ family ];

    }

    // Add new fonts.
    for ( const family in fresh ) {

        if ( ! fresh.hasOwnProperty( family ) || result.hasOwnProperty( family ) ) {

            continue;

        }

        result[ family ] = fresh[ family ];

    }

    // Update previews.
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

                if (

                    ! previews.hasOwnProperty( font ) ||
                    0 === previews[ font ].replace( /^[\s\\.]+/, '' ).replace( /^[\s\\.]$/, '' ).length

                ) {

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

    // Save results.
    const dataPath = path.resolve( __dirname, '../data' );
    const fontsPath = path.resolve( dataPath, 'fonts.json' );

    if ( fs.existsSync( fontsPath ) ) {

        fs.unlinkSync( fontsPath );

    }

    if ( fs.existsSync( dataPath ) ) {

        fs.rmdirSync( dataPath );

    }

    fs.mkdirSync( dataPath );
    fs.writeFileSync( fontsPath, JSON.stringify( result, null, 2 ) );

} ) );
