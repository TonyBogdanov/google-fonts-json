const path = require( 'path' );

module.exports = {

    sleep( delay ) {

        return new Promise( resolve => setTimeout( resolve, delay ) );

    },

    dispatch( name ) {

        return new Promise( async resolve => {

            console.log( 'DISPATCH', name );

            const operation = require( path.resolve( __dirname, `operation/${ name }.js` ) );
            const result = await operation( this );

            console.log( 'RESULT  ', name, result );
            resolve( result );

        } );

    },

};
