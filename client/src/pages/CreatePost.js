import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
function CreatePost() {
    const initialValues={
        title:"",
        postText:"",
        username:"",
    };

    const validationScheme = Yup.object().shape({
        title:Yup.string().required(),
        postText:Yup.string().required(),
        username : Yup.string().min(3).max(15).required(),
    })    
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts",data).then((response)=>{
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

            
            <label>Username : </label>
            <ErrorMessage name ="username" component="span"/>
            <Field autocomplete="off" id ="inputCreatePost" name = "username" placeholder = "(Ex. John123....)" />

            <button type="submit" > Create Post </button>

        </Form>
        </Formik>
        </div>
    )
}

export default CreatePost
