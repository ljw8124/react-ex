import styled from "styled-components";
import React, {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase.ts";
import {useNavigate} from "react-router-dom";


const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Title = styled.h1`
    font-size: 42px;
`;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Input = styled.input`
    margin-top: 10px;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        margin-top: 20px;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;


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
        </Wrapper>
    )
}