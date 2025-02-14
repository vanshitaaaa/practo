import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import { hydrateRoot} from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";



/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/
/*hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);*/


/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/
/*hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);*/

const root = document.getElementById("root");

ReactDOM.hydrateRoot(
  root,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
