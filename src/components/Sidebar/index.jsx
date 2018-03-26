import React from 'react';
import PropTypes from 'prop-types'
import { withRouter,matchPath } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout,Menu,Icon } from 'antd';
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
  return matchPath(path,{
    path:history.location.pathname,
    exact:true,
    strict:false
  })
}

class Sidebar extends React.Component {
  state = {
    openKey   :'sub1',
    activeKey :'menu101'
  }

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.getAllMenu()
  }

  componentWillReceiveProps(nextProps){
    //todo
  }

  menuClickHandle = (item) => {
    this.setState({
      activeKey:item.key
    })

    this.props.updateNavPath(item.keyPath,item.key)
  }

  render(){
    const { items,updateNavPath,history } = this.props;
    let   { activeKey,openKey } = this.state;

    const _menuProcess = (nodes,pkey) => {
      return Array.isArray(nodes) && nodes.map((item,i)=>{
        const menu = _menuProcess(item.child,item.key);
        
        if(item.url && isActive(item.url,history)){
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
                item.url ? <Link to={item.url}>{item.icon && <Icon type={item.icon} />}{item.name}</Link> : <span>{item.icon && <Icon type={item.icon} />}{item.name}</span>
              }
            </Menu.Item>
          )
        }
      })
    }

    const menu = _menuProcess(items);

    return (
      <Sider
        trigger={null}
        >
        <div className="iot-layout-logo">IOT</div>
          <Menu
            mode="inline" theme="dark"
            selectedKeys={[activeKey]}
            defaultOpenKeys={[openKey]}
            onClick={this.menuClickHandle}
          >
            {menu}
          </Menu>
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
