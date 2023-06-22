import { Component } from "react";
import { SearchHeader, SearchForm, FormButton, ButtonLabel, SearchInput } from "./Searchbar.styled";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from 'prop-types';

class Searchbar extends Component {
    state = {
        searchPhrase: ''
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.searchPhrase.trim() === '') {
            toast.warn('Enter something to search!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            this.setState({
                searchPhrase: ''
            });
            return;
        }

        this.props.onSubmit(this.state.searchPhrase.trim());
        this.setState({
            searchPhrase: '',
        });
    }

    handleInputChange = (e) => {
        this.setState({
            searchPhrase: e.target.value
        });
    }
    
    render() {
        return (
            <SearchHeader>
                <SearchForm onSubmit={this.handleSubmit}>
                    <FormButton type="submit">
                        <ButtonLabel>Search</ButtonLabel>
                    </FormButton>

                    <SearchInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.searchPhrase}
                        onChange={this.handleInputChange}
                    />
                </SearchForm>
            </SearchHeader>
    )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Searchbar;