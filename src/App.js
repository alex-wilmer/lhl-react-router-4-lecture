import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  withRouter
} from 'react-router-dom'

// HOC example

const A = props => <div />
const higherOrder = Component => props => <Component blue={true} />
const B = higherOrder(A)
const C = withRouter(A)

const Intro = () =>
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>

const Test = ({ foo }) =>
  <div>
    <h1>{foo}</h1>
    <hr />
    this is a test!
  </div>

let Random = withRouter(props =>
  <div>
    <h1>Random</h1>
    <h2>
      {props.location && props.location.pathname}
    </h2>
  </div>
)

let users = [{ id: '1', name: 'joe' }, { id: '10', name: 'alex' }]

class User extends Component {
  state = { user: {} }

  componentDidMount() {
    const id = this.props.match.params.id
    // mock get from database
    const user = users.find(user => user.id === id)
    this.setState({ user })

    // redirect programatically
    setTimeout(() => {
      // add new history item on stack
      this.props.history.push('/login')
      // replace last item on history stack
      this.props.history.replace('/login')
    }, 3000)
  }

  render() {
    return (
      <div>
        <h1>User page</h1>
        <h2>
          {this.state.user.name}
        </h2>

        <Link to={`/users/${this.props.match.params.id}/details`}>
          User Details Page
        </Link>
        <Link
          to={`${this.props.location.pathname}/profile`} // won't work
        >
          User Profile Page
        </Link>

        <Route
          path={`/users/${this.props.match.params.id}/details`}
          component={props => <div>these are the user details</div>}
        />
        <Route
          path={`${this.props.location.pathname}/profile`} // won't work
          component={props => <div>welcome to your profile</div>}
        />
      </div>
    )
  }
}

let Modal = props =>
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: `rgba(0, 0, 0, 0.6)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: props.show ? 1 : 0,
      transition: 'all 0.2s ease',
      pointerEvents: props.show ? 'all' : 'none'
    }}
  >
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px'
      }}
    >
      {props.children}
      <Link to="/">Close</Link>
    </div>
  </div>

class App extends Component {
  state = { foo: 'bar' }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            children={props => {
              return (
                <Modal show={props.location.pathname.includes('login')}>
                  <h1>this is a cool modal with dynamic children</h1>
                </Modal>
              )
            }}
          />

          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>

          <hr />
          <div>
            <Link to="/">Home Page</Link>
          </div>
          <div>
            <Link to="/test">Test Page</Link>
          </div>
          <div>
            <Link to="/users/10">User Page</Link>
          </div>
          <div>
            <Link to="/login">Login Form</Link>
          </div>
          <hr />

          <Switch>
            <Route exact path="/" component={Intro} />
            <Route
              path="/test"
              component={props => <Test foo={this.state.foo} />}
            />
            <Route path="/users/:id" component={User} />
            <Route
              component={() =>
                <div>
                  <h1>404 page</h1>
                  <Link to="/">go back home</Link>
                </div>}
            />
          </Switch>

          <Random />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
