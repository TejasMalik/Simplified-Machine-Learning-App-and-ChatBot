import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';
import { Redirect } from 'react-router-dom'





class Login extends Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
        let loggedIn = true

        if (token == null) {
            loggedIn = false
        }
        this.signUp = React.createRef()
        this.signIn = React.createRef()
        this.container = React.createRef()

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phNo: "",
            emailS: "",
            passwordS: "",
            message: "",
            messageForExist: "",
            messageForSignIn: "",
            loggedIn,

        }

        this.handleClick = this.handleClick.bind(this)
        this.validateRegisterForm = this.validateRegisterForm.bind(this)
        this.validateSignInForm = this.validateSignInForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.forgotdetails = this.forgotdetails.bind(this)

    }


    handleClick() {
        const signUpButton = this.signUp.current;
        const signInButton = this.signIn.current;
        const container = this.container.current;


        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });

    }



    validateRegisterForm(user) {
        let error = {}
        if (!user.name) {
            error.name = "Enter your Full Name"
        }
        else if (!user.email) {
            error.email = "Enter your E-Mail Id"
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
            error.email = "Enter a valid E-Mail Id"
        }
        else if (!user.password) {
            error.password = "Enter a Password";
        }
        else if (user.password.length < 8) {
            error.password = "Enter atleast 8 characters in Password"
        }
        else if (!user.confirmPassword) {
            error.confirmPassword = "Enter Password Again"
        }
        else if (user.confirmPassword !== user.password) {
            error.confirmPassword = "Password does not match"
        }
        else if (isNaN(user.phNo)) {
            error.phNo = "Enter a valid Phone Number"
        }
        else if (!user.phNo) {
            error.phNo = "Enter your Phone Number"
        }
        else if (user.phNo < 0) {
            error.phNo = "Phone Number cannot be negative"
        }
        else if (user.phNo.length !== 10) {
            error.phNo = "Enter a valid Phone Number"
        }

        return error;

    }

    validateSignInForm(userS) {
        let errorS = {}

        if (!userS.emailS) {
            errorS.emailS = "Enter your E-Mail Id"
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userS.emailS))) {
            errorS.emailS = "Enter a valid E-Mail Id"
        }
        else if (!userS.passwordS) {
            errorS.passwordS = "Enter a Password";
        }
        else if (userS.passwordS.length < 8) {
            errorS.passwordS = "Enter atleast 8 characters in Password"
        }

        return errorS


    }

    onSubmit(userS) {
        UserDataService.checkUser(userS.emailS, userS.passwordS).then(() => this.props.history.push(`/loggedIn/`),
            localStorage.setItem("token", "sjkhfklsdjfklsdjkjfsddskldfj"),
        ).catch(err => {
            this.setState({
                messageForSignIn: "Wrong Email or Password"
            })
        })



    }

    onSuccess(user) {
        UserDataService.addUser(user).then(() => this.props.history.push("/success")).catch(err => {
            this.setState({
                messageForExist: 'User already exists.'
            })
        })

    }

    forgotdetails() {
        this.props.history.push("/forgotYourpass/check")
    }


    render() {

        let { name, email, password, confirmPassword, phNo } = this.state
        let { emailS, passwordS } = this.state

        if (this.state.loggedIn) {

            return <Redirect to='/loggedIn/' />
        }

        return (
            <div>
                <div className="container" id="container" ref={this.container}>
                    <div className="form-container sign-up-container">

                        {this.state.message && <div className='alert alert-danger'>{this.state.message}</div>}
                        <Formik initialValues={{ name, email, password, confirmPassword, phNo }} enableReinitialize={true} onSubmit={this.onSuccess} validateOnChange={false} validateOnBlur={false} validate={this.validateRegisterForm}>
                            <Form>
                                <h1>Create Account</h1>
                                {this.state.messageForExist && <div className='alert alert-danger'>{this.state.messageForExist}</div>}
                                <ErrorMessage name='name' component='div' className='alert alert-danger'></ErrorMessage>
                                <ErrorMessage name='email' component='div' className='alert alert-danger'></ErrorMessage>
                                <ErrorMessage name='password' component='div' className='alert alert-danger'></ErrorMessage>
                                <ErrorMessage name='confirmPassword' component='div' className='alert alert-danger'></ErrorMessage>
                                <ErrorMessage name='phNo' component='div' className='alert alert-danger'></ErrorMessage>

                                <fieldset >
                                    <Field type='text' name="name" placeholder="Name">
                                    </Field>
                                    <span className="myClass" style={{ float: 'left' }} >Enter the name</span>
                                </fieldset>
                                <fieldset>
                                    <Field type='text' name="email" placeholder="E-mail">
                                    </Field>
                                    <span className="myClass" style={{ float: 'left' }} >Example:abc@gmail.com</span>
                                </fieldset>
                                <fieldset>
                                    <Field type='password' name="password" placeholder="Password">
                                    </Field>
                                    <span className="myClass" style={{ float: 'left' }} >Enter atleast 8 characters</span>
                                </fieldset>
                                <fieldset>
                                    <Field type='password' name="confirmPassword" placeholder="Confirm Password">
                                    </Field>
                                    <span className="myClass" style={{ float: 'left' }} >Enter the same password again</span>
                                </fieldset>
                                <fieldset>
                                    <Field type='text' name="phNo" placeholder="Phone Number">
                                    </Field>
                                    <span className="myClass" style={{ float: 'left' }} >Enter the phone number</span>
                                </fieldset>
                                <br></br>
                                <button>Sign Up</button>
                            </Form>
                        </Formik>
                    </div>
                    <div className="form-container sign-in-container">
                        {this.state.message && <div className='alert alert-danger'>{this.state.message}</div>}
                        <Formik initialValues={{ emailS, passwordS }} enableReinitialize={true} onSubmit={this.onSubmit} validateOnChange={false} validateOnBlur={false} validate={this.validateSignInForm}>
                            <Form>
                                <h1>Sign in</h1>
                                {this.state.messageForSignIn && <div className='alert alert-danger'>{this.state.messageForSignIn}</div>}
                                <ErrorMessage name='emailS' component='div' className='alert alert-danger'></ErrorMessage>
                                <ErrorMessage name='passwordS' component='div' className='alert alert-danger'></ErrorMessage>
                                <fieldset>
                                    <Field type='text' name="emailS" placeholder="E-mail">
                                    </Field>
                                </fieldset>
                                <fieldset>
                                    <Field type='password' name="passwordS" placeholder="Password">
                                    </Field>
                                </fieldset>
                                <button>Sign In</button>
                                <br></br>

                                <button className="transparent" onClick={() => this.forgotdetails()}>Forgot your password?</button>

                            </Form>
                        </Formik>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn" ref={this.signIn} onClick={() => this.handleClick()}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp" ref={this.signUp} onClick={() => this.handleClick()}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <p>
                        Created with <i className="fa fa-heart"></i> by
            <a>&nbsp;Team 2&nbsp;</a>
                        - Enjoy our Machine Learning App
            <a>&nbsp;here</a>.
        </p>
                </footer>
            </div>
        );
    }
}

export default Login;