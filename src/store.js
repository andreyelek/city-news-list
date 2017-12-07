import thunkPlugin from 'kea-thunk'
import { getStore } from 'kea'

const store = getStore({
  plugins: [ thunkPlugin ]
})
export default store