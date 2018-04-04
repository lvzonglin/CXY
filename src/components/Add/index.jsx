/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React,{Component} from 'react';
import {Form,Select,Input,InputNumber,Switch,Radio,Upload,Button,Icon} from 'antd';

import './index.less';

const FormItem = Form.Item;
const Option   = Select.Option;
const RadioButton = Radio.Button;


const inputType = {
  'input':function(item,getFieldDecorator){
    return (
      <span>
        {
          getFieldDecorator(item.id, {
            rules: item.rules
          })(
            <Input placeholder={item.placeholder}/>
          )
        }
      </span>
    )
  },
  'select':function(item,getFieldDecorator){
    return (
      <span>
        {
          getFieldDecorator(item.id,{
            rules: item.rules
          })(
            <Select placeholder={item.placeholder}>
              {item.option}
            </Select>
          )
        }
      </span>
    )
  },
  'upload':function(item,getFieldDecorator){
    const uploadButton = (
      <div>
        <Icon type={item.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">选择图片(400*200)</div>
      </div>
    );
    //TODO，这里需要转换提交时候到服务器的值
    return (
      <span>
        {
          getFieldDecorator(item.id,{
            rules:item.rules
          })(
            <Upload
              listType="picture-card"
              showUploadList={false}
              action={item.action}
              className={item.className}
              onChange={item.handleChange}
            >
              {item.imageUrl ? <img src={item.imageUrl} alt="封面" /> : uploadButton}
            </Upload>
          )
        }
      </span>
    )
  }
}

class Add extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { formConfig } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="iot-form">
        {
          formConfig.map((item,index)=>{
            return <FormItem key={item.id} label={item.title}>
                      {inputType[item.type](item,getFieldDecorator)}
                   </FormItem>
          })
        }

        <FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    )
  }
}


export default Form.create()(Add);
