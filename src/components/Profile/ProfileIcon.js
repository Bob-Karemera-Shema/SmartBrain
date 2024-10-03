import React from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

export default function ProfileIcon({ onRouteChange, toggleModal }) {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className='pa4 tc'>
            <div className="d-flex p-5">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="span"
                    >
                        <img
                            src="/profile.jpg"
                            className="br-100 ba h3 w3 dib" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu right className='b--transparent shadow-5' style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5'}}>
                        <DropdownItem onClick={toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={() => onRouteChange("signin")}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

        </div>
    )
}
