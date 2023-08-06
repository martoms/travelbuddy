import { Form, Button } from "react-bootstrap";
import useHandleForm from "../../hooks/useHandleForm";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

const ChangePassword = () => {

    const initialFormState = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    };
    const { formData, handleForm, setFormData } = useHandleForm(initialFormState)
    const { changePassword } = useHandleSubmit(formData, initialFormState, setFormData) 
    const { user } = useContext(AllContext);

    let isAdmin;
    if (user) {
        isAdmin = user.isAdmin;
    };

    return (
        <Form onSubmit={(e) => changePassword(e, isAdmin)}>
            <Form.Label htmlFor="currentPassword">Current Password:</Form.Label>
            <Form.Control
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={handleForm}
                required
            />
            <div className="currentPassword-error"></div>

            <Form.Label htmlFor="newPassword">New Password:</Form.Label>
            <Form.Control
                type="password"
                id="newPassword"
                name="newPassword"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                value={formData.newPassword}
                onChange={handleForm}
                required
            />
            <div className="newPassword-error"></div>

            <Form.Label htmlFor="confirmNewPassword">Confirm New Password:</Form.Label>
            <Form.Control
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                onChange={handleForm}
                value={formData.confirmNewPassword}
                required
            />
            <div className="confirmNewPassword-error"></div>

            <Button
                onClick={() => {
                    setFormData(initialFormState)
                }}    
                style={{marginRight: '10px', backgroundColor: 'grey'}}
            >
                Cancel
            </Button>

            <Button type="submit">
                Submit
            </Button>
        </Form>
    );
}
 
export default ChangePassword;