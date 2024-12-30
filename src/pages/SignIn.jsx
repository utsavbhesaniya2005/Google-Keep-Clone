import { useEffect, useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUsers, resetSignInErr, signInAsync, signInWithGoogle } from '../services/actions/AuthAction';

const SignIn = () => {

    const [signInInput, setSignInInput] = useState({
        email: '',
        pass: ''
    });

    const { isSignIn, isSignInErr } = useSelector(state => state.AuthReducer);

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [open, setOpen] = useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleInput = (e) => {
        setSignInInput({ ...signInInput, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        if (validateInputs()) {

            dispatch(signInAsync(signInInput));
        }
    };

    const handleGoogle = () => {
        dispatch(signInWithGoogle());
    }

    const handleBack = () => {
        dispatch(resetSignInErr())
    }

    useEffect(() => {
        dispatch(getUserId())
    }, [])

    useEffect(() => {
        if (isSignIn) {
            navigate('/')
        }
    }, [isSignIn])

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    return (
        <>
            {
                isSignInErr
                    ? <div className="err signIn">
                        <h1 className="text-danger mt-5">{isSignInErr}</h1>
                        <Button className="mt-4 signUp" onClick={handleBack}>Go Back</Button>
                    </div>
                    :
                    <div className="sign-in-container">
                        <div className="card">
                            <h1 className="title">Sign in</h1>
                            <form onSubmit={handleSubmit} className="form">
                                <div className="form-control">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        autoFocus
                                        className={emailError ? 'input-error' : ''}
                                        onChange={handleInput}
                                        value={signInInput.email}
                                    />
                                    {emailError && <span className="error-message">{emailErrorMessage}</span>}
                                </div>

                                <div className="form-control">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        name="pass"
                                        type="password"
                                        placeholder="••••••"
                                        required
                                        autoFocus
                                        className={passwordError ? 'input-error' : ''}
                                        onChange={handleInput}
                                        value={signInInput.pass}
                                    />
                                    {passwordError && <span className="error-message">{passwordErrorMessage}</span>}
                                </div>

                                <Button type="submit" variant="contained" color="success" className="submit-btn" onClick={validateInputs}>
                                    Sign in
                                </Button>
                            </form>

                            <button className="forgot-password-link">
                                Forgot Your Password?
                            </button>

                            <div className="divider">or</div>

                            <div className="social-buttons">
                                <button className="social-btn" onClick={handleGoogle}>
                                    Sign in with Google
                                </button>
                            </div>

                            <p className="sign-up-link">
                                Don't have an account? <Link to="/signUp">Sign up</Link>
                            </p>
                        </div>

                        {/* {open && (
                    <div className="forgot-password-modal">
                        <div className="modal-content">
                            <h2>Forgot Password</h2>
                            <p>Enter your email to reset your password.</p>
                            <button onClick={handleClose}>Close</button>
                        </div>
                    </div>
                )} */}
                    </div>
            }
        </>
    );
}

export default SignIn;