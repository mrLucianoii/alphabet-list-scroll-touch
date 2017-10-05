
import React, { Component } from 'react';
import { PanResponder, ListView, ScrollView, RefreshControl} from "react-native"
import { Container, Header, Text, View, Item, List} from 'native-base'
import deviceResolution from '../../../deviceResolution'
import styles from './style'

class AbcList extends Component {
  componentWillMount(){

      this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onPanResponderGrant:(evt, gestureState) => {
              this.calculateScroll(evt.nativeEvent.locationY)

          },
          onPanResponderMove: (evt, gestureState) => {
              this.calculateScroll(evt.nativeEvent.locationY)

          },
          onPanResponderTerminationRequest:(evt, gestureState) => {
              return false
          },
          onPanResponderRelease: (evt, gestureState) => {

          }
      })

  }
  calculateScroll(y)  {
      let posY = Math.floor(y/(styles.alphaList.height)*deviceResolution.fontSizeMultiplier)
      this.props.scrollAction(posY)

  }
  render(){
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
      return (
          <View style={styles.abcParent }>
            <View ref={component => this._parentView = component} {...this._panResponder.panHandlers} style={styles.abcInnerParent} >
                {alphabet.map((letter, index) => {
                    return <View style={styles.letterBox} ref={component => this._childView = component} key={index+letter} pointerEvents="none">
                        <Text style={styles.abcChildText}>{letter}</Text></View>}
                )}

            </View>
          </View>
      )
  }
}

class ListAlphaFilter extends Component {

constructor(props) {
    super(props);
    this._letterHeader = {}
    this._currentIndex  = 0
    this._formattedList = {}
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz#'.toUpperCase().split('');
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
    })
    this.state = {
      ...this.props,
        formattedList : this.createList(this.props),
        dataArray: this.props.dataArray || [],
        targetKey: this.props.targetKey || []
    }
  }

componentWillReceiveProps(nextProps){
 const list =  this.createList(nextProps)
    this.setState({
        formattedList: list,
        dataArray: nextProps.dataArray,
        targetKey: nextProps.targetKey
    })
}

createList = (props) => {
  let formattedList = []
  let { dataArray, targetKey } = props
  for (let i=0; i < this.alphabet.length; i++){
    formattedList[this.alphabet[i].toString()] = []
  }
    (dataArray || []).map(item => {
    var targetIndex = item[targetKey] ? item[targetKey][0].toUpperCase() : "#"
    if(!formattedList[targetIndex]){
      targetIndex = "#"
    }
    formattedList[targetIndex].push(item)

  })
    return formattedList
}

nextLetter(yPostion){     
  if (yPostion < 0) 
    return this._letterHeader[this.alphabet[0]]

  for (i=yPostion; i < this.alphabet.length-1; i++){
    let letterTarget = this.alphabet[i]
    if (this.state.formattedList[letterTarget].length > 0){ // is letter valid
      this._letterTarget = letterTarget
      return this._letterHeader[letterTarget] 

    }else if( this.state.formattedList[this.alphabet[i-1]] && this.state.formattedList[this.alphabet[i-1]].length > 0 ){ // is the previous letter valid
      this._letterTarget = this.alphabet[i-1]
      return this._letterHeader[this.alphabet[i-1]]

    }else if(this.state.formattedList[this.alphabet[i+1]] && this.state.formattedList[this.alphabet[i+1]].length > 0 ){ // is the next letter valid
      this._letterTarget = this.alphabet[i+1]
      return this._letterHeader[this.alphabet[i+1]]

    }
   }
}

scrollAnimation(yPostion){
  let targetY = this.nextLetter(yPostion)
  
  if(targetY && this._currentIndex !== this._letterTarget){    
    this.refs.scrollView.scrollTo({ x: 0, y: targetY.y, animated: true})
    this._currentIndex = this._letterTarget
   
  }else {
    return

  }  
  
}

renderSectionHeader(sectionData, sectionID){
  const { showHeaders } = this.props
  const renderBool = showHeaders
  if (!renderBool){
    sectionData[0] = false
  }
  return(
    <View style={styles.abcHeaderRow} onLayout={(event) => {
        this._letterHeader[sectionID] = event.nativeEvent.layout
      }}>
        {sectionData[0] && <Text style={styles.abcHeader}>{sectionID}</Text>}

    </View>
  )
}

render() {
  return (
      <View style={{ ...styles.main, height: this.props.listHeight }} >
          <ListView 
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.props.onRefresh}
              />
            }
            initialListSize={20}
            pageSize={20}
            ref={'scrollView'}
            enableEmptySections={true}
            style={{ ...styles.listView,  height: this.props.listHeight}}
            dataSource={this.ds.cloneWithRowsAndSections(this.state.formattedList || [])}
            renderRow={this.props.renderRow}
            renderSectionHeader={ this.renderSectionHeader.bind(this) }
          />
          <AbcList scrollAction={this.scrollAnimation.bind(this)}/>
      </View>      
  )
}
}

export default ListAlphaFilter