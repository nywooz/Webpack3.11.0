import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

function InputNumber(props) {
  var { name, label, value, min, max, editConfigCallback, addon } = props;
  value = value ? value : 0;

  var getValidationState = value => {
    if (min && value < min) {
      return "error";
    } else {
      return "success";
    }

    if (max && value > max) {
      return "error";
    } else {
      return "success";
    }
  };

  var onChange = event => {
    if (getValidationState(event.target.value) === "success") {
      editConfigCallback(event);
    }
  };

  return (
    <div className="col">
      <TextField
        style={{ width: "80%" }}
        id={name}
        name={name}
        value={value}
        hintText={label}
        floatingLabelText={label}
        type="number"
        onChange={onChange}
      />

      {addon ? <span>{addon}</span> : null}
    </div>
  );
}

function InputNumberGtrThanZero(props) {
  return <InputNumber {...props} min={1} />;
}

function InputNumberGtrOrEqualToZero(props) {
  return <InputNumber {...props} min={0} />;
}

function BreakpointInput(props) {
  var { name } = props;
  return (
    <InputNumberGtrOrEqualToZero
      {...props}
      name={"breakpoints_" + name}
      addon="px"
    />
  );
}

function Breakpoints(props) {
  if (!props.breakpoints) {
    return <div />;
  }
  var { lg, md, sm, xs, xxs } = props.breakpoints;
  return (
    <div>
      <h4>Breakpoints</h4>
      <div className="row">
        <BreakpointInput
          name="lg"
          value={lg}
          label="large"
          editConfigCallback={props.editConfigCallback}
        />
        {/* <BreakpointInput name="md" value={md} label="medium" editConfigCallback={props.editConfigCallback} />
        <BreakpointInput name="sm" value={sm} label="small" editConfigCallback={props.editConfigCallback} />
        <BreakpointInput name="xs" value={xs} label="extra small" editConfigCallback={props.editConfigCallback} />
        <BreakpointInput name="xxs" value={xxs} label="extra extra small" editConfigCallback={props.editConfigCallback} /> */}
      </div>
    </div>
  );
}

function ColInput(props) {
  var { name } = props;
  return (
    <InputNumberGtrThanZero {...props} name={"cols_" + name} addon="cols" />
  );
}

function Cols(props) {
  if (!props.cols) {
    return <div />;
  }
  var { lg, md, sm, xs, xxs } = props.cols;
  return (
    <div>
      <h4>Columns</h4>
      <div className="row">
        <ColInput
          name="lg"
          value={lg}
          label="large"
          editConfigCallback={props.editConfigCallback}
        />
        {/* <ColInput name="md" value={md} label="medium" editConfigCallback={props.editConfigCallback} />
        <ColInput name="sm" value={sm} label="small" editConfigCallback={props.editConfigCallback} />
        <ColInput name="xs" value={xs} label="extra small" editConfigCallback={props.editConfigCallback} />
        <ColInput name="xxs" value={xxs} label="extra extra small" editConfigCallback={props.editConfigCallback} /> */}
      </div>
    </div>
  );
}

