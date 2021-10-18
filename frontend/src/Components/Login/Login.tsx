import * as React from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import Api from "../../API/Api";
import axios from "axios";

type Property = {};

type State = {
  username: string;
  password: string;
  text?: string;
  loggingIn: boolean;
  loggedIn: boolean;
};

class WrappedLogin extends React.Component<
  Property & RouteComponentProps,
  State
> {
  constructor(props: {} & RouteComponentProps) {
    super(props);
    // this.isMounted = true;
    this.state = {
      username: "",
      password: "",
      loggingIn: false,
      loggedIn: false,
    };
  }

  private handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ username: event.currentTarget.value });
  };

  private handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  };

  private handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.login();
  };

  private login = () => {
    if (this.state.username.length == 0 || this.state.password.length == 0) {
      this.setState({ loggedIn: false });
      return;
    }
    this.validateLogin();
  };

  private validateLogin = () => {
    this.setState({ loggingIn: true });
    Api.Authorization.login(this.state.username, this.state.password)
      .then((data: any) => this.handleSuccessfulLogin(data.jwt))
      .catch((error) => this.handleFailedLogin(error))
      .finally(() => {
        /*
        Note: this will throw an exception on succesful login beacuse we will then redirect, causing this component to be killed.
        However, this setState called would still be called on an unmounted component.
        This sometimes cause a crash, so need to check for component unmounted. 
        */
        // this.setState({ loggingIn: false });
      });
  };

  private handleSuccessfulLogin = (token: string) => {
    if (axios.defaults.headers === undefined) {
      console.error("Axios undefined");
      return;
    }
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    this.setState({ loggedIn: true });
  };

  private handleFailedLogin = (error: any) => {
    alert(error);
  };

  render() {
    const style: any = {
      "margin-top": "8%",
    };
    return (
      <div className="container" style={style}>
        <div className="row justify-content-around">
          <div className="col-6 display-1 text-center">HHA Data Portal</div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 display-6 text-center">Sign in</div>
        </div>
        <div className="row justify-content-center">
          {this.state.loggedIn ? this.redirect() : this.renderLogin()}
        </div>
      </div>
    );
  }
  private redirect = () => {
    return <Redirect to="/" />;
  };

  private renderLogin = () => {
    return (
      <>{this.state.loggingIn ? this.renderLogingIn() : this.renderInputs()}</>
    );
  };

  private renderLogingIn = () => {
    return <h2>Loging In ... </h2>;
  };

  private renderInputs = () => {
    return (
      <div className="col-4">
        <div className="mb-3">
          <div className="form-label">Username</div>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <div className="form-label">Password</div>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            className="form-control"
          />
        </div>

        <div className="row">
          <button
            className="btn btn-primary mb-3 col-6 mx-auto"
            onClick={this.handleOnClick}
          >
            Login
          </button>
        </div>
      </div>
    );
  };

  componentWillUnmount() {
    console.log("login kill");
    // this.isMounted = false;
  }
}

const Login = withRouter(WrappedLogin);
export default Login;
