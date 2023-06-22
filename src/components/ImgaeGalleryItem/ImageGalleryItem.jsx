import { ListItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ largeImage, smallImage, onClick }) => (
    <ListItem>
        <Image src={smallImage} onClick={onClick} data-image={largeImage} />
    </ListItem>
);

export default ImageGalleryItem;