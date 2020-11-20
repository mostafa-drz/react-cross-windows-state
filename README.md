# Getting Started with Create React App

This is a sample code with a custom React hook to share state between browser tabs.

```
function useCrossTabState(stateKey,d){
  const [state,setState] = useState(d)

  useEffect(()=>{
    try{
      localStorage.setItem(stateKey,JSON.stringify(state))
    }catch(error){}
  },[state,stateKey])

  useEffect(()=>{
    const onReceieveMessage = (e) => {
     const {key,newValue} = e
    if(key===stateKey){
      console.log('setted')
       setState(JSON.parse(newValue))
    }
    }
    window.addEventListener('storage',onReceieveMessage)
    return () => window.removeEventListener('storage',onReceieveMessage)
  },[stateKey,setState])

  return [state,setState]
}
```

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
