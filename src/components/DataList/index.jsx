/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
/*
  通用Table 组件  个性化的页面需要在相应的组件单写
*/
import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table,List,Divider } from 'antd';

import queryString from 'query-string';

import { post,get } from '@/api/request';

class DataList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource:[],
      pagination:{
        onChange:this.pageChange
      },
      loading:true
    }
  }
  componentWillMount(){
    this.getData();
  }
  componentDidMount(){

  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }
  getData(){
    //TODO  获取数据时还没解析查询参数
    const { history,location } = this.props;
    const query = queryString.parse(location.search);

    get(this.props.url,query).then((res)=>{
      this.setState({
        dataSource:res.data.result,
        pagination:Object.assign({},this.state.pagination,res.data.pageInfo)
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  pageChange = (page,pageSize)=>{
    //TODO 拼接查询参数
    const { history,location } = this.props;
    const query = queryString.parse(location);

    history.push(`?current=${page}&pageSize=${pageSize}`)
    this.getData();
  }

  removeItem = (id) => {

  }
  removeItems = () => {

  }

  render(){
    const dataSource = this.state.dataSource
    const pagination = this.state.pagination

    const { columns,displayType,renderItem } = this.props
    
    return (
          displayType === 'table' ? <Table
                                      bordered
                                      dataSource  ={dataSource}
                                      columns     ={columns}
                                      pagination  ={pagination}
                                      onChange    ={this.handleTableChange}
                                    />
                                    :<List
                                      bordered = {false}
                                      pagination={pagination}
                                      grid={{ gutter: 16, column: 4 }}
                                      dataSource={dataSource}
                                      renderItem={renderItem}
                                    />
    )

  }
}

export default withRouter(DataList);
