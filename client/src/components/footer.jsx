import React, { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, [])

  return (
    <footer className="dark-color-text-unhover">
      <div className="container">
        <div className="row">
          <div className="col text-center py-3">
            Copyright &copy; {year} developerayuva | Built by <div>Ayush Vatsa</div>
            <span>This is the original website of Deliv</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;