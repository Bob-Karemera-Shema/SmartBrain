import { useState } from "react";

export default function SignUp({ loadUser, onRouteChange }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onUsernameChange = (event) => {
        setUserName(event.target.value);
    };

    const onSubmitSignup = () => {
        fetch("http://localhost:3030/signup", {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: userName,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user.id) {
                loadUser(user);
                onRouteChange("home");
            }
        })
    };

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" 
                                type="text" 
                                name="username" 
                                id="username"
                                onChange={onUsernameChange} 
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" 
                                type="email" 
                                name="email-address" 
                                id="email-address"
                                onChange={onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" 
                                type="password" 
                                name="password" 
                                id="password"
                                onChange={onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign Up"
                            onClick={onSubmitSignup}
                        />
                    </div>
                </div>
            </main>
        </article>
    );
}