
describe('Users', function () {
  it('Should return a new user', async function () {
    const user = {
      firstName: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: 'byprice'
    }
    await this.agent
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect(200)
      .expect(/John Doe/)
      .then(async res => {
        const User = require('../server/models/users')
        await User.remove({ _id: res.body._id })
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  })
  it('Should return a user array', async function () {
    await this.agent
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect(/^\[/)
      .expect(200)
  })

})
