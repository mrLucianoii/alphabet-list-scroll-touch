import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { ListItem, Container, Button, List } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import CalendarFilter from '../calendar'
import {getUserTrainerForThoughts} from '../../../actions/thoughts'

import styles from './style'

let content = {
    things:[ 'Name' , 'Newest'],
    thoughts: [ 'Name', 'Newest', 'Last Modified'],
    assets: ['Today', 'Yesterday', 'Past 7 Days', 'Past 30 Days', 'Past 60 Days'],
    people: [ 'Manager', 'Mentor', 'Other'],
    team: [ 'Admin', 'Manager', 'Mentor', 'Other'],
    type: ['Cloud', 'Gateway', 'Whitney', 'Pulse', 'Other']
}

class ThoughtFilter extends Component {
    constructor(props){
        super(props)


        this.state={
            subject: this.props.subject,
            sight: false,
            hearing: false,
            touch: false,
            logic: false,
            options: [false, false, false, false, false],
            arrow: false,
            filterObject: this.props.filterObject || [],
            showCalendar: false,
            trainers: [],
            showTrainers: false,
            dateString: ""
        }
    }
    componentWillMount(){
        const { subject } = this.props
        let { options, filterObject } = this.state
        let targetGroup = content[subject]
        for(let i=0; i < targetGroup.length; i++){
            options[i] = false
        }
        filterObject[subject] = []
        filterObject[subject].push(options)
        
        if (subject === 'things' || subject === 'thoughts'){
            filterObject['type'] = []
            options[0] = true
        }        
        if(subject === 'assets'){
            this.trainerFilter()
        }
        this.setState({
            options,
            filterObject
        })

    }
    clearArray(arr){
        for (let i=0; i < arr.length; i++){
            arr[i] = false
        }
    }
    updateFilter = (filter) => {
        filterObject = filter
        this.setState({filter})
    }
    trainerFilter() {
        let { trainers, trainerObj } = this.state
        const { getUserTrainerForThoughts, thoughts_lrn, coworker_lrn, trainerList } = this.props
        
        if (!this.props.trainerList){
            getUserTrainerForThoughts(thoughts_lrn, coworker_lrn)
           
    
            this.setState({
                trainers,
                showTrainers: true,
            })
        }
    }
    selectFilter(target, subject){

        let { filterObject, dataString } = this.state
        filterObject.nameParent = subject || ''

        if (subject === 'type'){                 

            filterObject['type'][0] = content['type'][target]
            filterObject['type']['id'] = target   
            
            filterObject.nameParent = 'things'
            
            this.setState({
                subject: 'things',
                filterObject
            })
            return
        }
        if(typeof target === 'number'){

            const { options} = this.state
            options[target] = !options[target]
            filterObject[subject][0] = options
       
        if (subject === 'things' || subject === 'thoughts'){
            // if Name selected update arrow
            
            if (target===0 && options[target]){
                options[1] = false
                if (options[0]){
                   filterObject['arrow'] = true
                   this.setState({ arrow : true, filterObject})


                   return

                }else if(target===0) {

                    filterObject[subject][0] = false
                    this.setState({ arrow: false, filterObject, options})
                    return

                }
                
                
            }else{ 
                this.clearArray(options)
                
                options[target] = true
                filterObject['arrow'] = false
                filterObject[subject][target] = true
                this.setState({
                    options,
                    arrow: false,
                    filterObject
                })
                return

            }
        
            options[target] = !options[target]
            filterObject[subject][0] = options

        }else if (subject === 'people' || subject === 'assets' || subject === 'thoughts'){
            if (subject === 'people')
                filterObject.person = content[subject][target]
            else 
             filterObject[subject] = content[subject][target]
            
             for (let i=0; i < options.length; i++){
                options[i] = false
            }
            this.clearArray(filterObject[subject])
            this.clearArray(options)
            options[target] = true
            
        }
        if(subject === 'assets'){
            filterObject.range = {}
            dateString = ''
        }
            this.setState({
                options,
                filterObject,
                dateString
            })
        }else{

            filterObject['senses'] = {
                ...filterObject['senses'],
                [target]: !this.state[target]
                
            }
            this.setState({
                [target]: !this.state[target]
            })
        }
    }
    clearFilter(){
        let { subject, filterObject, options, trainer } = this.state
        const filterLength = filterObject[subject][0].length

        for(let i=0; i<filterLength; i++){
            filterObject[subject][0][i] = false
        }
        filterObject['type'] = []

        if (subject === 'assets '){
            filterObject['trainers'] = []
        }

        if (subject=== 'things'){
            this.clearArray(options)
            options[0] = true
            
        }else {
            this.clearArray(options)
            
        }
        this.setState({
            sight: false,
            hearing: false,
            touch: false,
            logic: false,
            options,
            arrow: false,
            filterObject,
            trainer,
            selectedTrainer: ""
        })
    }
    getCalendarRange(calData){
        let {filterObject, options} = this.state
        filterObject.range = {}
        filterObject.range = calData
        
        this.clearArray(options)
        this.setState({
            dateString: filterObject.range.dateString,
            filterObject,
            options
        })
        
    }
    selectThingType(){
        this.setState({
            subject: 'type'
        })
    }
    toggleCalendar(){
        let { showCalendar } = this.state
        this.setState({ showCalendar: !showCalendar})

    }
    selectTrainer(trainer, index) {
        let { filterObject, trainers } = this.state
        
        filterObject.trainer = []
        filterObject['trainer']=trainer
        
        this.clearArray(trainers)
        trainers[index] = true

        this.setState({
            selectedTrainer: trainer.name,
            trainers,
            filterObject
        })

        this.setState({
            filterObject,
            showTrainers: false
        })
    }
    renderRow(trainer, sectionId, index){
        return (
            <View style={styles.sortRow}>
            <TouchableOpacity style={styles.sortTouchRow} onPress={()=> this.selectTrainer(trainer, index)}>
                <Text style={styles.sortHeaders}>{trainer.name}</Text>
                { trainer[index] && <Icon style={styles.iconCheck} name="ios-checkmark" /> }
            </TouchableOpacity>
            </View>
        )
    }
    render() {
        const {subject, group, filterObject, options, showCalendar, trainers, showTrainers} = this.state
        let filterOrSortLabel = subject === 'type' ? "Filter by" : "Sort by"
   
        
        let trainerList = []
        
        if (this.props.trainerList){         
            trainerList =  <List 
                        refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.props.onRefresh}
                        />
                        }
                        initialListSize={20}
                        pageSize={20}
                        dataArray={this.props.trainerList}
                        renderRow={this.renderRow.bind(this)}
                    />
        }

        return (
            <View style={{...styles.main, zIndex: this.props.zIndexed, backgroundColor: this.props.filterBackgroundColor, top: subject==='assets'? 0 : styles.main.top}}>
                <View style={{backgroundColor: '#FFFFFF', opacity: this.props.filterOpacity}}>
                    { subject ==='thoughts' && // show thought filter options
                        <View style={styles.senseBtnsRow}>
                            <View style={styles.iconColumn}> 
                                
                                <TouchableOpacity onPress={()=> this.selectFilter('sight')} style={styles.circle}>
                                    <LinearGradient colors={this.state.sight? ['#1b4c85', 'rgba(2,107,174,1)'] : ['#ffffff']} style={styles.circle}>
                                        <Icon name="ios-eye" style={this.state.sight? styles.selectEye : styles.actionEye}  />
                                    </LinearGradient>   
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=> this.selectFilter('hearing')} style={styles.circle}>
                                    <LinearGradient colors={this.state.hearing? ['#1b4c85', 'rgba(2,107,174,1)'] : ['#ffffff']} style={styles.circle}>
                                        <MaterialIcon name="hearing" style={this.state.hearing? styles.selectIcon : styles.actionIcon}  />
                                    </LinearGradient>   
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=> this.selectFilter('touch')} style={styles.circle}>
                                    <LinearGradient colors={this.state.touch? ['#1b4c85', 'rgba(2,107,174,1)'] : ['#ffffff']} style={styles.circle}>
                                        <MaterialIcon name="touch-app" style={this.state.touch? styles.selectIcon : styles.actionIcon}  />
                                    </LinearGradient>   
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=> this.selectFilter('logic')} style={styles.circle}>
                                    <LinearGradient colors={this.state.logic? ['#1b4c85', 'rgba(2,107,174,1)'] : ['#ffffff']} style={styles.circle}>
                                        <MaterialIcon name="share" style={this.state.logic? styles.selectIcon : styles.actionIcon}  />
                                    </LinearGradient>   
                                </TouchableOpacity>

                            </View>      
                        </View>
                    }
                 <View>
                { showCalendar &&
                    <View >
                        <CalendarFilter {...this.props} style={styles.calendar}
                            getCalendarRange={this.getCalendarRange.bind(this)}  
                            toggleCalendar={this.toggleCalendar.bind(this)} 
                            updateFilter={this.updateFilter.bind(this)}
                        />
                    </View>
                }
                 

                     { subject === 'things' && !showCalendar && !showTrainers &&
                        <View style={styles.headerType}>
                            <TouchableOpacity onPress={()=>{ this.selectThingType()}}><Text style={styles.headerType}>Type</Text><Text style={styles.typeLabel}>{this.state.filterObject['type'][0] || ''}</Text><Icon name='ios-arrow-forward-outline' style={styles.iconType} /></TouchableOpacity>
                        </View>
                     }
                     { subject === 'assets' && !showCalendar && !showTrainers &&
                        <View style={{paddingLeft: 17}}>
                            <View style={styles.headerRow}>
                                <TouchableOpacity style={{}} onPress={()=>{ this.setState({showCalendar: true})}}><Text style={styles.headerType2}>Date Range</Text>
                                <Text style={styles.typeLabel2}>{this.state.dateString}</Text>
                                <Icon name='ios-arrow-forward-outline' style={styles.iconType2} /></TouchableOpacity>
                            </View>
                            <View style={styles.headerRow2}>
                                <TouchableOpacity onPress={()=>{ this.setState({showTrainers: true})}}><Text style={styles.headerType2}>Trained By</Text>
                                <Text style={styles.trainer}>{this.state.selectedTrainer}</Text>
                                <Icon name='ios-arrow-forward-outline' style={styles.iconType2} />

                                </TouchableOpacity>
                            </View>
                        </View>
                        
                     }
                     
                     { !showCalendar && !showTrainers &&
                        <TouchableOpacity onPress={ () => this.setState({ subject: 'things' }) }><Text style={styles.header}>{filterOrSortLabel}</Text></TouchableOpacity>
                     }
                        

                    { subject === 'thoughts' && !showTrainers &&
                    <View>
                            <TouchableOpacity onPress={()=> this.selectFilter('arrow')}><Icon style={styles.arrow} name={this.state.arrow? 'md-arrow-up' : 'md-arrow-down'} /></TouchableOpacity>
                        </View>
                    } 
                        { !showCalendar && subject !== 'trainers' && !showTrainers &&
                            content[subject].map( (filter, index) => {
                                return  <View key={subject+index} style={styles.sortRow}>
                                <TouchableOpacity style={styles.sortTouchRow} onPress={()=> this.selectFilter(index, subject)}><Text style={styles.sortHeaders}>{content[subject][index]}</Text>
                                    { subject !=='type' && options[index] && <Icon style={styles.iconCheck} name="ios-checkmark" /> }
                                    { subject ==='type' && filterObject['type']['id'] === index && <Icon style={styles.iconCheck} name="ios-checkmark" /> }
                                </TouchableOpacity>    
                                </View>
                            })
                        } 
                        { showTrainers && <View>
                                <Text>Trained By</Text>
                                {trainerList}
                            </View> 
                            }

                

                        { !showCalendar &&
                            <View>
                            <TouchableOpacity onPress={()=> this.clearFilter()}>
                                <Text style={styles.clearFilter}>Clear Filter</Text>
                            </TouchableOpacity>
                        </View>
                        }        
                    </View> 
                </View>
                <TouchableOpacity style={styles.touchClose} onPress={()=> this.props.toggleFilterView(true, filterObject)} ></TouchableOpacity>   

            </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        // thought_lrn and cw_lrn
        getUserTrainerForThoughts: (thought_lrn, cw_lrn) => dispatch(getUserTrainerForThoughts(thought_lrn, cw_lrn))  

    }
}
// Make sure not to make the call multiple times, make the call only once
const mapStateToProps = (state, props) => {
    var newProps = {
        coworker_lrn: state.coworkerSwiper.selected_lrn
    }

    if (state.thoughts.thoughts[newProps.coworker_lrn] && state.thoughts.thoughts[newProps.coworker_lrn].thoughts && state.thoughts.thoughts[newProps.coworker_lrn].thoughts[props.thoughts_lrn]){
        if (state.thoughts.thoughts[newProps.coworker_lrn].thoughts[props.thoughts_lrn].trainers){
            newProps.refreshing = state.thoughts.thoughts[newProps.coworker_lrn].thoughts[props.thoughts_lrn].trainers.refreshing
            newProps.trainerList = state.thoughts.thoughts[newProps.coworker_lrn].thoughts[props.thoughts_lrn].trainers.list
        }else {
            newProps.refreshing = true
        }

    }
    return newProps
}
export default connect(mapStateToProps, bindAction)(ThoughtFilter)
