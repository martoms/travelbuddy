import AddressFields from "../components/AddressFields";
import useHandleForm from "../hooks/useHandleForm";
import useHandleSubmit from "../hooks/useHandleSubmit";
import { Form, Button } from "react-bootstrap";


const Signup = () => {

    const initialFormState = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNo: '',
        gender: 'Select',
        birthday: '',
        address: { region: '', province: '', city: '', barangay: '' }
    };
    const { formData, setFormData, handleForm } = useHandleForm(initialFormState)
    const { signupUser } = useHandleSubmit(formData) 

    return ( 
        <>
        <div id="signup" className="page container-fluid d-flex flex-column">
            <div className="row">
                <h1 className="scrollOffsetIndicator">Your Adventure starts here!</h1>
                {/* FORM STARTS */}
                <div className="col-12" >
                    <Form id="signupForm" onSubmit={signupUser}>
                        <h1>Signup</h1>

                        {/* Name Starts */}
                        <Form.Group className="signup-section">
                            <Form.Label htmlFor="signup-firstName">Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                id="signup-firstName"
                                placeholder="First name..."
                                value={formData.firstName}
                                onChange={handleForm}
                                required
                            />
                            <div className="firstName-error"></div>
                            <Form.Control
                                type="text"
                                name="lastName"
                                id="signup-lastName"
                                placeholder="Last name..."
                                value={formData.lastName}
                                onChange={handleForm}
                                required
                            />
                            <div className="lastName-error"></div>
                        </Form.Group>
                        {/* Name Ends */}

                        {/* Birthday | Sex | Contact Starts */}
                        { formData.firstName.length !== 0 &&
                          formData.lastName.length !== 0 && (
                            <Form.Group className="signup-section">
                                <Form.Group className="birthday">
                                    <Form.Label htmlFor="birthday">Birthday:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthday"
                                        id="birthday"
                                        value={formData.birthday}
                                        onChange={handleForm}
                                        required
                                    />
                                    <div className="birthday-error"></div>
                                </Form.Group>
                                <Form.Group className="sex">
                                    <Form.Label htmlFor="signup-sex">Sex:</Form.Label>
                                    <select id="signup-sex" name="gender" value={formData.gender} onChange={handleForm} required>
                                        <option>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <div className="sex-error"></div>
                                </Form.Group>
                                <Form.Label htmlFor="contact-number">Contact number:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="contactNo"
                                    id="contact-number"
                                    placeholder="09xx xxx xxxx"
                                    value={formData.contactNo}
                                    onChange={handleForm}
                                    required
                                />
                                <div className="contactNo-error"></div>
                            </Form.Group>
                        ) }
                        
                        {/* Birthday | Sex | Contact Ends */}

                        {/* Address Fields */}
                        { formData.birthday.length !== 0 &&
                          formData.gender.length !== 0 &&
                          formData.contactNo.length !== 0 && (
                            <AddressFields formData={formData} handleForm={handleForm} />
                        ) }
                        
                        {/* Login Info Starts */}
                        { formData.address.region.length !== 0 &&
                          formData.address.province.length !== 0 &&
                          formData.address.city.length !== 0 &&
                          formData.address.barangay.length !== 0 && (
                            <Form.Group className="signup-section login">
                                <Form.Label htmlFor="signup-username">Username:</Form.Label>
                                <Form.Control type="text"
                                    name="username"
                                    id="signup-username"
                                    placeholder="unique & 10 characters max"
                                    onChange={handleForm}
                                    required
                                />
                                <div className="username-error"></div>
                                <Form.Label htmlFor="signup-email">Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    id="signup-email"
                                    onChange={handleForm}
                                    required
                                />
                                <div className="email-error"></div>
                                <Form.Label htmlFor="signup-password">Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="signup-password"
                                    name="password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    onChange={handleForm}
                                    required
                                />
                                <div className="password-error"></div>
                                <Form.Label htmlFor="confirmPassword">Confirm Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    onChange={handleForm}
                                    required
                                />
                                <div className="confirmPassword-error"></div>
                            </Form.Group>
                          )
                        }
                        {/* Login Info Ends */}
                        
                        

                        {/* Signup Button */}
                        { formData.username.length !== 0 &&
                          formData.email.length !== 0 &&
                          formData.password.length !== 0 &&
                          formData.confirmPassword.length !== 0 &&
                          <Button type="submit" style={{display: 'inline-block', float: 'right'}}>Signup</Button>
                        }

                        {
                            formData.firstName.length !== 0 &&
                            <Button
                                onClick={() => setFormData(initialFormState)}
                                style={{
                                    backgroundColor: 'white',
                                    display: 'inline-block',
                                    marginRight: '10px',
                                    float: 'right',
                                    marginBottom: '20px'
                                }}
                            >
                            Cancel
                            </Button>
                        }
                        <br /><br />
                    </Form>
                </div>
                {/* FORM ENDS */}
            </div>
        </div>
        </>
    );
}
 
export default Signup;