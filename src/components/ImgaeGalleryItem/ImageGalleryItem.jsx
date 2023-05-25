import { ListItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ largeImage, smallImage }) => (
    <ListItem>
        <Image src={ smallImage }/>
    </ListItem>
);

export default ImageGalleryItem;