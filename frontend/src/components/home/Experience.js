import { useState, useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { AllContext } from "../../context/AllContext";

const Experience = () => {
  useFetch(`${process.env.REACT_APP_API_URL}/experiences`, 'SET_EXPERIENCE');
  const { experiences } = useContext(AllContext);
  const [explore, setExplore] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');

  let userExperiences;
  if (experiences) {
    userExperiences = experiences.userExperiences;
  }

  useEffect(() => {
    setExplore(document.querySelector('#explore'));
    setExperience(document.querySelector('#experience'));
    setAbout(document.querySelector('#about'));
  }, []);

  const handleToggleCollapse = (index) => {
    setExpandedReviews((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const [expandedReviews, setExpandedReviews] = useState([]);

  let usernames;
  let messages;
  let destinations;
  let packageDurations;
  let travelPlans;
  let dates;
  let ratings;
  let comments;
  let userReviews;

  if (experiences && !experiences.message) {
    
    usernames = userExperiences.map((userExperience) => userExperience.username);
    messages = userExperiences.map((userExperience) => userExperience.message);
    destinations = userExperiences.map((userExperience) => userExperience.destination);
    packageDurations = userExperiences.map((userExperience) => userExperience.packageDuration);
    travelPlans = userExperiences.map((userExperience) => userExperience.travelPlan);
    dates = userExperiences.map((userExperience) => userExperience.date);
    ratings = userExperiences.map((userExperience) => userExperience.rating);

    comments = messages.map((message, i) => {
      return (
        <p
          key={i}
          className="comment"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: expandedReviews[i] ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {message}
        </p>
      );
    });

    userReviews = usernames.map((username, i) => {
      const comment = comments[i];
      const destination = destinations[i];
      const packageDuration = packageDurations[i];
      const travelPlan = travelPlans[i];
      const date = dates[i];
      const rating = ratings[i];

      return (
        <div key={i} className="experience experience-loop">
          <div className="row head">
            <div className="col name">
              <p>{username}</p>
            </div>
            <div className="col rating">
              {rating === '5 Stars' && <img src="/images/5stars.svg" alt="5 stars" />}
              {rating === '4 Stars' && <img src="/images/4stars.svg" alt="4 stars" />}
              {rating === '3 Stars' && <img src="/images/3stars.svg" alt="3 stars" />}
              {rating === '2 Stars' && <img src="/images/2stars.svg" alt="2 stars" />}
              {rating === '1 Star' && <img src="/images/1star.svg" alt="1 star" />}
            </div>
          </div>
          <div className="body">
            <p className="package">{destination} | {travelPlan} | {packageDuration}</p>
            <p className="date">{date}</p>
            <div className="row">
              <div>
                <div id="summary">
                  {comment}
                  {expandedReviews[i] ? (
                    <span className="collapsed pointer" style={{fontWeight: '600', color: 'blue'}} onClick={() => handleToggleCollapse(i)}>
                      Show less
                    </span>
                  ) : (
                    <span className="collapsed pointer" style={{fontWeight: '600', color: 'blue'}} onClick={() => handleToggleCollapse(i)}>
                      ... Read more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div id="experience" className="row d-none">
      {/* Toggles Start */}
      <div className="row bottom-btns d-none d-md-flex">
        <div
          className="explore-btn inactive"
          onClick={() => {
            explore.classList.remove('d-none');
            explore.scrollIntoView({ behavior: 'smooth' });
            experience.classList.add('d-none');
            about.classList.add('d-none');
          }}
        >
          <h1 className="row">
            <img id="explore-toggle-img" src="/images/explore-white.svg" alt="explore" />
            Explore
          </h1>
        </div>
        <div className="experience-btn active">
          <h1 className="row">
            <img id="experience-toggle-img" src="/images/experience.svg" alt="experience" />
            Experience
          </h1>
        </div>
        <div
          className="about-btn inactive"
          onClick={() => {
            about.classList.remove('d-none');
            about.scrollIntoView({ behavior: 'smooth' });
            experience.classList.add('d-none');
            explore.classList.add('d-none');
          }}
        >
          <h1 className="row">
            <img id="about-toggle-img" src="/images/about-white.svg" alt="about" />
            About
          </h1>
        </div>
      </div>
      {/* Toggles End */}

      {/* == Title */}
      <h1 className="row d-md-none">
        <img src="/images/experience.svg" alt="experience" />
        Experience
      </h1>
      <p>Learn from Our Travel Buddies' Insights!</p>

      <div className="row justify-content-center experience-loop-container">
        {!experiences ? (
          <img style={{ width: '100px' }} src="/images/loading.gif" alt="loading" />
        ) : experiences.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'black' }}>No User Experiences yet.</h2>
          </div>
        ) : (
          <>
            {userReviews}
          </>
        )}
      </div>
    </div>
  );
};

export default Experience;
