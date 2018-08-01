import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

 constructor(props) {
     super(props);
     this.handleURLChange = this.handleURLChange.bind(this);
     this.state = {url: ''};
 }

 handleURLChange(new_url){
     this.setState({url:new_url});

 }


  render() {
    return (
      <div className="App">
          <Header title="ABC Link Generator" />
          <ABCForm onDataChange={this.handleURLChange}/>
          <ABCLinkView url={this.state.url}/>

      </div>
    );
  }
}


const Header = (props) => <h1>{props.title}</h1>


let ABCLinkView = (props) => (
    <div>
        {props.url ?
            <div>
                <div>
                    <label>
                        ABC Link
                        <div>
                            <textarea value={props.url} readOnly="true"> </textarea>
                        </div>
                    </label>
                </div>
                <a href={props.url}>Click to Test</a>
            </div>

            : null
        }
    </div>
)

let ABCBadgeView = (props) => (
    <div>
        <div className='apple-business-chat-button-container' data-apple-business-id='e8d4bb55-180c-11e8-8ba7-b97859c148c8'></div>
    </div>
)


// A stateful component
// A stateful component
class ABCForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            businessid: '',
            groupid: '',
            intentid: '',
            messageText:''
        }

        this.handleSelection = this.handleSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.businessIdList = [
            {value: 'e8d4bb55-180c-11e8-8ba7-b97859c148c8', text: 'TD Ameritrade'}
        ]

        this.groupIdList = [
            {value: 'Marketing', text: 'Marketing'},
            {value: 'TDAMobile', text: 'TDAMobile'},
            {value: 'ToS', text: 'ToS'},
        ]

        this.intentIdList = [
            {value: 'market-events', text: 'market-events'},
            {value: 'education', text: 'education'},
            {value: 'none', text: 'none'}
        ]
    }

    componentDidMount() {
        this.setState({
            businessid: this.businessIdList[0].value,
            groupid: this.groupIdList[0].value,
            intentid: this.intentIdList[0].value

        })
    }

    handleSelection(event) {
        let elementName = event.target.name
        let elementValue = event.target.value
        if (elementName === 'businessid') {
            this.setState({businessid: elementValue})
        }else if (elementName === 'groupid') {
            this.setState({groupid: elementValue})
        }else if (elementName === 'intentid') {
            this.setState({intentid: elementValue})
        }
    }

    handleChange(event){

        this.setState({messageText: event.target.value})

    }


    handleSubmit(event) {
        let abcurl = generateURL(this.state.businessid, this.state.groupid, this.state.intentid, this.state.messageText);
        event.preventDefault();
        this.props.onDataChange(abcurl);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Business ID:
                        <select name="businessid" value={this.state.businesid} onChange={this.handleSelection} >
                            {getOptions(this.businessIdList)}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Group ID:
                        <select name="groupid" value={this.state.groupid} onChange={this.handleSelection}>
                            {getOptions(this.groupIdList)}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Intent ID
                        <select name="intentid" value={this.state.intentid}  onChange={this.handleSelection}>
                            {getOptions(this.intentIdList)}
                        </select>
                    </label>
                </div>
                <div>
                        <label>
                            <div>Message Text</div>
                            <textarea  value={this.state.messageText} onChange={this.handleChange}></textarea>
                        </label>
                </div>

                <input type="submit" value="Generate URL" />
            </form>
        );
    }
}


function generateURL(businessID, groupID, intentID, messageText) {
    const groupIDAtrribName = "data-apple-business-group-id=";
    const intentIDAtrribName = "data-apple-business-intent-id=";
    const bodyIDAtrribName = "data-apple-body-id=";
    const baseUrl = "https://bcrw.apple.com/urn:biz:";

    let URL = baseUrl + businessID + "?" + groupIDAtrribName + groupID + "&" + intentIDAtrribName + intentID;

    if ( messageText.length != 0){ // if there is no message
        URL=URL + "&" + bodyIDAtrribName + messageText;
    }



    let encodedUrl = encodeURI( URL );

    return encodedUrl;
}

function getOptions(optionsArray) {
    return optionsArray.map((option, index) =>
        (<option key={index + 1} value={(option.value) ? option.value : option.text}>
                {option.text}
            </option>
        ))
}

export default App;