function Layouts(props) {
  if (!props.layouts) {
    return <div />;
  }

  var {
    preventCollision,
    rowHeight,
    isDraggable,
    isResizable,
    autoSize,
    verticalCompact,
    allStatic,
    margin
  } = props;

  //Set with defaultValue if no defined
  rowHeight = rowHeight !== undefined ? rowHeight : 150;
  isDraggable = isDraggable !== undefined ? isDraggable : true;
  isResizable = isResizable !== undefined ? isResizable : true;
  autoSize = autoSize !== undefined ? autoSize : true;
  verticalCompact = verticalCompact !== undefined ? verticalCompact : true;
  allStatic = allStatic !== undefined ? allStatic : false;
  allStatic ? (isResizable = isDraggable = !allStatic) : allStatic;
  preventCollision = preventCollision !== undefined ? preventCollision : false;

  var marginX = margin && margin[0] !== undefined ? margin[0] : 10;
  var marginY = margin && margin[1] !== undefined ? margin[1] : 10;

  return (
    <div>
      <h4>Layouts</h4>
      <InputNumberGtrThanZero
        value={rowHeight}
        label="Row Height"
        editConfigCallback={props.editConfigCallback}
        name={"rowHeight"}
        addon="px"
      />
      <MuiThemeProvider>
        <div>
          <div className="row">
            <div className="col">
              <Checkbox
                id="allStatic"
                name="allStatic"
                checked={allStatic}
                onCheck={props.editConfigCallback}
                label="Make all static"
                style={styles.checkbox}
              />
            </div>
            <div className="col">
              <Checkbox
                disabled={allStatic}
                id="isDraggable"
                name="isDraggable"
                checked={isDraggable}
                onCheck={props.editConfigCallback}
                label="Items are draggable"
                style={styles.checkbox}
              />
              <Checkbox
                disabled={allStatic}
                id="isResizable"
                name="isResizable"
                checked={isResizable}
                onCheck={props.editConfigCallback}
                label="Items are resizable"
                style={styles.checkbox}
              />
            </div>
          </div>

          <Checkbox
            id="preventCollision"
            name="preventCollision"
            checked={preventCollision}
            onCheck={props.editConfigCallback}
            label="Prevent Collision"
            style={styles.checkbox}
          />

          

          <Checkbox
            id="autoSize"
            name="autoSize"
            checked={autoSize}
            onCheck={props.editConfigCallback}
            label="The container height swells and contracts to fit contents"
            style={styles.checkbox}
          />

          <Checkbox
            id="verticalCompact"
            name="verticalCompact"
            checked={verticalCompact}
            onCheck={props.editConfigCallback}
            label="The layout will compact vertically"
            style={styles.checkbox}
          />
        </div>
      </MuiThemeProvider>

      <div className="row">
        <InputNumberGtrThanZero
          value={marginX}
          label="Horizontal margin between items"
          editConfigCallback={props.editConfigCallback}
          name={"marginX"}
          addon="px"
        />
        <InputNumberGtrThanZero
          value={marginY}
          label="Vertical margin between items"
          editConfigCallback={props.editConfigCallback}
          name={"marginY"}
          addon="px"
        />
      </div>
    </div>
  );
}

export default function BootstrapEditor(props) {
  var { breakpoints, cols } = props.reactGridLayout;
  return (
    <form className="reactDashboardBuilderBody" style={{ background: "unset" }}>
      <MuiThemeProvider>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Breakpoints
                breakpoints={breakpoints}
                editConfigCallback={props.editConfigCallback}
              />
            </div>
            <div className="col">
              <Cols cols={cols} editConfigCallback={props.editConfigCallback} />{" "}
            </div>
          </div>
          <Layouts
            {...props.reactGridLayout}
            editConfigCallback={props.editConfigCallback}
          />
        </div>
      </MuiThemeProvider>
    </form>
  );
}

// import React from "react";

// function InputNumber(props) {
//   var { name, label, value, min, max, editConfigCallback, addon } = props;
//   value = value ? value : 0;

//   var getValidationState = value => {
//     if (min && value < min) {
//       return "error";
//     } else {
//       return "success";
//     }

//     if (max && value > max) {
//       return "error";
//     } else {
//       return "success";
//     }
//   };

//   var onChange = event => {
//     if (getValidationState(event.target.value) === "success") {
//       editConfigCallback(event);
//     }
//   };

//   return (
//     <div className="form-group input20Percent">
//       <div className=".control-label">{label}</div>

//       <div className="input-group">
//         <input
//           className="form-control"
//           type="number"
//           value={value}
//           placeholder={label}
//           onChange={onChange}
//           name={name}
//           id={name}
//         />

//         {addon ? (
//           <div className="input-group-prepend">
//             <span className="input-group-text">{addon}</span>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// function InputNumberGtrThanZero(props) {
//   return <InputNumber {...props} min={1} />;
// }

// function InputNumberGtrOrEqualToZero(props) {
//   return <InputNumber {...props} min={0} />;
// }

// function BreakpointInput(props) {
//   var { name } = props;
//   return (
//     <InputNumberGtrOrEqualToZero
//       {...props}
//       name={"breakpoints_" + name}
//       id={"breakpoints_" + name}
//       addon="px"
//     />
//   );
// }

// function Breakpoints(props) {
//   if (!props.breakpoints) {
//     return <div />;
//   }
//   var { lg, md, sm, xs, xxs } = props.breakpoints;
//   return (
//     <div>
//       <h4>Breakpoints</h4>
//       <BreakpointInput
//         name="lg"
//         id="lg"
//         value={lg}
//         label="large"
//         editConfigCallback={props.editConfigCallback}
//       />
//       <BreakpointInput
//         name="md"
//         id="md"
//         value={md}
//         label="medium"
//         editConfigCallback={props.editConfigCallback}
//       />
//       <BreakpointInput
//         name="sm"
//         id="sm"
//         value={sm}
//         label="small"
//         editConfigCallback={props.editConfigCallback}
//       />
//       <BreakpointInput
//         name="xs"
//         id="xs"
//         value={xs}
//         label="extra small"
//         editConfigCallback={props.editConfigCallback}
//       />
//       <BreakpointInput
//         name="xxs"
//         id="xxs"
//         value={xxs}
//         label="extra extra small"
//         editConfigCallback={props.editConfigCallback}
//       />
//     </div>
//   );
// }

