import request from './request'

export const getTaskList = params =>
  request({
    url: '/todo/task',
    method: 'get',
    params
  })
export const getDoneTaskList = params =>
  request({
    url: '/todo/taskDone',
    method: 'get',
    params
  })
export const getUndoneTaskList = params =>
  request({
    url: '/todo/taskUndone',
    method: 'get',
    params
  })
export const deleteById = params =>
  request({
    url: '/todo/deleteTask',
    method: 'get',
    params
  })
export const doneChenge = data =>
  request({
    url: '/todo/modifyTask',
    method: 'post',
    data
  })
export const addTask = data =>
  request({
    url: '/todo/addTask',
    method: 'post',
    data
  })
export const clearTask = params =>
  request({
    url: '/todo/clearTask',
    method: 'get',
    params
  })
