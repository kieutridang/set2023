import { Component } from 'react'

class LifeCyclePage extends Component {
  // The constructor() is the very first method called as the component is “brought to life.”
  // The constructor method is called before the component is mounted to the DOM.
  // In most cases, you would initialize state and bind event handlers methods within the constructor method.
  constructor(props) {
    super(props)
    this.state = { index: 0, name: 'Thanh Hoang' }
  }
  // This method will update the state and trigger the render method again to update the DOM
  changeState = () => {
    // Use arrow function to bind this to the component instance
    // If not, sometime we call changeState() in the onClick event, the this will be undefined
    // this in javascript is a dynamic context, it depends on how the function is called
    this.setState(prevState => ({
      index: prevState.index + 1,
      name: 'Thanh Hoang 2'
    }))
  }
  // This method will be called before the component is mounted
  componentWillMount() {
    console.log('component Will Mount')
  }
  // This method will be called after the component is mounted (rendered)
  // After render is called, the component is mounted to the DOM and the componentDidMount method is invoked.
  // If you also want to make network requests as soon as the component is mounted to the DOM, this is a perfect place to do so
  componentDidMount() {
    // Add event listener here
    console.log('component Did Mount')
  }
  // This method will be called when the component have some changes in the props or state
  // This method will return a boolean value, if it returns true, the component will be updated, otherwise it will not be updated
  shouldComponentUpdate(nextProps, nextState) {
    // this.state.index = 1
    console.log('should Component Update with nextProps, nextState', nextProps, nextState)
    //* INFO: Only update the component if the index is even
    return nextState.index % 2 === 0
  }
  // This method will be called before the component is updated
  componentWillUpdate() {
    console.log('component Will Update with state', this.state)
  }
  // This method will be called after the component is updated
  componentDidUpdate(prevProps, prevState) {
    console.log('component Did Update with prevProps, prevState', prevProps, prevState)
    console.log('component Did Update with state', this.state)
  }

  // This method will be called before the component is unmounted
  componentWillUnmount() {
    // Remove event listener here
    console.log('component Will Unmount')
  }

  // This method will be called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.
  // It will be passed the error that was thrown and the component stack trace.
  // This method works like a JavaScript catch {} block, but for components.
  // In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.
  componentDidCatch(error, info) {
    console.log('component Did Catch with error, info', error, info)
    // logToExternalService(error, info) // this is allowed.
    //Where logToExternalService may make an API call.
  }

  render() {
    return (
      <div>
        <h1>This is Life cycle page</h1>
        <h2>Index: {this.state.index}</h2>
        <button onClick={this.changeState}>Increase index</button>
        <a href="/hook">Go to hook page</a>
      </div>
    )
  }
}
export default LifeCyclePage
