import { Component } from "react";
import { Gallery } from "./ImageGallery.styled";

class ImageGallery extends Component {
    state = {
        galleryItems: []
    }

    componentDidUpdate(prevProps) {
        const prevSearchPhrase = prevProps.searchPhrase;
        const nextSearchPhrase = this.props.searchPhrase;

        if (prevSearchPhrase !== nextSearchPhrase) {
            console.log('Пошукова фраза змінилась');
            console.log(this.state.galleryItems);
            fetch(`https://pixabay.com/api/?q=${nextSearchPhrase}&page=1&key=32074254-ec575441b41af33a027107547&image_type=photo&orientation=horizontal&per_page=12`)
                .then(res => res.json())
                .then(result => this.setState({
                    galleryItems: [...result.hits]
                })); 
        }
    }

    render() {
        return (
            <>
                <h1>{this.props.searchPhrase}</h1>
                <Gallery />
            </>
        );
    }
}

export default ImageGallery;