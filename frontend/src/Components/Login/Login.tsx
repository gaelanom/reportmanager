import * as React from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import Api from "../../API/Api";
import axios from "axios";
import './Login.css';

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
    return <section className="vh-100 vh-100 gradient-custom">{this.state.loggedIn ? this.redirect() : this.renderLogin()}</section>;
  }
  private redirect = () => {
    return <Redirect to="/" />;
  };

  private renderLogin = () => {
    return (
      <>
        {this.state.loggingIn ? this.renderLogingIn() : this.renderInputs()}
      </>
    );
  };

  private renderLogingIn = () => {
    return
    <>
    <div className="d-flex align-items-center">
      <strong>Loading...</strong>
      <div className="spinner-border ms-auto text-light" role="status" aria-hidden="true"></div>
    </div>
    </>;
  };

  private renderInputs = () => {
    return (
      <>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">

                  <h3 className="fw-bold mb-4 text-uppercase">Login</h3>

                  <div className="form-outline form-white mb-4">
                  <input className="form-label form-control form-control-lg" type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" />
                  </div>

                  <div className="form-outline form-white mb-4">
                  <input className="form-label form-control form-control-lg" type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
                  </div>

                  <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                  <button className="btn btn-outline-light btn-lg px-5" onClick={this.handleOnClick}>Login</button>{" "}

                  <div>
                    {/* not implemented yet */}
                    <p className="mb-0 pt-4">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  componentWillUnmount() {
    console.log("login kill");
    // this.isMounted = false;
  }
}

const Login = withRouter(WrappedLogin);
export default Login;
