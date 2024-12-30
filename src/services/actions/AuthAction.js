import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { addDoc, collection, getDocs } from "firebase/firestore";
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

export const getUsersSuc = (users) => {

    return{
        type : 'GET_USERS',
        payload : users
    }
}

export const getUsers = () => {

    return async dispatch => {

        try{

            let getData = (await getDocs(collection(db, 'users'))).docs.map(doc => ({...doc.data(), uid : doc.id }));

            console.log("users id get", getData);
            

            dispatch(getUsersSuc(getData));


        }catch(err){

            console.log(err);
            
        }
    }
}

export const signUpAsync = (users) => {

    return async dispatch => {

        createUserWithEmailAndPassword(auth, users.email, users.pass)
        .then((userCred) => {
            
            userCred.user.displayName = users.uname;

            console.log(userCred.user);

            
            const signUpUser = {
                uid : userCred.user.uid,
                uname : userCred.user.displayName,
                email : userCred.user.email
            }

            localStorage.setItem('loginId', JSON.stringify(signUpUser.uid));
            
            addDoc(collection(db, "users"), signUpUser);

            dispatch(userSignUpSuc(signUpUser));
        
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

            let signInUser = {
                uid : res.user.uid,
                email : res.user.email
            };
            localStorage.setItem('loginId', JSON.stringify(signInUser.uid));
            dispatch(userSignInSuc(signInUser))
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

export const getUserId = () => {

    return async dispatch => {

        try{

            let getLoginId = JSON.parse(localStorage.getItem('loginId'));

            let getUser = await getDocs(collection(db, 'users'));

            let singleUser = getUser.docs.find((doc) => doc.data().uid === getLoginId)

            if(singleUser){

                let sUserData = singleUser.data();
                console.log("USER",sUserData);
                
                dispatch(userSignInSuc(sUserData));
            }

        }catch(err){

            console.log(err);
            
        }
    }
}

export const userLogoutAsync = () => {

    return async dispatch => {

        try{
            
            await signOut(auth);
            localStorage.removeItem('loginId');
            dispatch(userLogout());
        }catch(err){
            
            console.log(err);
        }
        
    }
}