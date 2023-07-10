import { ListItem, Image } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImage, smallImage, altText, onClick }) => (
    <ListItem>
        <Image
            src={smallImage}
            alt={altText}
            onClick={onClick}
            data-image={largeImage}
            data-alt={altText}
        />
    </ListItem>
);

ImageGalleryItem.propTypes = {
    largeImage: PropTypes.string.isRequired,
    smallImage: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;