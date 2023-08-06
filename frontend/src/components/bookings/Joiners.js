import { Form } from "react-bootstrap";


const JoinersWithGuests = ({
    formData,
    handleJustme,
    buddiesCount,
    handleForm,
    handleAddBuddy,
    handleRemoveBuddy
}) => {
    return ( 
        <div className="section join">
            <Form.Label className="section-title">Who else will join?</Form.Label>
            <div className="selection">
                <Form.Label htmlFor="justme" className="join">
                    <input
                        className={`form-check-input justme-option ${formData.join === 'justme' ? 'active' : ''}`}
                        id="justme"
                        name="join"
                        type="radio"
                        onClick={(e) => handleJustme(e)}
                    />
                    <span className="radio"></span>
                    Just Me!
                </Form.Label>
                <Form.Label htmlFor="more" className="join">
                    <input
                        className={`form-check-input more-option ${formData.join === 'more' ? 'active' : ''}`}
                        id="more"
                        name="join"
                        type="radio"
                    />
                    <span className="radio"></span>
                    Me and:
                    <span className="slot">
                        { buddiesCount }
                    </span>
                </Form.Label>
            </div>
            <fieldset>
                <legend>Who are they?</legend>
                {formData.buddies.map((buddy, index) => (
                    <div key={index} className="joiner">
                        <div className="name">
                            <Form.Label htmlFor={`fullName-${index}`}>Fullname:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your first buddy's name"
                                id={`fullName-${index}`}
                                name='fullName'
                                value={buddy.fullName}
                                onChange={(e) => handleForm(e, index)}
                            />
                        </div>
                        <div className="age">
                            <Form.Label htmlFor={`age-${index}`}>Age:</Form.Label>
                            <Form.Control
                                type="number"
                                id={`age-${index}`}
                                name='age'
                                value={buddy.age}
                                onChange={(e) => handleForm(e, index)}
                            />
                        </div>
                        <div className="sex">
                            <Form.Label htmlFor={`sex-${index}`}>Sex:</Form.Label>
                            <select
                                id={`sex-${index}`}
                                name='sex'
                                value={buddy.sex}
                                onChange={(e) => handleForm(e, index)}
                            >
                                <option value="Select">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        {formData.buddies.length === 1 && (
                            <div className="add one-buddy" onClick={handleAddBuddy}>
                                <img src="/images/more.svg" alt="add more" />
                            </div>
                        )}
                        {formData.buddies.length > 1 && (
                            <>
                            <div className="remove" onClick={() => handleRemoveBuddy(index)}>
                                <img src="/images/remove.svg" alt="remove" />
                            </div>
                            <div className="add" onClick={handleAddBuddy}>
                                <img src="/images/more.svg" alt="add more" />
                            </div>
                            </>
                        )}
                    </div>
                ))}
            </fieldset>
        </div>
    );
}

const JoinersWithFriends = ({
    formData,
    buddiesCount,
    handleForm,
    handleAddBuddy,
    handleRemoveBuddy
}) => {
    return ( 
        <>
        <div className="section join">
            <Form.Label className="section-title">
                Who else will join?
                <span className="slot">
                    { buddiesCount === 0 ? ('Add Friends') : (
                        buddiesCount === 1 ? (`${buddiesCount} Friend Only`) : (
                            `${buddiesCount} Friends`
                        )
                    ) }
                </span>
            </Form.Label>
            <fieldset>
                {formData.buddies.map((buddy, index) => (
                    <div key={index} className="joiner">
                        <div className="name">
                            <Form.Label htmlFor={`fullName-${index}`}>Fullname:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your first buddy's name"
                                id={`fullName-${index}`}
                                name='fullName'
                                value={buddy.fullName}
                                onChange={(e) => handleForm(e, index)}
                            />
                        </div>
                        <div className="age">
                            <Form.Label htmlFor={`age-${index}`}>Age:</Form.Label>
                            <Form.Control
                                type="number"
                                id={`age-${index}`}
                                name='age'
                                value={buddy.age}
                                onChange={(e) => handleForm(e, index)}
                            />
                        </div>
                        <div className="sex">
                            <Form.Label htmlFor={`sex-${index}`}>Sex:</Form.Label>
                            <select
                                id={`sex-${index}`}
                                name='sex'
                                value={buddy.sex}
                                onChange={(e) => handleForm(e, index)}
                            >
                                <option value="Select">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        {formData.buddies.length === 1 && (
                            <div className="add one-buddy" onClick={handleAddBuddy}>
                                <img src="/images/more.svg" alt="add more" />
                            </div>
                        )}
                        {formData.buddies.length > 1 && (
                            <>
                            <div className="remove" onClick={() => handleRemoveBuddy(index)}>
                                <img src="/images/remove.svg" alt="remove" />
                            </div>
                            <div className="add" onClick={handleAddBuddy}>
                                <img src="/images/more.svg" alt="add more" />
                            </div>
                            </>
                        )}
                    </div>
                ))}
            </fieldset>
        </div>
        </>
    );
}
 
export {JoinersWithGuests, JoinersWithFriends};