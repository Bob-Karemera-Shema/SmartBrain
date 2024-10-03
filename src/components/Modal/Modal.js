import React from "react";
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ children }) {
    const element = document.createElement('div');

    React.useEffect(() => {
        modalRoot.appendChild(element);
    });

    return ReactDOM.createPortal(children, element);
}