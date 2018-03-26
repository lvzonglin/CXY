/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React from 'react';
import PropTypes from 'prop-types'
import { withRouter,matchPath } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout,Menu,Icon,Button } from 'antd';
import { Link } from 'react-router-dom';
import { getAllMenu,updateNavPath } from '../../actions/menu';

import './index.less';

const SubMenu = Menu.SubMenu;

const defaultTypes = {
  items:[]
}

const propTypes = {
  items:PropTypes.array
}

const { Sider } = Layout;

const isActive = (path,history) => {
  //FIX 目前菜单只做了2级目录的处理  所以去前面耳机目录
  var urlPath = history.location.pathname.split('/').splice(0,3).join('/')
  return matchPath(path,{
    path:urlPath,
    exact:true,
    strict:false
  })
}

//TODO，刷新页面菜单的激活项没做
class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openKey   :'sub1',
      isOpen    : false,
      activeKey :'menu101',
      collapsed : false
    }
  }

  componentWillMount(){
    this.props.getAllMenu()
  }

  componentWillReceiveProps=(nextProps)=>{
    Array.isArray(nextProps.items) && nextProps.items.map((item, i) => {
      Array.isArray(item.child) && item.child.map((node) => {
        if(node.url && isActive(node.url, this.props.history)){
          this.menuClickHandle({
            key     : 'menu'+node.key,
            keyPath : ['menu'+node.key, 'sub'+item.key]
          })
        }
      })
    });
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed : !this.state.collapsed
    });
  }

  onOpenChange = (openKeys) =>{
    this.setState({
      isOpen:true,
      openKey:openKeys[1]
    })
  }

  menuClickHandle = (item) => {
    this.setState({
      activeKey:item.key,
      isOpen:false
    })

    this.props.updateNavPath(item.keyPath,item.key)
  }

  render(){
    const { items,updateNavPath,history } = this.props;
    let   { activeKey,openKey,isOpen } = this.state;

    const _menuProcess = (nodes,pkey) => {
      return Array.isArray(nodes) && nodes.map((item,i)=>{
        const menu = _menuProcess(item.child,item.key);

        if(!isOpen && item.url && isActive(item.url,history)){
          activeKey = 'menu'+item.key,
          openKey   = 'sub' +pkey
        }

        if (menu.length > 0) {
          return (
            <SubMenu
              key={'sub'+item.key}
              title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}
            >
              {menu}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={'menu'+item.key}>
              {
                item.url ?
                  <Link to={item.url}>{item.icon && <Icon type={item.icon} />}{item.name}</Link> :
                  <span>{item.icon && <Icon type={item.icon} />}{item.name}</span>
              }
            </Menu.Item>
          )
        }
      })
    }

    const menu = _menuProcess(items);
    // console.log(activeKey)
    // console.log(openKey)
    return (
      /*collapsed={this.state.collapsed}*/
      <Sider>
        <div className="iot-layout-logo">IOT</div>
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            selectedKeys={[activeKey]}
            openKeys={[openKey]}
            onOpenChange={this.onOpenChange}
            onClick={this.menuClickHandle}
          >
            {menu}
          </Menu>

          <Button type="primary" onClick={this.toggleCollapsed} className="iot-sidebar-trigger">
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
      </Sider>
    )
  }
}

Sidebar.propTypes     = propTypes;
Sidebar.defaultTypes  = defaultTypes;

function mapStateToProps(state){
  return {
    items:state.menu.items
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAllMenu:bindActionCreators(getAllMenu,dispatch),
    updateNavPath:bindActionCreators(updateNavPath,dispatch)
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Sidebar))
