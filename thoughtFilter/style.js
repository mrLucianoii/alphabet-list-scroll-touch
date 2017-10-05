
const React = require('react-native');
const { StyleSheet, Dimensions } = React;
import deviceResolution from '../../../deviceResolution'

export default {
   main:{
    position: 'absolute',
    top: 0.07 * deviceResolution.heightNoHeader - 2.5 + 5, // search input height
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: deviceResolution.width,
    height: deviceResolution.height,
    marginTop: 0,

    },
   senseBtnsRow: {
    flexDirection: 'column', 
    alignItems:'center',
    paddingTop: 9,
    paddingBottom: 5
   },
   sortRow: {
    flexDirection:'row',
    borderBottomWidth: 1,
    borderBottomColor: '#c9c9c9',
    marginLeft: 30,
   },
   sortTouchRow: {
       width: deviceResolution.width*.9
   },
   header: {
    color: '#0060A5',
    fontWeight: '600',
    fontSize: 17 * deviceResolution.fontSizeMultiplier,
    width: deviceResolution.width,    
    paddingLeft: 15,
    paddingTop: 7
   },
   sortHeaders:{
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5

   },
    iconCheck:{
       position: 'absolute',
       top: 3,
       right:18,
       color: '#0060A5',
       fontSize: 26 * deviceResolution.fontSizeMultiplier       
    },
    lastRow: {
        flexDirection:'row',
        
    },
    clearFilter: {
        textAlign: 'right',
        color: '#0060A5',
        fontWeight: '600',
        padding: 15,
    },
    gradientCircle: {
        width: 100,
        height: 100,
        boarderRadius: 100  /2
    },
    iconColumn: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        height: deviceResolution.height/20
    },
    arrow:{
        position: 'absolute',
        fontSize: 20 * deviceResolution.fontSizeMultiplier,
        left: .03 * deviceResolution.width,
        top: .015 * deviceResolution.height
    },
    senseBtnsRow: {
        flexDirection: 'column', 
        alignItems:'center',
        paddingTop: 13,
        paddingBottom: 13
    },
    // icons:{
    //     fontSize: 30 * deviceResolution.fontSizeMultiplier,
    //     marginLeft: 25,
    //     marginRight: 25,
    //     boarderRadius: 50
    //     // textAlign: 'center'
    // }
    icon: {
        color: '#c9c9c9',
        fontSize: 45 * deviceResolution.fontSizeMultiplier,
        paddingLeft: 0.1 * deviceResolution.width,
        paddingRight: 0.14 * deviceResolution.width,
        paddingBottom: 0.1 * deviceResolution.width
    },
    icons:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        paddingLeft: 0.1 * deviceResolution.width,
        paddingRight: 0.1 * deviceResolution.width,
        paddingBottom: 0.1 * deviceResolution.width
    },
    headerType: {
        fontWeight: '600',
        fontSize: 15 * deviceResolution.fontSizeMultiplier,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 7
    },
    headerType2: {
        fontWeight: '600',
        fontSize: 15 * deviceResolution.fontSizeMultiplier,
        paddingTop: 7,
        paddingBottom: 2
    },
    iconType: {
        color: '#c9c9c9',
        position: 'absolute',
        top: 5,
        paddingTop: 5,
        right:18,
        fontSize: 26 * deviceResolution.fontSizeMultiplier  
    },
    iconType2: {
        color: '#c9c9c9',
        position: 'absolute',
        right:18,
        fontSize: 26 * deviceResolution.fontSizeMultiplier  
    },
    typeLabel: {
        position: 'absolute',
        top: 15,
        right: 43,
        color: '#c9c9c9',
        fontSize: 15 * deviceResolution.fontSizeMultiplier  
        
    },
    typeLabel2: {
        position: 'absolute',
        top: 7,
        right: 43,
        color: '#c9c9c9',
        fontSize: 15 * deviceResolution.fontSizeMultiplier  
        
    },
    headerRow: {
        fontWeight: '600',
        fontSize: 15 * deviceResolution.fontSizeMultiplier,
        top: 5,
        paddingTop: 15,
        paddingBottom: 13,
        borderBottomWidth: .5
        
    },
    headerRow2: {
        fontWeight: '600',
        fontSize: 15 * deviceResolution.fontSizeMultiplier,
        paddingTop:13,
        paddingBottom: 7
        
    },
    iconType2: {
        color: '#c9c9c9',
        position: 'absolute',
        top: 0,
        paddingBottom: 3,
        right:18,
        fontSize: 26 * deviceResolution.fontSizeMultiplier  
    },
    trainer: {
        position: 'absolute',
        top: 5,
        right: 43,
        color: '#c9c9c9',
        fontSize: 15 * deviceResolution.fontSizeMultiplier  
        
    },
    circle: {
        width: 47,
        height: 47,
        borderRadius: 47/2,
        alignItems:"center",
        justifyContent:"center",
        marginLeft: 0.04 * deviceResolution.width,
        marginRight: 0.04 * deviceResolution.width,
        marginBottom: 0.02 * deviceResolution.width
    },
    actionIcon:{
        color: "#c9c9c9",
        backgroundColor:'transparent',
        paddingTop: 0,
        fontSize: 33 * deviceResolution.fontSizeMultiplier,

    },
    selectIcon:{
        color: "white",
        backgroundColor:'transparent',
        paddingTop: 4,
        fontSize: 33 * deviceResolution.fontSizeMultiplier,
    },
    actionEye: {
        color: "#c9c9c9",
        backgroundColor:'transparent',
        fontSize: 44 * deviceResolution.fontSizeMultiplier,
        paddingTop: 3
    },
    selectEye: {
        color: "white",
        paddingTop: 3,      
        backgroundColor:'transparent',
        fontSize: 44 * deviceResolution.fontSizeMultiplier,
        
    },
    touchClose: {
        height: deviceResolution.height,
        width: deviceResolution.width,
        backgroundColor: 'transparent'
    },
    iconFilter:{
        position: 'absolute',
        top: 0,
        right: 0,
        color: '#9FABAE',
        fontSize: 25,
        paddingRight: 19,
    },
    calendar: {
        height: deviceResolution.height,
        backgroundColor: 'transparent'
    }
}
