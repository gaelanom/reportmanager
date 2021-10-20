import * as React from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import Api from "../../API/Api";
import axios from "axios";

type Property = {
  onLoggedIn?(): void;
} & RouteComponentProps;

type State = {
  username: string;
  password: string;
  text?: string;
  // Used for spinner state control
  loggingIn: boolean;
  loggedIn: boolean;
  authResCode: number;
  windowHeight: number;
  onLoggedIn?(): void;
};

class WrappedLogin extends React.Component<Property, State> {
  constructor(props: Property) {
    super(props);
    // this.isMounted = true;

    this.onLoggedIn = props.onLoggedIn;
    this.state = {
      username: "",
      password: "",
      loggingIn: false,
      loggedIn: false,
      authResCode: 0,
      windowHeight: window.innerHeight,
    };

    window.onresize = () => {
      this.setState({ windowHeight: window.innerHeight });
    };
  }

  private onLoggedIn?: () => void;

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
      this.setState({ loggedIn: false, authResCode: 400 });
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
    this.setState({ authResCode: 200, loggedIn: true, loggingIn: false });
    if (this.onLoggedIn !== undefined) this.onLoggedIn();
  };

  private handleFailedLogin = (error: any) => {
    this.setState({
      authResCode: error.response.status,
      loggedIn: false,
      loggingIn: false,
    });
  };

  render() {
    console.log("window height: " + this.state.windowHeight);
    const style: any = {
      "margin-top": this.state.windowHeight * 0.25 + "px",
    };
    return (
      <div className="container" style={style}>
        <div className="row justify-content-around">
          <div className="col display-1 text-center">HHA Data Portal</div>
        </div>
        <div className="row justify-content-center">
          <div className="col display-6 text-center">Sign in</div>
        </div>

        {this.state.authResCode != 200 && this.state.authResCode != 0 ? (
          <div className="row justify-content-center">{this.renderAlert()}</div>
        ) : (
          <></>
        )}
        <div className="row justify-content-center">
          {this.state.loggedIn ? this.redirect() : this.renderLogin()}
        </div>
      </div>
    );
  }

  private renderAlert = () => {
    return (
      <div className="col-4 alert alert-danger m-4 text-center">
        {this.getAlertMessage()}
      </div>
    );
  };

  private getAlertMessage = () => {
    const CODE = this.state.authResCode;
    if (CODE == 408) return "Request Timeout";
    if (400 <= CODE && CODE <= 500) return "Invalid Credentials";
    else return "Unknown Error";
  };

  private redirect = () => {
    return <Redirect to="/" />;
  };

  private renderLogin = () => {
    return (
      <>
        {this.state.loggingIn ? this.renderSpinner() : <div />}
        {this.renderInputs()}
      </>
    );
  };

  private renderSpinner = () => {
    return <div className="">{/* Spinner here? */}</div>;
  };

  private renderInputs = () => {
    return (
      <div className="col-4" style={{ minWidth: "300px", maxWidth: "300px" }}>
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
