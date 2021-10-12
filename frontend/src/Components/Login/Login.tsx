import axios from "axios";
import * as React from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import Api from "../../API/Api";

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
      .catch((error) => this.handleFailedLogin(error));
    // .finally(() => this.setState({ loggingIn: false }));
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
    return <>{this.state.loggedIn ? this.redirect() : this.renderLogin()}</>;
  }
  private redirect = () => {
    return <Redirect to="/maternity" />;
  };

  private renderLogin = () => {
    return (
      <>
        <h1>Login</h1>
        {this.state.loggingIn ? this.renderLogingIn() : this.renderInputs()}
      </>
    );
  };

  private renderLogingIn = () => {
    return <h2>Loging In ... </h2>;
  };

  private renderInputs = () => {
    return (
      <>
        <div>
          username:
          <input
            type="text"
            name="username"
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          password:
          <input
            type="text"
            name="password"
            onChange={this.handlePasswordChange}
          />
        </div>
        <button onClick={this.handleOnClick}> Login </button>{" "}
      </>
    );
  };
}

const Login = withRouter(WrappedLogin);
export default Login;
