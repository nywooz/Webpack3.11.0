import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */
const DatePickerExampleSimple = () => (
  <MuiThemeProvider >
    <div>
      <DatePicker
        hintText="Landscape Dialog"
        mode="landscape" />
      <DatePicker hintText="Portrait Inline Dialog" container="inline" />
      <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
    </div>
  </MuiThemeProvider>
);

export default DatePickerExampleSimple;