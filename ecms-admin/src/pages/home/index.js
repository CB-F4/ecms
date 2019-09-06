import React, { Component } from "react";
import { Title } from "./style";
export default class Home extends Component {
  render() {
    return (
      <Title>
        <a href="#/login">
          <h1>ECMS</h1>
          <h5>a simple react cms</h5>
        </a>
      </Title>
    );
  }
}
