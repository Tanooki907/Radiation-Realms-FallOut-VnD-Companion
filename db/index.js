import * as user from './controllers/user'
import * as auth from './controllers/auth'
import * as char from './controllers/char'

const db = {
  user,
  auth,
  char
}

export default db