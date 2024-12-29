import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore";
import { auth, db, provider } from "../../firebaseConfig";

export const userSignUpSuc = (users) => {

    return{
        type : 'SIGNUP_SUC',
        payload : users
    }

}

export const userSignUpRej = (errMsg) => {

    return{
        type : 'SIGNUP_REJ',
        payload : errMsg
    }

}

export const userSignInRej = (errMsg) => {

    return{
        type : 'SIGNIN_REJ',
        payload : errMsg
    }

}

export const userSignInSuc = (user) => {

    return{
        type : 'SIGNIN_SUC',
        payload : user
    }
}

export const resetSignUpErr = () => {
    return{
        type : 'RESET_SIGNUP_ERR'
    }
}

export const resetSignInErr = () => {
    return{
        type : 'RESET_SIGNIN_ERR'
    }
}

export const userLogout = () => {

    return{
        type : 'SIGNOUT'
    }
}


export const signUpAsync = (users) => {

    return async dispatch => {

        createUserWithEmailAndPassword(auth, users.email, users.pass)
        .then((userCred) => {
            
            userCred.user.displayName = users.uname;

            dispatch(userSignUpSuc(userCred.user));
            
            const { cpass, ...userWithoutPass } = users;
            
            addDoc(collection(db, "users"), userWithoutPass);
        
        })
        .catch((err) => {
            
            console.log(err.code);
            
            if(err.code == 'auth/email-already-in-use'){
                
                dispatch(userSignUpRej('User Already Exits.'));
            }
        })

    }

}

export const signInAsync = (user) => {

    return async dispatch => {

        signInWithEmailAndPassword(auth, user.email, user.pass)
        .then((res) => {

            dispatch(userSignInSuc(res.user()))
        })
        .catch((err) => {

            console.log(err);

            if(err.code == 'auth/invalid-credential'){
                
                dispatch(userSignInRej('Username Or Password Is Invalid.'));
            }
        })
    }

}

export const signInWithGoogle = () => {

    return async dispatch => {

        signInWithPopup(auth, provider)
        .then((res) => {

            console.log(res.user);
            dispatch(userSignInSuc(res.user));
            
        })
        .catch((err) => {
            
            console.log(err);
        })
    }
}

export const userLogoutAsync = () => {

    return async dispatch => {

        try{
            
            await signOut(auth);
            dispatch(userLogout())
        }catch(err){
            
            console.log(err);
        }
        
    }
}