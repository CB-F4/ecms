import React, { Fragment, Component } from "react";
// import GlobalStyle from "./style.js";
import { Provider } from "react-redux";
import { store　} from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
            {/* <GlobalStyle /> */}
            <div>{this.props.children}</div>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
