import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import store from "./store/index";
import {Provider} from "react-redux";


ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
      </BrowserRouter>,
)