import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import Form, {
    MenuItem,
    TextField,
    DatePicker,
    SelectField,
    Checkbox,
    Toggle,
    Slider,
    RadioButtonGroup,
    RadioButton
} from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import get_TData from '../../getData/GetData';



const data = {
    "tenantId": 1,
    "tenantUID": "fcbe10db-f1d9-45d0-a989-9cb938b4ea7f",
    "FullName": "Test 151",
    "SID": "",
    "authType": 1,
    "Id": 133,
    "logon": "Agent151@test.com",
    "agentId": "151",
    "RequiresAgreementAcceptance": false,
    "AgreementID": 2,
    "bSuspended": false,
    "bLocked": false,
    "bDisablePasswordExpiry": false,
    "bDisableInactivityTimeout": false,
    "cloudConnect": {},
    "userType": 1,
    "description": "",
    "groups": [
        "14fe6142-e180-433b-84d3-6e755e3fc936"
    ],
    "ACL_ID": 8,
    "CanUserEditOutcomes": false,
    "SecondaryEmailAddress": "",
    "hotdeskDN": "01162292746",
    "ComfortNoise": "00000000-0000-0000-0000-000000000000",
    "SFUserID": "",
    "dnOption": 0,
    "activeDialerServer": "",
    "workspaceLayoutUID": "00000000-0000-0000-0000-000000000000",
    "domain": "",
    "domainUsername": "",
    "externalSyncProfileUID": "00000000-0000-0000-0000-000000000000",
    "FailedAttempts": -1,
    "forcePasswordChange": false,
    "userSettings": {
        "testUserSetting": "testUserSetting",
        "TestUSInt": 45
    },
    "lastChangedUTC": "0001-01-01T00:00:00",
    "lastChangedBy": "00000000-0000-0000-0000-000000000000",
    "objectType": "User",
    "metaTemplateUID": "9e201cc8-1a76-41f2-931d-95d646dbe4c1",
    "revision": 0,
    "AssignedTags": [],
    "UID": "f4416ff1-1eb4-427d-a218-6229971660f8",
    "editStatus": "NoChange",
    "LoginData": {}
};

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class UserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            isGoing: false,
            Frequency: 3,
            native: "ffcc1c03-14b0-4d52-99f7-65eac376d153", //supervisor
            nativetextbox: "",
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        console.log(this.state[name]);

    }

    handleChange(event, index) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(this.state[name]);
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });

        // save or cancel???
        ReactDOM.unmountComponentAtNode(this.props.modal_root);
    }

    render() {
        const {
            userType,
            logon,
            bSuspended,
            bLocked,
            bDisablePasswordExpiry,
            bDisableInactivityTimeout,
            agentId,
            FullName
        } = this.props.data;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];


        const groupItems = get_TData("Groups");

        // const uss = getTenantData("Groups");
        // console.log(uss);


        return (
            <MuiThemeProvider>
                <div>
                    <RaisedButton label="Dialog" onClick={this.handleOpen} />
                    <Dialog
                        title="Dialog With Date Picker"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>

                        <form>


                            {/*                             
User type:	
Email Address:	
Administrator@mydomain.com
Secondary Email Address:	
Password:	
Password(again):	
Suspend User:	
Account Locked:	
Disable Password Expiry:	
Disable Inactive Timeout:	
Agent ID:	
Full name:	
Administrator
Preview:	
Agent DN option:
Agent CLI:	
PBX Extension:	
Comfort Tone:	
Edit Call History:	
Automatic Callback of Inbound Abandoned Calls:	
Minimum queue time before callback (0-9999 seconds):
Agent Meta Data:	
Screen Recording Name:	
Supervisor Desktop: */}


                            <label>
                                Name:<input
                                    name="nativetextbox"
                                    type="text"
                                    value={this.state.nativetextbox}
                                    onChange={this.handleInputChange} />
                            </label>


                            <label>
                                Pick your favorite La Croix flavor:
                            <select
                                    value={this.state.native}
                                    name="native"
                                    onChange={this.handleChange}>
                                    {
                                        groupItems.map((item, index, value) => {
                                            return (
                                                <option key={index} value={item.UID}>{item.name}</option>
                                            );
                                        })
                                    }
                                </select>
                            </label>


                            <label>
                                Is going:
                                    <input
                                    name="isGoing"
                                    type="checkbox"
                                    checked={this.state.isGoing}
                                    onChange={this.handleInputChange} />
                            </label>

                            <label>
                                Name:<input
                                    name="nativetextbox"
                                    type="text"
                                    value={this.state.nativetextbox}
                                    onChange={this.handleInputChange} />
                            </label>

                            <DatePicker hintText="Date" container="inline" />


                            
                        </form>
                    </Dialog>

                </div>
            </MuiThemeProvider>
        );
    }
}



// const modal_root = document.getElementById('modal-root');
// ReactDOM.render(
//     <UserDialog
//         modal_root={modal_root}
//         data={data}
//     />,
//     document.getElementById('modal-root')
// );




