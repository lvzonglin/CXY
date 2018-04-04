/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React,{Component} from 'react';
import { Select } from 'antd'
import { cloneDeep } from 'lodash';

import {iotUrl} from '@/api/url';
import {getIdentification,getClassify} from '@/api';

import Add from '@/components/Add';

import './index.less';

const { Option, OptGroup } = Select;

class AddProduct extends Component{
  constructor(){
    super();
    this.state = {
      formConfig:[
        {
          id:'proName',
          title:'产品名称',
          type:'input',
          placeholder:'请填写产品名称',
          rules:[{
            required:true,
            message:'请填写产品名称！'
          },{
            max:2,
            message:'dd'
          }]
        },
        {
          id:'proImage',
          title:'产品封面',
          type:'upload',
          className:'iot-pro-uploadImage',
          action:iotUrl.uploadImage,
          handleChange:this.uploadHandleChange,
          loading:false,
          imageUrl:'',
          rules:[{
            required:true,
            message:'请选择产品分类！'
          }]
        },
        {
          id:'proName1',
          title:'产品协议',
          type:'input',
          placeholder:'请填写产品协议',
          rules:[{
            required:true,
            message:'请填写产品名称！'
          }]
        },
        {
          id:'proIdentification',
          title:'产品标识',
          type:'select',
          placeholder:'请选择产品标识',
          option:[],
          rules:[{
            required:true,
            message:'请选择产品标识！'
          }]
        },
        {
          id:'proClassify',
          title:'产品分类',
          type:'select',
          placeholder:'请选择产品分类',
          option:[],
          rules:[{
            required:true,
            message:'请选择产品分类！'
          }]
        },
      ]
    }
  }

  componentWillMount = () =>{
    this.getClassifyOption();
  }
  
  uploadHandleChange = (info) =>{
    const config = cloneDeep(this.state.formConfig);
    config.forEach((item,key)=>{
      if(item.id === 'proImage'){
        if(info.file.status === 'uploading'){
          item.loading = true;
          item.imageUrl = '';
          return;
        }
        if (info.file.status === 'done') {
          item.loading = false
          item.imageUrl = info.file.response.data.url
        }
      }
    })

    this.setState({
      formConfig:config
    })
  }
  //获取产品分类
  getClassifyOption=()=>{
    getClassify().then((res)=>{
      this.setClassifyOption(res.data)
    }).catch((err)=>{

    })
  }
  //设置产品分类
  setClassifyOption = (data) =>{
    const config = cloneDeep(this.state.formConfig);
    const classifyOption = [];

    config.forEach((itemc,key)=>{
      if(itemc.id==='proClassify'){
        data.forEach((dataItem, i) => {
          if(dataItem.child){
            const optionGroup = <OptGroup label={dataItem.name} key={`proClassify_${dataItem.id}`}>
                                  {dataItem.child.map((child,c)=>{
                                    return <Option value={child.id} key={`proClassify_${child.id}`}>{child.name}</Option>
                                  })}
                               </OptGroup>
            classifyOption.push(optionGroup)
          }else{
            classifyOption.push(<Option value={dataItem.id} key={`proIdentification_${dataItem.id}`}>{dataItem.name}</Option>);
          }

          itemc.option = classifyOption;
        });
      }
    })

    this.setState({
      formConfig:config
    })
  }

  setOptions = (data) =>{
    const config = cloneDeep(this.state.formConfig);
    const optionI = [];

    config.forEach((itemc,key)=>{
      if(itemc.id === 'proIdentification'){
        data.forEach((dataItem, i) => {
          optionI.push(<Option value={dataItem.id} key={`proIdentification_${dataItem.id}`}>{dataItem.name}</Option>);
          itemc.option = optionI;
        });
      }
    })

    this.setState({
      formConfig:config
    })
  }

  render(){
    const {formConfig} = this.state
    return (
      <div>
        <Add formConfig={formConfig}/>
      </div>
    )
  }
}

export default AddProduct
