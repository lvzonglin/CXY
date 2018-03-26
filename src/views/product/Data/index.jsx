/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React from 'react';
import { List,Card,Icon } from 'antd';
import DataList    from '@/components/DataList';

import { iotUrl } from '@/api/url';

import './index.less';

const { Meta } = Card;

class Data extends React.Component{
  constructor(){
    super()
  }

  render(){
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    
    const listConfig = {
      url:iotUrl.getProData,
      displayType:'list',
      renderItem:(item) => (
         <List.Item key={item.id} style={{borderBottom:0}}>
             <Card
              hoverable
              cover={<img alt="example" src={item.imageUrl} style={{height:200,width:'100%'}}/>}
              actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              >
                <Meta
                  title={[<IconText type="pie-chart" text="产品数据" key={item.id}/>]}
                  description={item.description}
                />
            </Card>
         </List.Item>
      )
    }

    return (
      <div>
        <DataList {...listConfig}/>
      </div>
    )
  }
}

export default Data
