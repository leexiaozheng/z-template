import Mock from 'mockjs';

Mock.mock(/getName/, 'get', {
    type: 0,
    code: '',
    msg: 'SUCCESS',
    data: '@cname',
});