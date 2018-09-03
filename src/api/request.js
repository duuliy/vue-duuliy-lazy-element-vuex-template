import axios from 'axios'
import fetch from '@/utils/fetch.js'



//退出登录

const SignOutAsync=(data)=> fetch('/api/App/SignOutAsync','get')

//组织机构
//查询组织机构

const GetByQuery=(data)=> fetch('/api/Organization/GetByQuery','post',data)

//添加组织机构

const AddOrAsync=(data)=> fetch('/api/Organization/AddAsync','post',data)
//更新组织机构

const UpdateAsync=(data)=> fetch('/api/Organization/UpdateAsync','put',data)
//删除组织结构

const DeleteAsync=(data)=> fetch('/api/Organization/DeleteAsync','delete',data)

//用户统计
//查询用户

const GetByQueryAsync=(data)=> fetch('/api/App/GetByQueryAsync','post',data)
//查询用户详情

const GetUserDetailDtoByIdAsync=(data)=> fetch('/api/App/GetUserDetailDtoByIdAsync','post',data)
//添加用户

const AddAsync=(data)=> fetch('/api/App/AddAsync','post',data)


//获取领域类型列表

const GetDomainTypesListAsync=(data)=> fetch('/api/App/GetDomainTypesListAsync','get',data)

//编辑用户

const UpdateUserAsync=(data)=> fetch('/api/App/UpdateUserAsync','post',data)


export {
	SignOutAsync,
	GetByQuery,
	AddOrAsync,
	UpdateAsync,
	DeleteAsync,
	GetByQueryAsync,
	GetUserDetailDtoByIdAsync,
	AddAsync,
	GetDomainTypesListAsync,
	UpdateUserAsync
}
