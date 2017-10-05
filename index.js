import React, { Component } from 'react';
import { Text, RefreshControl, View, LayoutAnimation  } from 'react-native';
import { Button } from 'native-base'
import ListAlphaFilter from './listAlphaFilter'
// import Search from './searchBar' // Needs to be written

import {Drawer} from 'native-base';
import ThoughtFilter from './thoughtFilter'
import deviceResolution from '../../deviceResolution'

import styles from './style'

/*
    Subject prop determines UI and will return a JSON to parent component
    Filter Class Props
        subject: String 'thought' | 'people' | 'things'
        group: String 'team' | 'coworker
        onRefresh: func
        showHeaders: bool
        targetKey: String
        dataArray: Array
        renderRow: func
        checkbox: bool
        selectAll: func
        allSelected: bool
        search: func
        enableFilterBtn: bool
        // may be added layer
        showAddBtn: bool
        addBtnOnPrss: func
        searchValue: func (takes a function and passes the input value)

*/


class Filter extends Component {

    constructor(props) {
        super(props)
      this.state= {
        filterOpacity: 0,
        filterBackgroundColor: 'rgba(52, 52, 52, 0)',
        filterZindex: -1,
        iconShowFilter: false,
        filterObject: this.props.filterObject || [],
        searchBar : true,
        showFilter: this.props.showFilter || false
        }
    }

    componentWillMount(){
        const { search } = this.state
        let { searchBar } = this.props

        searchBar = typeof search === 'function'? true : false
        this.setState({
            searchBar
        })
    }

    closeFilter(filter){

        console.log("close",filter)
        
         const typeThings = {
           0: ["rhythmos-cloud"],
            1:["fog"],
            2:["whitney"],
            3:["mobile"],
            4: ["restful", "abstract"]
        }
        
        let sendFilter = []
        
        if (filter.nameParent === 'things'){
            sendFilter.categories = typeThings[filter.type.id] || null
            sendFilter.name_sort = filter.arrow? 'desc' : 'asc'
            sendFilter.newest = filter.type[1]? 'true' : null
        }else {
            sendFilter.user_role = filter.person? filter.person.toLowerCase() : null
        }
        

        console.log('right before refresh: ', sendFilter)
        this.props.onRefresh(sendFilter)

        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        
        this.setState({
            filterOpacity: 0,
            filterBackgroundColor: 'rgba(52, 52, 52, 0)',
            filterZindex: -1,
            iconShowFilter: false,
            searchBar : true
        })
        
    }
    toggleFilterView(isVisible, filter){
        console.log(filter)
        isVisible? this.closeFilter(filter) : this.openFilter()

    }
    openFilter(){  
        const { showFilter } = this.props
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        console.log("open")
        this.setState({
            filterOpacity: 1,
            filterBackgroundColor: 'rgba(52, 52, 52, 0.8)',
            filterZindex: 5,
            iconShowFilter: true,
            searchBar: false,
            showFilter: !showFilter
        })
        
    }
   
    render() {
        const { searchBar } = this.state
        const { subject } = this.props
        const { showFilter } = this.props

        console.log("filter props", this.props)

        return (
        <View style={{zIndex: 1}}>
            {/* <Search style={{zIndex:3}} {...this.props} toggleFilterView={this.toggleFilterView.bind(this)} iconShowFilter={this.state.iconShowFilter} />         */}
            <ThoughtFilter 
                zIndexed={this.state.filterZindex} 
                subject={this.props.subject} 
                filterOpacity={this.state.filterOpacity}
                filterBackgroundColor={this.state.filterBackgroundColor}    
                toggleFilterView={this.toggleFilterView.bind(this)}
                thoughts_lrn={this.props.thoughts_lrn}
            />
            <ListAlphaFilter zIndexed={1}  {...this.props} />
        </View>
                    
        )
    }
}

export default Filter