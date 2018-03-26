/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React,{ Component } from 'react';
import { Route,Switch } from 'react-router-dom';

import Layout from '../views/Layout'
import Login 	from '../views/Login';

import Home 			from '@/views/Home';

import My					from '@/views/product/My/index';
import AddProduct from '@/views/product/My/add';
import EditProduct from '@/views/product/My/edit';
import Data 			from '@/views/product/Data';
import Equipment 	from '@/views/product/Equipment';
import Template 	from '@/views/product/Template';

import Admin 	from '@/views/users/Admin';
import Vender from '@/views/users/Vender';
import User 	from '@/views/users/User';

import Role 		 from '@/views/system/Role';
import Menu 		 from '@/views/system/Menu';
import Configure from '@/views/system/Configure';

export const childRoutes = [
	{
		'path':'/home',
		'component':Home,
		'exactly':true
	},
	{
		'path':'/product/my',
		'component':My,
		'exactly':true
	},
	{
		'path':'/product/my/add',
		'component':AddProduct,
		'exactly':true
	},
	{
		'path':'/product/my/edit',
		'component':EditProduct,
		'exactly':true
	},
	{
		'path':'/product/data',
		'component':Data,
		'exactly':true
	},
	{
		'path':'/product/equipment',
		'component':Equipment
	},
	{
		'path':'/product/template',
		'component':Template
	},

	{
		'path':'/users/admin',
		'component':Admin
	},
	{
		'path':'/users/Vender',
		'component':Vender
	},
	{
		'path':'/users/User',
		'component':User
	},

	{
		'path':'/system/role',
		'component':Role
	},
	{
		'path':'/system/menu',
		'component':Menu
	},
	{
		'path':'/system/configure',
		'component':Configure
	},
]

export const breadcrumbNameMap = {
	'/product': '产品管理',
	'/product/my': '我的产品',
	'/product/my/add': '添加产品',
	'/product/my/edit': '修改产品',
	'/product/data': '产品数据',
	'/product/equipment': '设备管理',

	'/users': '模板管理',
	'/users/admin': '操作人员',
	'/users/vender': '品牌厂家',
	'/users/user': '平台用户',

	'/system': '系统设置',
	'/system/role': '角色管理',
	'/system/menu': '菜单管理',
	'/system/configure': '参数管理'
};

const routes = (
	<Switch>
		<Route path="/login" component={Login}/>
		<Route path="/" component={Layout}/>
	</Switch>
)

export default routes;
