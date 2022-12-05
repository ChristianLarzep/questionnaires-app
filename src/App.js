import {
  BrowserRouter as Router, 
  Routes as Switch,
  Route
} from "react-router-dom";

import List from "./pages/List/List";
import './App.css';
import Editor from "./pages/Editor/Editor";

function App() {
  return (
    <Router>
      <Switch>
      <Route
          path="*"
          element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            } />
        <Route path="/" element={<List />} />
        <Route path="/editor" element={<Editor/>}/>
      </Switch>
    </Router>
  );
}

export default App;
