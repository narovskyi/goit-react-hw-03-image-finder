import { Component } from "react";
import { createPortal } from "react-dom";
import { ModalBlock, Overlay } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);

    }

    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalBlock >
                    {this.props.children}
                </ModalBlock>
            </Overlay>,
            modalRoot
        );
    }
}

export default Modal;