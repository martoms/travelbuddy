import { Accordion } from "react-bootstrap";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { UserStatus } from "./AdminModify";

const AdminRetrieveUsersMobile = () => {

    const { allUsers } = useContext(AllContext);
    
    if (allUsers) {
        

        const users = allUsers.map(user => {

            const {
                _id,
                username,
                firstName,
                lastName,
                email,
                contactNo,
                sex,
                gender,
                birthday,
                address: { region, province, city, barangay },
                bookings,
                isAdmin,
                signUpDate
            } = user

            const dateSignUp = new Date(signUpDate);
            const dateBirthday = new Date(birthday).getTime();
            const dateToday = Date.now()
            const age = Math.floor((dateToday - dateBirthday) / (1000 * 60 * 60 * 24 * 365.25))

            const options = {
                year: "numeric",
                month: "short",
                day: "numeric"
            };

            const formattedSignUpDate = dateSignUp.toLocaleString("en-US", options);

            return (
                <Accordion.Item key={_id} eventKey={_id}>
                    <Accordion.Header>
                        { `@${username} ${isAdmin ? '(admin)' : ''}` }
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="user-controls">
                            <UserStatus _id={_id} isAdmin={isAdmin} username={username} />
                        </div>
                        <hr />
                        <div className="user-details">
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Name: `}
                                </span>
                                { `${firstName} ${lastName}`}
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Age: `}
                                </span>
                                { age }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Sex: `}
                                </span>
                                { sex || gender }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Email: `}
                                </span>
                                { email }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Contact No: `}
                                </span>
                                { contactNo }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Address: `}
                                </span>
                                { `${region}, ${province}, ${city}, ${barangay}` }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Bookings: `}
                                </span>
                                {
                                    bookings.length === 0 ?
                                    'No bookings yet'
                                    :
                                    bookings.length
                                }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Member since: `}
                                </span>
                                { formattedSignUpDate }
                            </p>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            )

        })

        return ( 
            <Accordion className="d-lg-none">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        {`View All Users (${allUsers.length})`}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Accordion>
                            { users }
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}

const AdminRetrieveUsersMain = () => {

    const { allUsers } = useContext(AllContext);
    
    if (allUsers) {
        

        const users = allUsers.map(user => {

            const {
                _id,
                username,
                firstName,
                lastName,
                email,
                contactNo,
                sex,
                gender,
                birthday,
                address: { region, province, city, barangay },
                bookings,
                isAdmin,
                signUpDate
            } = user

            const dateSignUp = new Date(signUpDate);
            const dateBirthday = new Date(birthday).getTime();
            const dateToday = Date.now()
            const age = Math.floor((dateToday - dateBirthday) / (1000 * 60 * 60 * 24 * 365.25))

            const options = {
                year: "numeric",
                month: "short",
                day: "numeric"
            };

            const formattedSignUpDate = dateSignUp.toLocaleString("en-US", options);

            return (
                <Accordion.Item key={_id} eventKey={_id}>
                    <Accordion.Header className="admin-control-item">
                        { `@${username} ${isAdmin ? '(admin)' : ''}` }
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="user-controls">
                            <UserStatus _id={_id} isAdmin={isAdmin} username={username} />
                        </div>
                        <hr />
                        <div className="user-details">
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Name: `}
                                </span>
                                { `${firstName} ${lastName}`}
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Age: `}
                                </span>
                                { age }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Sex: `}
                                </span>
                                { sex || gender }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Email: `}
                                </span>
                                { email }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Contact No: `}
                                </span>
                                { contactNo }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Address: `}
                                </span>
                                { `${region}, ${province}, ${city}, ${barangay}` }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Bookings: `}
                                </span>
                                {
                                    bookings.length === 0 ?
                                    'No bookings yet'
                                    :
                                    bookings.length
                                }
                            </p>
                            <p style={{margin: '0'}}>
                                <span style={{fontWeight: '700'}}>
                                    {`Member since: `}
                                </span>
                                { formattedSignUpDate }
                            </p>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            )

        })

        return ( 
            <Accordion className="d-lg-none">
                { users }
            </Accordion>
        );
    }
}
 
export { AdminRetrieveUsersMobile, AdminRetrieveUsersMain };