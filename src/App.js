import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import {connect} from 'kea'
import ElementOfNews from './ElementOfNews'
import NewsList from './NewsList'
import logic from './logic'

const appLogic = connect({
    actions:[
      logic,[
        'fetchData'
      ]
    ]
 })

class App extends Component {
  componentDidMount() {
      this.props.actions.fetchData()
  }

  render(){
    return(
      <Router>
        <div>
          <Route path="/" exact component={NewsList}/>
          <Route path="/:id" component={ElementOfNews}/>
        </div>
      </Router>
    )
  }
}

export default appLogic(App)
