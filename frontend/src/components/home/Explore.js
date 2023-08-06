import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Explore = () => {
  const [explore, setExplore] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Limit the number of explore-images per page

  useEffect(() => {
    setExplore(document.querySelector('#explore'));
    setExperience(document.querySelector('#experience'));
    setAbout(document.querySelector('#about'));
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const getTotalPages = () => {
    return Math.ceil(exploreImages.length / itemsPerPage);
  };

  const exploreImages = [
    { name: "Balabac Island", src: "/images/balabac7.webp" },
    { name: "Bohol", src: "/images/bohol7.webp" },
    { name: "Cebu", src: "/images/cebu7.webp" },
    { name: "Coron", src: "/images/coron7.webp" },
    { name: "El Nido", src: "/images/elnido7.webp" },
    { name: "Port Baron", src: "/images/portbaron7.webp" },
    { name: "Puerto Princesa", src: "/images/palawan5.webp" },
    { name: "Siargao", src: "/images/siargao7.webp" },
  ];

  // Calculate the slice for current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentImages = exploreImages.slice(firstIndex, lastIndex);

  return (
    <div id="explore" className="row">
      {/* Toggles Start */}
      <div className="row bottom-btns d-none d-md-flex">
        <div className="explore-btn active">
          <h1 className="row"><img id="explore-toggle-img" src="/images/explore.svg" alt="explore" />Explore</h1>
        </div>
        <div
          className="experience-btn inactive"
          onClick={() => {
            experience.classList.remove('d-none');
            experience.scrollIntoView({ behavior: 'smooth' });
            explore.classList.add('d-none');
            about.classList.add('d-none');
          }}
        >
          <h1 className="row"><img id="experience-toggle-img" src="/images/experience-white.svg" alt="experience" />Experience</h1>
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
          <h1 className="row"><img id="about-toggle-img" src="/images/about-white.svg" alt="about" />About</h1>
        </div>
      </div>
      {/* Toggles End */}

      {/* == Title */}
      <h1 className="row d-md-none"><img src="/images/explore.svg" alt="explore" />Explore</h1>
      <p>Tour Highlights That Can&nbsp;Become Yours Too!</p>
      {/* Pagination Starts */}
      <div className="row justify-content-center explore-loop-container">
        {currentImages.map((image, index) => (
          <div className="explore-images" key={index}>
            <p className="name">{image.name}</p>
            <img src={image.src} alt={image.name} />
          </div>
        ))}
      </div>
      <div className="page-toggle">
        <button
          className="btn btn-primary mx-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={handleNextPage}
          disabled={currentPage === getTotalPages()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Explore;
