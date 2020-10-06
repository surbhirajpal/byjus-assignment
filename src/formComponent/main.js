import React from 'react'
import { Form, Button, Input, Icon } from 'antd'
import './styles.scss'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
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
                                <Form.Item validateStatus={firstnameError ? 'error' : ''} help={firstnameError || ''}>
                                    {getFieldDecorator('firstname', {
                                        rules: [{ required: true, message: " " }],
                                    })(
                                        <Input required={true} />,
                                    )}
                                    <label>First name</label>

                                </Form.Item>
                            </div>

                            <div className="input">
                                <Form.Item validateStatus={lastnameError ? 'error' : ''} help={lastnameError || ''}>
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
                            <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                                {getFieldDecorator('email', {
                                    rules: [{ type : 'email', message:'Not a valid email address' }],
                                })(
                                    <Input required={true} />,
                                )}
                                <label>Email address</label>
                            </Form.Item>
                        </div>

                        <div className="input">
                            <Form.Item validateStatus={addressError ? 'error' : ''} help={addressError || ''}>
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
                                <Form.Item validateStatus={cityError ? 'error' : ''} help={cityError || ''}>
                                    {getFieldDecorator('city', {
                                        rules: [{ required: true, message: ' ' }],
                                    })(
                                        <Input required={true} />,
                                    )}
                                    <label>City</label>
                                </Form.Item>
                            </div>
                            <div className="input">
                                <Form.Item validateStatus={postalCodeError ? 'error' : ''} help={postalCodeError || ''}>
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

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default WrappedHorizontalLoginForm