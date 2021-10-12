import * as React from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";

type Property = {};

type State = {
  username: string;
  password: string;
  text?: string;
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
      text: "",
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
    if (this.validateLogin()) this.handleSuccessfulLogin();
    else this.handleFailedLogin();
  };

  private validateLogin = () => {
    return (
      this.state.username === "catshark" && this.state.password === "12345"
    );
  };

  private handleSuccessfulLogin = () => {
    // this.props.history.push("/");
    this.setState({ loggedIn: true });
  };

  private handleFailedLogin = () => {
    alert("Login failed");
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
        <h2>text</h2>
        <input
          type="text"
          name="username"
          onChange={this.handleUsernameChange}
        />
        <input
          type="text"
          name="password"
          onChange={this.handlePasswordChange}
        />
        <button onClick={this.handleOnClick}> Login </button>
      </>
    );
  };
}

const Login = withRouter(WrappedLogin);
export default Login;
