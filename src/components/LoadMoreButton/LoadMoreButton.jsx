import { Button } from "./LoadMoreButton.styled";
import PropTypes from 'prop-types';

const LoadMoreButton = ({ onClick }) => (
    <Button onClick={onClick}>Load more</Button>
);

LoadMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default LoadMoreButton;