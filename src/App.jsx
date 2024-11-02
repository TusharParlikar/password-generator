import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [Length, setLength] = useState(8);
  const [Numbers, setNumbers] = useState(false);
  const [Symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  // useRef
  const PasswordRef = useRef(null);

  const copyPassword = useCallback(() => {
    PasswordRef.current.select();
    window.navigator.clipboard.writeText(password);

  }, [password]);

  const PasswordGenerator = useCallback(() => {
    let generatedPassword = "";
    let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let numbers = "0123456789";

    if (Numbers) character += numbers;
    if (Symbols) character += symbols;

    for (let i = 1; i <= Length; i++) {
      let index = Math.floor(Math.random() * character.length);
      generatedPassword += character.charAt(index);
    }

    setPassword(generatedPassword);
  }, [Length, Numbers, Symbols]);

  useEffect(PasswordGenerator, [Length, Numbers, Symbols]);

  return (
    <div className='bg-gray-700 p-10 my-4 w-1/2 m-auto'>
      <p className='text-3xl text-orange-500 my-2'>Password Generator</p>
      <div className='flex overflow-y-auto justify-center gap-3 text-blue-500'>
        <input className='bg-gray-200 text-black-500 overflow-hidden p-2 rounded' type="text" value={password} placeholder='Password' ref={PasswordRef} style={{ width: "450px" }} readOnly></input>
        <button onClick={copyPassword} className='bg-blue-500 hover:bg-blue-700 hover:text-orange-500 text-white font-bold py-2 px-4 rounded'>COPY</button>
      </div>
      <div className='flex overflow-hidden gap-5 my-4 text-white'>
        <input className='bg-gray-200 p-2 rounded text-white' type='range' min='8' max='100' value={Length} onChange={(e) => setLength(Number(e.target.value))} placeholder='Length'></input><label>Length: {Length}</label>
        <input className='bg-gray-200 p-2 rounded text-white' type="checkbox" checked={Numbers} onChange={(e) => setNumbers(e.target.checked)}></input><label>Numbers</label>
        <input className='bg-gray-200 p-2 rounded text-white' type="checkbox" checked={Symbols} onChange={(e) => setSymbols(e.target.checked)}></input><label>Symbols</label>
      </div>
    </div>
  );
}

export default App;
