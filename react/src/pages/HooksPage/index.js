import React, { useState, useEffect } from 'react'

function HookPage() {
  // useState hook to manage state
  const [index, setIndex] = useState(0)
  const [name, setName] = useState('Thanh Hoang')

  // useEffect hook to manage side-effects (lifecycle methods)
  // componentDidMount equivalent
  useEffect(() => {
    console.log('component Did Mount')
    // componentWillUnmount equivalent
    return () => {
      console.log('component Will Unmount')
    }
  }, []) // The empty array ensures this effect runs once after initial render

  // useEffect for componentDidUpdate equivalent
  // This will run when 'index' changes
  useEffect(() => {
    console.log('component Did Update - index changed', index)
  }, [index])

  // Method to change state
  const changeState = () => {
    setIndex(prevIndex => prevIndex + 1)
    setName('Thanh Hoang 2')
  }

  // Render method equivalent
  return (
    <div>
      <h1>Hi {name}</h1>
      <h1>This is Life cycle page using hook</h1>
      <h2>Index: {index}</h2>
      <button onClick={changeState}>Increase index</button>
      <a href="/life-cycle">Go to class page</a>
    </div>
  )
}

export default HookPage

// Explanation of Key Changes:
// useState: We use the useState hook to manage state within the functional component.
// This replaces this.state and this.setState from class components.

// useEffect for Lifecycle Methods:

// ComponentDidMount: The useEffect hook with an empty dependency array [] is equivalent to componentDidMount.
// It runs after the first render.

// ComponentWillUnmount: The return function inside this useEffect is equivalent to componentWillUnmount.
// It runs when the component is about to unmount.

// ComponentDidUpdate: Another useEffect which depends on [index] is used.
// This is like componentDidUpdate for the index state.

// Rendering: The return statement in the functional component directly represents the render method in class components.

// This conversion to React Hooks makes the component more concise and aligns with modern React practices.
// It's also easier to read and maintain.
