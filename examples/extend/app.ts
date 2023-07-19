import axios from '../../src/index'

interface ResponseData <T = any> {
  /**
   * 状态嘛
   * @type { number }
   */
  code: number;
  /**
   * 数据
   * @type { T }
   */
  result: T;
  /**
   * 错误信息
   * @type { string }
   */
  message: string;
}

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'one'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'two'
  }
})


interface User {
  name: string;
  age: number;
}

const getUser = <T>(url: string) =>{
  return axios<ResponseData<T>>(url)
    .then((res) => res.data)
    .catch(e => console.log(e))
}

const test = async () => {
  const user = await getUser<User>('/extend/user')
  console.log(user)
  if(user) {
    console.log(user.result.name)
  }
}

const test2 = async () => {
  const user = await getUser<User[]>('/extend/users')
  console.log(user)
  if(user) {
    console.log(user.result.length)
    console.log(user.result[0].age)
  }
}

test()
test2()