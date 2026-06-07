import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

export const Title = styled.h1`
    font-size: 42px;
`;

export const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Input = styled.input`
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

export const Error = styled.span`
    margin-top: 10px;
    font-weight: 600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 10px;
    a {
        color: #1d9bf0;
    }
`;