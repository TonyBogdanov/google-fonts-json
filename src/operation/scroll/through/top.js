module.exports = dispatcher => new Promise( async resolve => {

    while ( 0 < await dispatcher.dispatch( 'scroll/distance-to-top' ) ) {

        await dispatcher.dispatch( 'scroll/up' );

    }

    resolve( true );

} );
