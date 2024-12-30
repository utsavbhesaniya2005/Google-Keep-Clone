import { useEffect, useState } from 'react';
import './SignIn.css';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetSignUpErr, signInWithGoogle, signUpAsync } from '../services/actions/AuthAction';

const SignUp = () => {

    const [signUpInput, setSignUpInput] = useState({
        uname : '',
        email : '',
        pass : ''
    });

    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const { isCreate, isSignUpErr } = useSelector(state => state.AuthReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInputs = () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let isValid = true;

        if (!username || username.length < 3) {
            setUsernameError(true);
            setUsernameErrorMessage('Username must be at least 3 characters.');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleInput = (e) => {
        setSignUpInput({ ...signUpInput, [e.target.name] : e.target.value })
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        if (validateInputs()) {
  
            if(signUpInput.pass == signUpInput.cpass){
                dispatch(signUpAsync(signUpInput));
                navigate('/signIn');
            }
        }
    };

    const handleGoogle = () => {
        dispatch(signInWithGoogle());
        navigate('/')
    }

    const handleBack = () => {
        dispatch(resetSignUpErr())
    }

    useEffect(() => {
        if(isCreate){
            navigate('/signIn')
        }
    }, [isCreate])

    return (
        <>
            {
                isSignUpErr ? 
                    <div className="err addRec">
                        <h1 className="text-danger mt-5">{isSignUpErr}</h1>
                        <Button className="mt-4 signUp" onClick={handleBack}>Go Back</Button>
                    </div>
                :
                    <div className="sign-up-container">
                    <div className="card">
                        <h1 className="title">Sign Up</h1>
                        <form className="form" onSubmit={handleSubmit}>
                            
                            <div className="form-control">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="uname" placeholder="Enter your username" required className={usernameError ? 'input-error' : ''} onChange={handleInput} value={signUpInput.uname} />
                                {usernameError && <div className="error-message">{usernameErrorMessage}</div>}
                            </div>

                            <div className="form-control">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="your@email.com" required className={emailError ? 'input-error' : ''} onChange={handleInput} value={signUpInput.email} />
                                {emailError && <div className="error-message">{emailErrorMessage}</div>}
                            </div>

                            <div className="form-control">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="pass" placeholder="••••••" required className={passwordError ? 'input-error' : ''} onChange={handleInput} value={signUpInput.pass} />
                                {passwordError && <div className="error-message">{passwordErrorMessage}</div>}
                            </div>

                            <div className="form-control">
                                <label htmlFor="cpass">Confirm Password</label>
                                <input type="password" id="cpass" name="cpass" placeholder="••••••" required className={passwordError ? 'input-error' : ''} onChange={handleInput} value={signUpInput.cpass} />
                                {passwordError && <div className="error-message">{passwordErrorMessage}</div>}
                            </div>

                            <Button type="submit" variant="contained" color="success" className="submit-btn" onClick={validateInputs}>
                                Sign in
                            </Button>
                        </form>

                        <div className="divider">or</div>

                        <button className="social-btn google-btn" onClick={handleGoogle}>
                            Sign up with Google
                        </button>

                        <div className="sign-up-link">
                            <span>Already have an account? </span>
                            <Link to="/signIn">Sign in</Link>
                        </div>
                    </div>
                    </div>
            }
        </>
    );
}

export default SignUp;