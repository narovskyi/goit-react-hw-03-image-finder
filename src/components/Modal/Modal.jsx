import { Component } from "react";
import { createPortal } from "react-dom";
import { ModalBlock, Overlay } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    render() {
        return createPortal(
            <Overlay>
                <ModalBlock>
                    {this.props.children}
                </ModalBlock>
            </Overlay>,
            modalRoot
        );
    }
}

export default Modal;