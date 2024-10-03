import React from 'react';
import './Profile.css';

export default function Profile({ isProfileOpen, toggleModal, user }) {
    return (
        <div className='profile-modal'>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    <img
                        src="/profile.jpg"
                        className="h3 w3 dib" alt="avatar" />
                    <h1>{user.name}</h1>
                    <h4>{`Images Submitted: ${user.entries}`}</h4>
                    <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                    <label className="mt2 fw6" htmlFor="username">Username:</label>
                    <input
                        className="pa2 ba w-100"
                        placeholder={user.name}
                        type="text"
                        name="username"
                        id="username"
                    />
                    <label className="mt2 fw6" htmlFor="username">Email:</label>
                    <input
                        className="pa2 ba w-100"
                        placeholder={user.email}
                        type="email"
                        name="useremail"
                        id="useremail"
                    />
                    <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>Save</button>
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20' onClick={toggleModal}>Cancel</button>
                    </div>
                </main>
                <div className='modal-close' onClick={toggleModal}>&times;</div>
            </article>
        </div>
    )
}
