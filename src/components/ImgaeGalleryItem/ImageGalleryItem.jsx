import { ListItem, Image } from "./ImageGalleryItem.styled";
import Modal from "components/Modal";

const ImageGalleryItem = ({ largeImage, smallImage, onClick, showModal }) => (
    <ListItem>
        <Image src={smallImage} onClick={onClick} />
    </ListItem>
);

export default ImageGalleryItem;