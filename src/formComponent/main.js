import React from 'react'
import { Form, Button, Input} from 'antd'
import './styles.scss'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class InformativeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: ''
        }
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleChange(event) {
        this.setState({ emailValue: event.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                alert("Congratulations " + values.firstname + ", your form has been submitted!")

            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const firstnameError = isFieldTouched('firstname') && getFieldError('firstname');
        const lastnameError = isFieldTouched('lastname') && getFieldError('lastname');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const addressError = isFieldTouched('address') && getFieldError('address');
        const cityError = isFieldTouched('city') && getFieldError('city');
        const postalCodeError = isFieldTouched('postalCode') && getFieldError('postalCode');


        return (
            <div className="form-component" style={{ height: window.innerHeight }}>
                <div className="form">
                    <p className="heading">Your information</p>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="flex">
                            <div className="input">
                                <Form.Item validateStatus={firstnameError ? 'error' : ''}>
                                    {getFieldDecorator('firstname', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <Input required={true}/>,
                                    )}
                                    <label>First name</label>

                                </Form.Item>
                            </div>

                            <div className="input">
                                <Form.Item validateStatus={lastnameError ? 'error' : ''} >
                                    {getFieldDecorator('lastname', {
                                        rules: [{ required: true, message: ' ' }],
                                    })(
                                        <Input required={true} />,
                                    )}
                                    <label>Last name</label>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="input">
                            <Form.Item validateStatus={emailError ? 'error' : ''} className="email">
                                {getFieldDecorator('email', {
                                    rules: [{ type: 'email', message: 'Not a valid email address' }],
                                })(
                                    <Input required={false} value={this.state.emailValue}
                                        onChange={this.handleChange}
                                        className={this.state.emailValue == '' ? "initial" : "top"} />,
                                )}
                                <label>Email address</label>
                            </Form.Item>
                        </div>

                        <div className="input">
                            <Form.Item validateStatus={addressError ? 'error' : ''} >
                                {getFieldDecorator('address', {
                                    rules: [{ required: true, message: ' ' }],
                                })(
                                    <Input required={true} />,
                                )}
                                <label>Address line</label>
                            </Form.Item>
                        </div>

                        <div className="flex">
                            <div className="input">
                                <Form.Item validateStatus={cityError ? 'error' : ''} >
                                    {getFieldDecorator('city', {
                                        rules: [{ required: true, message: ' ' }],
                                    })(
                                        <Input required={true} />,
                                    )}
                                    <label>City</label>
                                </Form.Item>
                            </div>
                            <div className="input">
                                <Form.Item validateStatus={postalCodeError ? 'error' : ''} >
                                    {getFieldDecorator('postalCode', {
                                        rules: [{ required: true, message: ' ' }],
                                    })(
                                        <Input required={true} />,
                                    )}
                                    <label>Postal code</label>
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item className="button">
                            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedLoginForm = Form.create()(InformativeForm);

export default WrappedLoginForm