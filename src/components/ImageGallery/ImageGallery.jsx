import { Component } from "react";
import { Gallery, Heading } from "./ImageGallery.styled";
import ImageGalleryItem from "components/ImgaeGalleryItem/";
import Loader from "components/Loader/";
import LoadMoreButton from "components/LoadMoreButton";
import api from 'services/api'

class ImageGallery extends Component {
    state = {
        galleryItems: [],
        status: 'idle',
        page: 1
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevSearchPhrase = prevProps.searchPhrase;
        const currentSearchPhrase = this.props.searchPhrase;

        if (prevState.page !== this.state.page) {
            console.log('page changed');
            console.log('змінений пейдж в стейті: ', this.state.page);
            const photos = await api.fetchPhoto(this.state.page, currentSearchPhrase);
            this.setState({
                galleryItems: [...this.state.galleryItems, ...photos],
                status: 'resolved'
            })
        }

        if (prevSearchPhrase !== currentSearchPhrase) {
            console.log('Пошукова фраза змінилась');
            console.log(this.state.galleryItems);
            this.setState({
                status: 'pending',
            });
            console.log('поточний page в стейті: ', this.state.page);
            const photos = await api.fetchPhoto(1, currentSearchPhrase);
            this.setState({
                galleryItems: [...photos],
                status: 'resolved'
            })    
        }

        // if (prevSearchPhrase !== currentSearchPhrase || prevState.page !== this.state.page) {
        //     console.log('page changed');
        //     console.log('пейдж в стейті: ', this.state.page);
        //     const photos = await api.fetchPhoto(this.state.page, currentSearchPhrase);
        //     if (prevSearchPhrase !== currentSearchPhrase) {
        //         this.setState({
        //             galleryItems: [...photos],
        //             status: 'resolved',
        //             page: 1
        //         })
        //     }
        //     if (prevState.page !== this.state.page) {
        //         this.setState({
        //             galleryItems: [...this.state.galleryItems, ...photos],
        //             status: 'resolved'
        //         })
        //     }
        // }

    }

    handleButtonClick = () => {
        console.log('button pressed');
        this.setState({
            page: this.state.page + 1
        });
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
                <LoadMoreButton onClick={this.handleButtonClick}/>
            </>
            );
        }
    }
}

export default ImageGallery;