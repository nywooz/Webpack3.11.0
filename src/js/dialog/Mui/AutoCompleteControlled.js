import React, { Component } from "react";
import AutoComplete from "material-ui/AutoComplete";
/**
 * `AutoComplete` search text can be implemented as a controlled value,
 * where `searchText` is handled by state in the parent component.
 * This value is reset with the `onNewRequest` callback.
 */
export default class AutoCompleteExampleControlled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource,
      dataSourceConfig: props.dataSourceConfig,
      searchText: ""
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
  }

  handleUpdateInput = (searchText, dataSourceArr, ev) => {
    this.props.handleUpdateInput
      ? this.props.handleUpdateInput(this.props.name, searchText)
      : this.setState({ searchText: searchText });
  };

  handleNewRequest = (chosenRequest, index) => {
    const searchText = chosenRequest[this.props.dataSourceConfig.text];

    this.props.handleNewRequest
      ? this.props.handleNewRequest(
          this.props.name,
          searchText,
          chosenRequest.value,
        )
      : this.setState({ searchText: searchText });
  };

  getNewRequestValue = text => {
    const dataSource = this.props.dataSource;
    const dataSourceConfig = this.props.dataSourceConfig;
    const textPropName = dataSourceConfig.text;
    const textPropValue = dataSourceConfig.value;
    const textOptVal = dataSourceConfig.optVal;

    const dataSourceValue =
      dataSourceConfig &&
      dataSource.find(data => data[dataSourceConfig.optVal] == text);

    const searchText = dataSourceValue
      ? dataSourceValue[dataSourceConfig.optVal]
      : text;

    return searchText;

    // //  find match from data source
    // if (this.props.handleNewRequest) {
    //   const dataSource = this.props.dataSource;
    //   const dataSourceConfig = this.props.dataSourceConfig;
    //   const textPropName = dataSourceConfig.text;
    //   const textPropValue = dataSourceConfig.value;
    //   const textOptVal = dataSourceConfig.optVal;

    //   const indx = dataSource.findIndex(function(item) {
    //     return item[textPropName] === text;
    //   });

    //   return indx !== -1 ? dataSource[indx][textPropName] : "";
    // } else {
    //   // adhoc, no need to find match
    //   return text;
    // }
  };

  handleOnClose = event => {
    // this.state.searchText;
  };




  

  render() {
    const { props } = this;
    const requestValue =
      this.getNewRequestValue(props.value) ||
      props.value ||
      this.getNewRequestValue(props.value) ||
      props.value;

    return (
      <div>
        <AutoComplete
          fullWidth={props.fullWidth ? true : false}
          maxSearchResults={7}
          floatingLabelText={props.floatingLabelText}
          hintText="Type to search..."
          openOnFocus={true}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.dataSource}
          dataSourceConfig={this.state.dataSourceConfig}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          onClose={this.handleOnClose}
          searchText={props.value}
        />
      </div>
    );
  }
}










