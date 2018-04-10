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
  RadioButton
} from 'material-ui';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 't'

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(event.target.value);
  }

  menuItems(values) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  handleChangeMultiple = (event, index, values) => this.setState({ values });


  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const { values } = this.state;


    return (
      <form onSubmit={this.handleSubmit}>



  <TextField
          defaultValue={this.state.value}
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          onChange={this.handleChange}
        />


        <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />

        <label>
          Is going:
            <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>

        <br />
        <SelectField
          floatingLabelText="Frequency"
          value={this.state.value}
          onChange={this.handleChange}
          maxHeight={200}
        >
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>

        <br />
        <SelectField
          multiple={true}
          hintText="Select a name"
          value={values}
          onChange={this.handleChangeMultiple}
        >
          {this.menuItems(values)}

        </SelectField>

        <br />
        <Toggle
          label="Simple"
        />

        <br />
        <TimePicker
          hintText="12hr Format"
        />






        <br />
        <div className="mdc-text-field">
          <input className="mdc-text-field__input" type="text" id="input" />
          <label htmlFor="input" className="mdc-text-field__label">Input Label</label>
        </div>


        <br />

        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Button
</button>

        <br />

        <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
          <i className="material-icons">add</i>
        </button>


        <button className="add-to-cart-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
          <i className="material-icons">add-to-cart-button</i>
        </button>



        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input className="mdl-textfield__input" type="text" id="sample3" />
          <label className="mdl-textfield__label" for="sample3">Text...</label>
        </div>






      </form >
    );
  }
}