// function ColInput(props) {
//   var { name } = props;
//   return (
//     <InputNumberGtrThanZero {...props} name={"cols_" + name} addon="cols" />
//   );
// }

// function Cols(props) {
//   if (!props.cols) {
//     return <div />;
//   }

//   var { lg, md, sm, xs, xxs } = props.cols;

//   return (
//     <div>
//       <h4>Columns</h4>

//       <ColInput
//         name="lg"
//         value={lg}
//         label="large"
//         editConfigCallback={props.editConfigCallback}
//       />

//       <ColInput
//         name="md"
//         value={md}
//         label="medium"
//         editConfigCallback={props.editConfigCallback}
//       />

//       <ColInput
//         name="sm"
//         value={sm}
//         label="small"
//         editConfigCallback={props.editConfigCallback}
//       />

//       <ColInput
//         name="xs"
//         value={xs}
//         label="extra small"
//         editConfigCallback={props.editConfigCallback}
//       />

//       <ColInput
//         name="xxs"
//         value={xxs}
//         label="extra extra small"
//         editConfigCallback={props.editConfigCallback}
//       />
//     </div>
//   );
// }

// function Layouts(props) {
//   if (!props.layouts) {
//     return <div />;
//   }

//   var {
//     rowHeight,
//     isDraggable,
//     isResizable,
//     autoSize,
//     verticalCompact,
//     margin
//   } = props;

//   //Set with defaultValue if no defined
//   rowHeight = rowHeight !== undefined ? rowHeight : 150;
//   isDraggable = isDraggable !== undefined ? isDraggable : true;
//   isResizable = isResizable !== undefined ? isResizable : true;
//   autoSize = autoSize !== undefined ? autoSize : true;
//   verticalCompact = verticalCompact !== undefined ? verticalCompact : true;
//   var marginX = margin && margin[0] !== undefined ? margin[0] : 10;
//   var marginY = margin && margin[1] !== undefined ? margin[1] : 10;

//   return (
//     <div>
//       <h4>Layouts</h4>
//       <InputNumberGtrThanZero
//         value={rowHeight}
//         label="Row Height"
//         editConfigCallback={props.editConfigCallback}
//         name={"rowHeight"}
//         id="rowHeight"
//         addon="px"
//       />

//       <p>
//       <input
//       type="checkbox"
//       id="isDraggable"
//       checked={isDraggable}
//       onChange={props.editConfigCallback}
//     />
//     Items are draggable
//      </p>
//      <p>

//       <input
//         type="checkbox"
//         id="isResizable"
//         checked={isResizable}
//         onChange={props.editConfigCallback}
//       />
//       Items are resizable
//       </p>
//       <p>
//       <input
//         type="checkbox"
//         id="autoSize"
//         checked={autoSize}
//         onChange={props.editConfigCallback}
//       />
//       The container height swells and contracts to fit contents
//       </p>
//       <p>
//       <input
//         type="checkbox"
//         id="verticalCompact"
//         checked={verticalCompact}
//         onChange={props.editConfigCallback}
//       />
//       The layout will compact vertically
//       </p>

//       <InputNumberGtrThanZero
//         value={marginX}
//         label="Horizontal margin between items"
//         editConfigCallback={props.editConfigCallback}
//         name={"marginX"}
//         id="marginX"
//         addon="px"
//       />
//       <InputNumberGtrThanZero
//         value={marginY}
//         label="Vertical margin between items"
//         editConfigCallback={props.editConfigCallback}
//         name={"marginY"}
//         id="marginY"
//         addon="px"
//       />
//     </div>
//   );
// }

// export default function BootstrapEditor(props) {
//   var { breakpoints, cols } = props.reactGridLayout;

//   return (
//     <form className="reactDashboardBuilderBody">
//       <div className="container-fluid">
//         <div>
//           <Breakpoints
//             breakpoints={breakpoints}
//             editConfigCallback={props.editConfigCallback}
//           />
//         </div>

//         <div>
//           <Cols cols={cols} editConfigCallback={props.editConfigCallback} />
//         </div>

//         <div>
//           <Layouts
//             {...props.reactGridLayout}
//             editConfigCallback={props.editConfigCallback}
//           />
//         </div>
//       </div>
//     </form>
//   );
// }
