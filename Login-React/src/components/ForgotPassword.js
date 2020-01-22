import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(user) {
        UserDataService.forgotPass(user.email).then(() => this.props.history.push("/passwordReset")).catch(err => {
            this.setState({
                message: 'User doesn\'t exists.'
            })
        })
    }

    validateSignInForm(user) {
        let error = {}

        if (!user.email) {
            error.email = "Enter your E-Mail Id"
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
            error.email = "Enter a valid E-Mail Id"
        }

        return error


    }

    render() {
        let { email } = this.state
        return (
            <div className="conForget">

                <Formik  initialValues={{ email }} enableReinitialize={true} onSubmit={this.onSubmit} validateOnChange={false} validateOnBlur={false} validate={this.validateSignInForm}>
                    <Form>
                        <h1>Enter Your E-Mail</h1>
                        {this.state.message && <div className='alert alert-danger'>{this.state.message}</div>}
                        <ErrorMessage name='email' component='div' className='alert alert-danger'></ErrorMessage>
                        <fieldset>
                            <Field type='text' name="email" placeholder="Enter your email">
                            </Field>
                        </fieldset>
                        <button>Submit</button>
                    </Form>
                </Formik>
            </div>
        );
    }
}

export default ForgotPassword;