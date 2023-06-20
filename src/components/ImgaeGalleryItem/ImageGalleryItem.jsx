import { ListItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ largeImage, smallImage, onClick }) => (
    <ListItem>
        <Image src={smallImage} onClick={onClick} />
    </ListItem>
);

export default ImageGalleryItem;