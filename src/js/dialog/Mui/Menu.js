import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { List, ListItem, makeSelectable, onTouchTap } from 'material-ui/List';


import { Link } from 'react-router-dom'
import { grey50 } from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up';
import EditorPieChart from 'material-ui/svg-icons/editor/pie-chart';
import MultilineChart from 'material-ui/svg-icons/editor/multiline-chart';


let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {

        constructor(props) {
            super(props);
            this.handleRequestChange = this.handleRequestChange.bind(this);

        };

        static get propTypes() {
            return {
                children: PropTypes.node.isRequired,
            }
        };

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange(event, index) {
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            let children = React.Children.toArray(this.props.children);
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);








export default class SelectableMenuList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleNestedListToggle = this.handleNestedListToggle.bind(this);
    };

    handleNestedListToggle(item) {
        this.setState({
            open: item.state.open,
        });
    };


    handleToggle(e) {
        this.setState({
            open: !this.state.open,
        });
    };


    get_ListItem(node, index, mapStructure, master_idx) {

        if (node.path) {
            return (<ListItem
                containerElement={<Link to={node.path} />}

                primaryTogglesNestedList={false}
                onNestedListToggle={this.handleNestedListToggle}
                onTouchTap={this.handleToggle}
                initiallyOpen={this.state.open}
                nestedItems={mapStructure(node.menu, index)}
                value={node.id}
                key={master_idx ? master_idx + "." + index : index}
                primaryText={node.primaryText}
                leftIcon={node.icon()}
                style={{}} >
            </ListItem>)
        } else {
            return (<ListItem
                primaryTogglesNestedList={false}
                onNestedListToggle={this.handleNestedListToggle}
                onTouchTap={this.handleToggle}
                initiallyOpen={this.state.open}
                nestedItems={mapStructure(node.menu, index)}
                value={node.id}
                key={master_idx ? master_idx + "." + index : index}
                primaryText={node.primaryText}
                leftIcon={node.icon()}
                style={{}} >
            </ListItem>)
        }

    };




    render() {

        const { items } = this.props;
        const mapStructure = (nodes, master_idx) => {

            if (nodes) {
                return nodes.map((node, index) => (
                    this.get_ListItem(node, index, mapStructure, master_idx)
                ));
            }
        }


        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <SelectableList
                    defaultValue={0}>

                    {mapStructure(items)}

                </SelectableList>
            </MuiThemeProvider>
        )
    }
};


