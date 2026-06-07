import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.ts";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Input, Title, Wrapper, Error, Switcher } from "../components/auth-component.ts";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "name") {
            setName(value);;
        } else if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        // validate
        if(isLoading || name === "" || email === "" || password === "") {
            return;
        }

        try {
            setIsLoading(true);
            // Create Account
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            // Set the name of the User
            await updateProfile(credentials.user, {displayName: name});
            // Redirect to the home page
            navigate("/");

        } catch(e) {
            // control error
            if(e instanceof FirebaseError) {
                console.log(e.message, e.code);
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <Wrapper>
            <Title>Join Twitter</Title>
            <Form onSubmit={onSubmit} >
                <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required />
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
                <Input type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}

            <Switcher>
                Already have an account? <Link to={`/login`}>Login &rarr;</Link>
            </Switcher>

        </Wrapper>
    )
}