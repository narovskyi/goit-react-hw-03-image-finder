import { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import { ToastContainer } from "react-toastify";

export default class App extends Component {
  state = {
    searchPhrase: ''
  }

  handleSearchSubmit = (searchPhrase) => {
    this.setState({searchPhrase});
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery searchPhrase={ this.state.searchPhrase}/>
        <ToastContainer autoClose={3000}/>
      </>
  );
  }
};
