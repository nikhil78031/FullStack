import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {useParams,useHistory} from 'react-router-dom'
import axios from 'axios'

function Registration() {
    let history = useHistory();
    const initialValues={
        username:"",
        password:"",
    };

    const validationScheme = Yup.object().shape({
        username : Yup.string().min(3).max(15).required(),
        password : Yup.string().min(4).max(20).required(),
    })   
    
    const onSubmit=(data)=>{
        axios.post("http://localhost:3001/auth",data).then((response)=>{
            alert("User created");
            history.push("/login");
         console.log(data);   
    })
    }
    return (
        <div>
           <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationScheme} >
        <Form className="formContainer" >            
            <label>Username : </label>
            <ErrorMessage name ="username" component="span"/>
            <Field autocomplete="off" id ="inputCreatePost" name = "username" placeholder = "(Ex. John123....)" />

            <label>Password : </label>
            <ErrorMessage name ="password" component="span"/>
            <Field autocomplete="off" type="password" id ="inputCreatePost" name = "password" placeholder = "Your password" />

            <button type="submit" > Register </button>

        </Form>
        </Formik>
        </div>
    )
}

export default Registration
