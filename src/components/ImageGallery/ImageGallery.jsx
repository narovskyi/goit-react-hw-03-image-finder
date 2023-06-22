import { Component } from "react";
import { Gallery, Heading } from "./ImageGallery.styled";
import ImageGalleryItem from "components/ImgaeGalleryItem/";
import Loader from "components/Loader/";
import LoadMoreButton from "components/LoadMoreButton";
import Modal from "components/Modal";
import api from 'services/api'
import PropTypes from 'prop-types';

class ImageGallery extends Component {
    state = {
        galleryItems: [],
        status: 'idle',
        page: 1,
        showModal: false,
        imageInModal: ''
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

    closeModal = () => {
        this.setState(({ showModal }) => ({
            showModal: false,
            imageInModal: ''
        }));
    }

    handleImageClick = (e) => {
        this.setState(({ showModal }) => ({
            showModal: true,
            imageInModal: e.target.dataset.image
        }))
    }

    render() {
        const { status, galleryItems, showModal, imageInModal } = this.state
        
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
                        return <ImageGalleryItem key={id} largeImage={largeImageURL} smallImage={webformatURL} onClick={this.handleImageClick} />
                    })}
                </Gallery>
                    {showModal && <Modal onClose={this.closeModal}><img src={imageInModal} alt="" /></Modal>}
                <LoadMoreButton onClick={this.handleButtonClick} />
            </>
            );
        }
    }
}

ImageGallery.propTypes = {
    searchPhrase: PropTypes.string.isRequired
}

export default ImageGallery;