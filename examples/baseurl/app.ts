import axios from "../../src"

const instance = axios.create({
  baseURL: 'http://localhost:8085'
})

instance.get('/more/get').then(res => {
  console.log(res)
})

instance.get('http://localhost:8085/more/get').then(res => {
  console.log(res)
})
