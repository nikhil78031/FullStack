import React,{useContext,useEffect} from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../helpers/AuthContext"
function CreatePost() {
    const initialValues={
        title:"",
        postText:"",
    };
    const {authState} = useContext(AuthContext);
    useEffect(()=>{
        if(!localStorage.getItem("accessToken"))
        {
            history.push("/login");
        }
    },[]);

    const validationScheme = Yup.object().shape({
        title:Yup.string().required(),
        postText:Yup.string().required(),
    })    
    const onSubmit = (data) => {

        axios.post("http://localhost:3001/posts",data,{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{

            history.push("/");
    })
    };
    let history = useHistory();
    return (
        <div className="createPostPage" >
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationScheme} >
        <Form className="formContainer" >
            <label>Title : </label>
            <ErrorMessage name ="title" component="span"/>
            <Field autocomplete="off" id ="inputCreatePost" name = "title" placeholder = "(Ex. Title....)" />

            
            <label>PostText : </label>
            <ErrorMessage name ="postText" component="span"/>
            <Field autocomplete="off" id ="inputCreatePost" name = "postText" placeholder = "(Ex. Post....)" />


            <button type="submit" > Create Post </button>

        </Form>
        </Formik>
        </div>
    )
}

export default CreatePost
