 // hooks 가 나오기 전 코딩 스타일 -> class 기반으로 코딩
 class AppUgly extends React.Component {
  state = {
    item: 1
  };
  render() {
    const { item } = this.state;
    return (
      <div className="App">
        <h1>Hello uglyApp {item}</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.decrement}>decrement</button>
      </div>
    );
  }
  increment = () => {
    this.setState((state) => {
      return {
        item: state.item + 1
      };
    });
  };
  decrement = () => {
    this.setState((state) => {
      return {
        item: state.item - 1
      };
    });
  };
}