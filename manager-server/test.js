const axios = require('axios')
// console.log('axios', axios)
axios.post('http://127.0.0.1:3000/users/login', {
  userName: 'admin',
  userPwd: 'admin'
}).then(res => {
  console.log('res', res.data)
}).catch(err => {
  console.log('err')
})