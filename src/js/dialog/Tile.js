import React from 'react';
import ReactDOM from 'react-dom';

import Form, {
  MenuItem,
  TextField,
  TimePicker,
  DatePicker,
  SelectField,
  Checkbox,
  Toggle,
  Slider,
  RadioButtonGroup,
  RadioButton,
  Switch
} from 'material-ui';

import AutoComplete from '../dialog/Mui/AutoCompleteControlled';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { refreshRates, names, tileType } from '../data/data';

export default class TileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      enabled: false,
      tileType: "",
      dynamicFilter: false,
      refreshRate: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.data;
  }

  componentWillUnmount() {
    // clean up the mess
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleUpdateInput = (name, value) => {

    this.setState({
      [name]: value,
    });

    console.log(this.state);
  }

  handleChange(event, index) {
    const target = event.target;
    let value = event.target.value;
    const name = target.name;

    //event.target.checked
    event.target.type === "checkbox" ? value = event.target.checked : value = value;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleChangeMultiple = (event, index, values) => this.setState({ values });

  handleSubmit(event) {
    debugger;
    event.preventDefault();
    // pass the input field value to the event handler passed
    // as a prop by the parent (App)
    this.props.handlerFromParent(event, this.state);
  }

  render() {

    const { props } = this;
    const { values } = this.state;

    return (

      <form
        onSubmit={this.handleSubmit}>
        <input type="submit" value="Submit" />

        <br />        
        <TextField
          name="name"
          defaultValue={this.state.name}
          hintText="Name"
          floatingLabelText="Name"
          fullWidth={true}
          onChange={this.handleChange}
        />

        <br />
        <TextField
          name="description"
          defaultValue={this.state.description}
          hintText="Description"
          floatingLabelText="Description"
          fullWidth={true}
          onChange={this.handleChange}
        />

        <br />
        <label htmlFor="switch-1" className="mdl-switch__label">{this.state.enabled ? 'Enabled' : 'Disabled'}</label>
        <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-1">
          <input onChange={this.handleChange} name={"enabled"} type="checkbox" id="switch-1" className="mdl-switch__input" />
        </label>

        <br />
        <AutoComplete
          name="tileType"
          floatingLabelText="Tile type"
          dataSource={tileType}
          dataSourceConfig={{ text: 'label', value: 'value' }}
          handleUpdateInput={this.handleUpdateInput}
        />

        <br />
        <label
          htmlFor="switch-2"
          className="mdl-switch__label">Dynamic filter</label>
        <label
          className="mdl-switch mdl-js-switch mdl-js-ripple-effect"
          htmlFor="switch-2">
          <input
            onChange={this.handleChange}
            name={"dynamicFilter"}
            type="checkbox"
            id="switch-2"
            className="mdl-switch__input" />
        </label>

        <br />
        <AutoComplete
          name="refreshRate"
          floatingLabelText="Refresh rate"
          dataSource={refreshRates}
          dataSourceConfig={{ text: 'label', value: 'value' }}
          handleUpdateInput={this.handleUpdateInput}
        />






      </form >
    );
  }
}



