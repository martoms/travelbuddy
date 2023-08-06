import useHandleForm from "../hooks/useHandleForm";
import useHandleSubmit from "../hooks/useHandleSubmit";
import { Form, Button } from "react-bootstrap";


const Login = () => {

    const initialFormState = {
        username: '',
        password: '',
    };

    const { formData, handleForm } = useHandleForm(initialFormState)
    const { loginUser } = useHandleSubmit(formData)
    
    return ( 
        <>
        <div id="login" className="page container-fluid d-flex flex-column">
            <div className="row">
                <h1 className="scrollOffsetIndicator">Let's Get Started Buddy!</h1>
                {/* FORM STARTS */}
                <div className="col-12">
                    <Form id="loginForm" onSubmit={loginUser}>
                        <h1>Login</h1>

                        {/* Login Info Starts */}
                        <Form.Group className="login-section login">
                            <Form.Label htmlFor="login-username">Username:</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                id="login-username"
                                onChange={handleForm}
                                required
                            />
                            <div className="username-error"></div>
                            <Form.Label htmlFor="login-password">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                id="login-password"
                                onChange={handleForm}
                                required
                            />
                            <div className="password-error"></div>
                            
                        </Form.Group>
                        {/* Login Info Ends */}
                        
                        {/* Submit Button */}
                        { (formData.username.length !== 0 && formData.password.length !== 0) ?
                            <Button type="submit">Login</Button>
                            :
                            <Button type="submit" disabled>Login</Button>
                        }
                        

                    </Form>
                </div>
                {/* FORM ENDS */}
            </div>
        </div>
        </>
    );
}
 
export default Login;