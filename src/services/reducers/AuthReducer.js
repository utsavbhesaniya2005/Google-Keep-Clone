const initialState = {
    users : [],
    isCreate : false,
    isSignUpErr : null,
    user : null,
    isSignIn : false,
    isSignInErr : null,
}

const AuthReducer = (state = initialState, action) => {

    switch(action.type){

        case 'SIGNUP_SUC' :
            
            return {
                ...state, 
                isCreate : true,
                isSignIn : false,
                users : action.payload
            }

        case 'SIGNUP_REJ' :

            return {
                ...state,
                isSignUpErr : action.payload,
                isSignIn : false
            }   

        case 'SIGNIN_SUC' :

            return {
                ...state, 
                isSignIn : true,
                user : action.payload
            }

        case 'SIGNIN_REJ' :

            return{

                ...state,
                isSignIn : false,
                isSignInErr : action.payload
            }

        case 'RESET_SIGNUP_ERR' :

            return{
                ...state,
                isSignUpErr : null,
                isSignIn : false
            }

        case 'RESET_SIGNIN_ERR' :

            return{
                ...state,
                isSignInErr : null,
                isSignIn : false
            }

        case 'SIGNOUT' :

            return{
                ...state,
                user : null,
                isSignIn : false
            }

        case 'GET_USERS' :

            return {
                ...state,
                users : action.payload
            }

        default : 
            return state    

    }

}
export default AuthReducer;