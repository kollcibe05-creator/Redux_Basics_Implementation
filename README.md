Redux is a library extracted from the Hook `useReducer`.  
It is a state management library centralizing state and thus extricate factors like prop drilling and state being out of sync.   
It has an `immutable store` where all the data, state, is stored.   
When a change occurs, like a like or comment, an `action` is `dispatch`ed with a `name` and a `payload` which contains the data that needs to be changed.   
Remember that the `store` is immutable so for a dispatch an entirely `new object` is created by passing the `current state` and the `payload` to a reducer function. Which retuurns a new object with  the entire  application state.  The end result is a one-way data flow that is predictable and testable.  
*To have a real-time perception of the changes in your app, install the Chrome Dev Tools redux extension.*  
# Installation
```
npm install @reduxjs/toolkit react-redux
```

