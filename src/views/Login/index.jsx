import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form,Input,Button,Row,Col,Icon,message } from 'antd';

import { login } from '../../actions/auth';

import "./index.less"

const FormItem  = Form.Item;
const propTypes = {
  user        : PropTypes.object,
  loggingIn   : PropTypes.bool,
  loginErrors : PropTypes.string
}

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading:false
    }
  }
  handleSubmit(e){
    e.preventDefault();
    this.setState({
      loading:true
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.user,values.password).payload.promise.then((res)=>{
          this.setState({
            loading: false
          });

          if(res.error){
            message.error(res.payload.message)
          }else{
            message.success('登录成功 ' + res.payload.data.name);
            this.props.history.replace('/');
          }
        }).catch((err)=>{
          this.setState({
            loading:false
          });
        })
      }else{
        this.setState({
          loading: false
        });
      }
    });
  }
  toRegister(e){

  }
  render(){
    const { getFieldDecorator } = this.props.form
    return (
      <Row className="iotk-login" type='flex' justify="space-around" align="middle">
        <Col span="8">
          <Form layout="horizontal" className="iotk-login-form" onSubmit={this.handleSubmit.bind(this)}>
            <h2 className="logo">
              IOTK
            </h2>

            <FormItem>
              {
                getFieldDecorator('user', {
                  rules: [
                    { required: true, message: '请填写用户名！' }
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder='请输入用户名' />
                )
              }
            </FormItem>

            <FormItem>
              {
                getFieldDecorator('password',{
                  rules:[
                    { required:true,message:'请填写密码！' }
                  ],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password' placeholder='请输入密码' />
                )
              }
            </FormItem>
            <p>
              <Button className="btn-login" type='primary' size="large" icon="poweroff" loading={this.state.loading} htmlType='submit'>登录</Button>
            </p>
            <p>
              <Button className="btn-register" size="large" icon="double-right" htmlType='button' onClick={this.toRegister.bind(this)}>注册</Button>
            </p>
          </Form>
        </Col>
      </Row>
    )
  }
}

Login.propTypes = propTypes;

Login = Form.create()(Login);

function mapStateToProps(state){
  const {auth} = state;
  if(auth.user){
    return {
      user:auth.user,
      loggingIn:auth.loggingIn,
      loginErrors:''
    }
  }else{
    return {
      user:null,
      loggingIn:auth.loggingIn,
      loginErrors:auth.loginErrors
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    login:bindActionCreators(login,dispatch)
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))
