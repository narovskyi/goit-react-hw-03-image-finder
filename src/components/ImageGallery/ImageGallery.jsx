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
        page: 1,
        showModal: false
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevSearchPhrase = prevProps.searchPhrase;
        const currentSearchPhrase = this.props.searchPhrase;

        if (prevState.page !== this.state.page) {
            if (this.state.page === 1) {
                return;
            }
            const photos = await api.fetchPhoto(this.state.page, currentSearchPhrase);
            this.setState({
                galleryItems: [...this.state.galleryItems, ...photos],
                status: 'resolved'
            })
        }

        if (prevSearchPhrase !== currentSearchPhrase) {
            this.setState({
                status: 'pending',
            });
            const photos = await api.fetchPhoto(1, currentSearchPhrase);
            this.setState({
                galleryItems: [...photos],
                status: 'resolved',
                page: 1
            })    
        }
    }

    handleButtonClick = () => {
        this.setState({
            page: this.state.page + 1
        });
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }));
        console.log(this.state.showModal);
    }

    render() {
        const { status, galleryItems } = this.state
        
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
                    {galleryItems.map(({id, largeImageURL, webformatURL }) => {
                        return <ImageGalleryItem key={id} largeImage={largeImageURL} smallImage={webformatURL} onClick={this.toggleModal} />
                    })}
                </Gallery>
                <LoadMoreButton onClick={this.handleButtonClick}/>
            </>
            );
        }
    }
}

export default ImageGallery;