import React, { useEffect } from 'react';
import MobileNav from "./MobileNav";
import SideNav from "./SideNav";
import MainNavbar from './MainNavbar';

const Navbar = () => {
  
  const updateNavColor = (entries) => {
    const [entry] = entries;
    const nav = document.getElementById('navbar');
    const nav2 = document.getElementById('navbar2');

    if (!entry.isIntersecting) {
      nav.classList.add("fixed-top-transparent-scrolled");
      nav.classList.remove("fixed-top-transparent");
    } else {
      nav.classList.add("fixed-top-transparent");
      nav.classList.remove("fixed-top-transparent-scrolled");
    }

    if (!entry.isIntersecting) {
      nav2.classList.add("fixed-top-transparent-scrolled");
      nav2.classList.remove("fixed-top-transparent");
    } else {
      nav2.classList.add("fixed-top-transparent");
      nav2.classList.remove("fixed-top-transparent-scrolled");
    }
  };

  useEffect(() => {
    const nav = document.getElementById('navbar');
    const nav2 = document.getElementById('navbar2');

    nav.classList.remove("fixed-top-transparent-scrolled");
    nav.classList.add("fixed-top-transparent");

    nav2.classList.remove("fixed-top-transparent-scrolled");
    nav2.classList.add("fixed-top-transparent");

    const scrollOffsetIndicator = document.querySelector('.scrollOffsetIndicator');

    if (typeof IntersectionObserver !== 'undefined' && scrollOffsetIndicator !== null) {
      const headerObserver = new IntersectionObserver(updateNavColor, {
        root: null,
        threshold: 0,
        rootMargin: '-50px',
      });

      headerObserver.observe(scrollOffsetIndicator);

      return () => {
        headerObserver.unobserve(scrollOffsetIndicator);
      };
    }
  }, []);

  return (
    <>
      <MobileNav />
      <SideNav />
      <MainNavbar />
    </>
  );
};

export default Navbar;
