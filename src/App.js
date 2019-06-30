import React from "react";
import { TweenMax, Elastic } from "gsap";
import Typed from "typed.js";
import logo from "./logo.svg";
import "./App.css";

function InputSet({ label, name, value, onChange, type }) {
  return (
    <div>
      <label>{label}</label>
      <input name={name} value={value} type={type} onChange={onChange} />
    </div>
  );
}

class App extends React.Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    this.formInteraction({
      msg: "ログインしてください。",
      anim: { scale: 1.5 }
    });
  }

  formInteraction = ({ msg, anim }) => {
    if (this.messageTyped) this.messageTyped.destroy();
    this.messageTyped = new Typed(this.message, {
      typeSpeed: 50,
      strings: [msg],
      preStringTyped: () =>
        TweenMax.from(this.logo, 1, { ...anim, ease: Elastic.easeOut })
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email === "test@test.com" && password === "password") {
      this.formInteraction({
        msg: "ログインに成功しました。",
        anim: { y: 100 }
      });
    } else {
      this.formInteraction({
        msg: "ログインに失敗しました。",
        anim: { x: 100 }
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div ref={node => (this.logo = node)}>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <form>
            <span ref={node => (this.message = node)} />
            <div style={{ marginTop: "1rem" }}>
              <InputSet
                name="email"
                onChange={this.handleChange}
                value={email}
                label="メールアドレス"
                type="email"
              />
              <InputSet
                name="password"
                onChange={this.handleChange}
                value={password}
                label="パスワード"
                type="current-password"
              />
            </div>
            <button onClick={this.handleSubmit}>送信</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
