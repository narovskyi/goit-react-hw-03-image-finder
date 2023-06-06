import { Component } from "react";
import { Gallery, Heading } from "./ImageGallery.styled";
import ImageGalleryItem from "components/ImgaeGalleryItem/";
import Loader from "components/Loader/";

class ImageGallery extends Component {
    state = {
        galleryItems: [],
        status: 'idle'
    }

    componentDidUpdate(prevProps) {
        const prevSearchPhrase = prevProps.searchPhrase;
        const nextSearchPhrase = this.props.searchPhrase;

        if (prevSearchPhrase !== nextSearchPhrase) {
            console.log('Пошукова фраза змінилась');
            console.log(this.state.galleryItems);
            this.setState({
                status: 'pending'
            });
            fetch(`https://pixabay.com/api/?q=${nextSearchPhrase}&page=1&key=32074254-ec575441b41af33a027107547&image_type=photo&orientation=horizontal&per_page=12`)
                .then(res => res.json())
                .then(result => this.setState({
                    galleryItems: [...result.hits],
                    status: 'resolved'
                })
            );            
        }
    }

    // 'idle'
    // 'pending'
    // 'resolved'
    // 'loaded more'
    // 'error'

    render() {
        const { status } = this.state
        
        if (status === 'idle') {
            return (
                <Heading>You haven't searched yet...</Heading>
            );
        }

        if (status === 'pending') {
            return (
                <Loader />
            );
        }

        if (status === 'resolved') {
            return (
            <>
                <Gallery>
                    {this.state.galleryItems.map(({id, largeImageURL, webformatURL }) => {
                        return <ImageGalleryItem key={ id } largeImage={ largeImageURL } smallImage={ webformatURL } />
                    })}
                </Gallery>
            </>
            );
        }
    }
}

export default ImageGallery;