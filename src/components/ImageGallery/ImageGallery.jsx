import { Component } from "react";
import { Gallery, Heading, Image } from "./ImageGallery.styled";
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
        imageInModal: {
            imageUrl: '',
            altImageText: ''
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevSearchPhrase = prevProps.searchPhrase;
        const currentSearchPhrase = this.props.searchPhrase;

        if (prevState.page !== this.state.page) {
            if (this.state.page === 1) {
                    return;
                }
            try {
                const photos = await api.fetchPhoto(this.state.page, currentSearchPhrase);
                if (photos.length < 12 && photos.length >= 0) {
                    this.setState({
                        galleryItems: [...this.state.galleryItems, ...photos],
                        status: 'last page'
                    })
                } else {
                    this.setState({
                    galleryItems: [...this.state.galleryItems, ...photos],
                    status: 'resolved'
                })
                }
            } catch (error) {
                this.setState({
                    galleryItems: [],
                    status: 'error',
                })            
            }
        }

        if (prevSearchPhrase !== currentSearchPhrase) {
            this.setState({
                status: 'pending',
            });
            try {
                const photos = await api.fetchPhoto(1, currentSearchPhrase);
                if (photos.length === 0) {
                    this.setState({
                        status: 'nothing found',
                        page: 1
                    })
                } else if (photos.length < 12 && photos.length > 0) {
                    this.setState({
                        galleryItems: [...photos],
                        status: 'last page'
                    })
                } else {
                    this.setState({
                        galleryItems: [...photos],
                        status: 'resolved',
                        page: 1
                    })
                }  
            } catch (error) {
                this.setState({
                    galleryItems: [],
                    status: 'error',
                })
            }
        }
    }

    handleButtonClick = () => {
        this.setState({
            page: this.state.page + 1
        });
    }

    closeModal = () => {
        this.setState(() => ({
            showModal: false,
            imageInModal: {}
        }));
    }

    handleImageClick = (e) => {
        this.setState(() => ({
            showModal: true,
            imageInModal: {
                imageUrl: e.target.dataset.image,
                altImageText: e.target.dataset.alt
            }
        }))
    }

    render() {
        const { status, galleryItems, showModal, imageInModal: { imageUrl, altImageText } } = this.state
        
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
                    {galleryItems.map(({id, largeImageURL, webformatURL, tags }) => {
                        return <ImageGalleryItem key={id} largeImage={largeImageURL} smallImage={webformatURL} altText={tags} onClick={this.handleImageClick} />
                    })}
                </Gallery>
                    {showModal && <Modal onClose={this.closeModal}>
                        <Image src={imageUrl} alt={altImageText} />
                    </Modal>}
                <LoadMoreButton onClick={this.handleButtonClick} />
            </>
            );
        }

        if (status === 'last page') {
            return (
            <>
                <Gallery>
                    {galleryItems.map(({id, largeImageURL, webformatURL, tags }) => {
                        return <ImageGalleryItem key={id} largeImage={largeImageURL} smallImage={webformatURL} altText={tags} onClick={this.handleImageClick} />
                    })}
                </Gallery>
                    {showModal && <Modal onClose={this.closeModal}>
                        <Image src={imageUrl} alt={altImageText} />
                    </Modal>}
                <Heading>That's all we found for your request.</Heading>
            </>
            );
        }

        if (status === 'nothing found') {
            return (
                <Heading>Sorry, we couldn't find any matches...</Heading>
            );
        }

        if (status === 'error') {
            return (
                <Heading>Sorry, something went wrong...</Heading>
            );
        }
    }
}

ImageGallery.propTypes = {
    searchPhrase: PropTypes.string.isRequired
};

export default ImageGallery;