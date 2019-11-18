import React, { Component } from 'react'
import { Auth } from "aws-amplify";
import Login from './Login';
import Logout from './Logout';
import { setUser } from '../../actions/UserActions'
import { connect } from "react-redux";

export class Authenticate extends Component {

    getAuthenticatedUser(){
        Auth.currentAuthenticatedUser()
            .then(user => {
                const email = user.attributes.email
                if (email.substring(email.indexOf("@") + 1, email.length) === 'ubcbiztech.com') {
                    this.props.setUser(user)
                }
                else {
                    Auth.signOut()
                    alert('You must use a ubcbiztech.com email')
                }
            })
            .catch(() => console.log("Not signed in"))
    }

    componentDidMount() {
        if (window.location.pathname === '/login/'){
            setTimeout(() => this.getAuthenticatedUser(), 700)
            let newurl = window.location.protocol + "//" + window.location.host;
            window.history.pushState({ path: newurl }, '', newurl);
        }
        else this.getAuthenticatedUser()
    }

    render() {
        return this.props.user
        ? <Logout />
        : <Login />
    }

}

const mapStateToProps = state => {
    return {
      user: state.userState.user,
    };
  };
  
  export default connect(mapStateToProps, { setUser })(Authenticate);
  