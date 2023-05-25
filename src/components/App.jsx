import { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import { ToastContainer } from "react-toastify";
import { Wrapper } from "./App.styled";

export default class App extends Component {
  state = {
    searchPhrase: ''
  }

  handleSearchSubmit = (searchPhrase) => {
    this.setState({searchPhrase});
  }

  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery searchPhrase={ this.state.searchPhrase}/>
        <ToastContainer autoClose={3000}/>
      </Wrapper>
  );
  }
};
