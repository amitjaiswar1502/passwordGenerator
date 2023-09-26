import { useCallback, useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "@#$%&*^?[]{}~'-=,.";
    }

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      console.log(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const handleOnCopy = useCallback(
    (e) => {
      e.preventDefault();
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 30);
      if (window.navigator.clipboard.writeText(password)) {
        toast.success("Copied successfully", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    },
    [password]
  );

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="container">
        <div className="input-content">
          <h1>Password Generator</h1>
          <input
            type="text"
            id="pass"
            placeholder="password"
            value={password}
            readOnly
            ref={passwordRef}
          />

          <button className="copy" onClick={handleOnCopy}>
            Copy
          </button>
        </div>

        <div className="controls">
          <div className="controls-item">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              id="range"
              onChange={(e) => setLength(e.target.value)}
              style={{ cursor: "pointer" }}
            />
            <label>Length : {length}</label>
          </div>

          <div className="controls-item">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="checkboxInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number Allowed</label>
          </div>

          <div className="controls-item">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="charInput"
              className="checkboxInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Character Allowed</label>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
