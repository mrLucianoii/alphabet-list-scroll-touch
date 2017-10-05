/* List Alpha Filter */
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

import deviceResolution from '../../../deviceResolution'

export default {
    main:{
        width: deviceResolution.width,
        justifyContent: 'center',
        flexDirection:"row",
        marginTop: 1
    },
    listView:{
        width: 0.9 * deviceResolution.width,
    },
    abcChildText: {
        color: '#007ec1',
        fontSize: 10*deviceResolution.fontSizeMultiplier,
        fontWeight: 'bold'
    },
    mainList:{
    },
    abcParent: {
        width: deviceResolution.width *.05,
        height: deviceResolution.heightNoHeader,
        justifyContent: 'center'
    },
    abcHeader: {
        color: "black",
        fontWeight: "bold",
        paddingLeft: 13
    },
    abcInnerParent : {
        height: 0.72 * deviceResolution.heightNoHeader,
    },
    abcHeaderRow: {
        backgroundColor: "#ECECEC"
    },
    alphaList: {
        borderBottomWidth: 1,
        height: 15,
        paddingTop: 3,
        paddingBottom: 3,   
    },
    alphaView : {
        height: deviceResolution.height-(deviceResolution.heightHeader *2.9)
    },
    letterBox: {
        height: 15*deviceResolution.fontSizeMultiplier,
        paddingLeft: 5
    }
};
