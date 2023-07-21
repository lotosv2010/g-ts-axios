import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled,', e.message) // 输出1
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  setTimeout(() => {
    axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
      console.log('e', e)
      if (axios.isCancel(e)) {
        console.log('post', e.message) // 输出2
      }
    })
  }, 100)
}, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    console.log('c', c)
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled!', e.message) // 输出3
  }
})

setTimeout(() => {
  cancel('by manager')
}, 500)