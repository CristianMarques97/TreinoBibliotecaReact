import React, { Component } from "react";
class UnauthHome extends Component {
  constructor() {
    super();
    document.title = "Bem-Vindo";
  }

  render() {
    return <p>Sem autorização</p>;
  }
}

export default UnauthHome;
