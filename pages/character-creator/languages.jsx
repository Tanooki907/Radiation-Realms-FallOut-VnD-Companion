import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../../config/session';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import ResponsiveImage from '../../components/ResponsiveImage'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function SelectLanguages(props) {
    const [checkboxes, setCheckboxes] = useState([]);
  useEffect(() => {
    const selectedBackground = sessionStorage.getItem('selectedBackground');
    // Define the available languages
    const allLanguages = ["Arabic", "Binary", "English", "French", "German", "Italian", "Japanese", "Mandarin", "Morse Code", "Russian", "Sign Language", "Tribal"];

    // Get the character's INT attribute from sessionStorage
    const characterINT = parseInt(sessionStorage.getItem('INT')) || 0;

    // Exclude languages based on character's INT attribute
    let availableLanguages = [...allLanguages]; // Create a copy of allLanguages
    if (characterINT <= 5) {
      // Exclude certain languages for INT 5 or lower
      const excludedLanguages = ["Binary", "Morse Code", "Sign Language"];
      availableLanguages = availableLanguages.filter(lang => !excludedLanguages.includes(lang));
    }

    // Add event listener to restrict the number of checkboxes that can be checked
    const handleCheckboxChange = (event) => {
        const checkedCount = Array.from(document.querySelectorAll('input[name="selectedLanguages"]:checked')).length;
        const maxAllowed = getMaxAllowed(characterINT);
        if (selectedBackground == 'Supervisor') {
          maxAllowed += 1;
        }
        if (checkedCount > maxAllowed) {
          event.target.checked = false;
        }
      };
    
      const getMaxAllowed = (int) => {
        switch (int) {
          case 6:
            return 2;
          case 7:
            return 2;
          case 8:
            return 3;
          case 9:
            return 3;
          case 10:
            return 4;
          case 11:
            return 4;
          case 12:
            return 4;
          default:
            return 1;
        }
      };

    const checkboxes = availableLanguages.map(lang => (
      <div key={lang}>
        <input type="checkbox" name="selectedLanguages" value={lang} id={lang.toLowerCase()} onChange={handleCheckboxChange} />
        <label htmlFor={lang.toLowerCase()}>{lang}</label>
        <br />
      </div>
    ));

    setCheckboxes(checkboxes);

    // Add form submission event listener to save selected languages to sessionStorage
    const handleFormSubmit = (event) => {
      event.preventDefault(); // Prevent the form from submitting normally

      const checkedCount = Array.from(document.querySelectorAll('input[name="selectedLanguages"]:checked')).length;
      const maxAllowed = getMaxAllowed(characterINT);

      if (checkedCount < maxAllowed){
        alert(`You may select ${maxAllowed} languages. Please select ${maxAllowed} languages before proceeding.`);
        return;
      }
      // Save the selected languages to sessionStorage
      const selectedLanguages = Array.from(document.querySelectorAll('input[name="selectedLanguages"]:checked'), input => input.value);
      sessionStorage.setItem('selectedLanguages', JSON.stringify(selectedLanguages));

      // Proceed to the next page or perform any other necessary action
      window.location.href = '/character-creator/skillsbg';
    };

    // Attach event listeners
    const form = document.getElementById('languagesForm');
    form.addEventListener('submit', handleFormSubmit);

    // Cleanup
    return () => {
      form.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return (
    <div>
      
      <Head>
        <title>Select Your Languages</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <main className={styles.main}>
      <form id="languagesForm">
        <fieldset>
          <legend>Select your languages:</legend>
          <div id="languageOptions">
            {checkboxes}
          </div>
        </fieldset>
        <br />
        <input type="submit" value="Save and Proceed" />
      </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://fallout.fandom.com/wiki/Nuka-Cola"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
          <ResponsiveImage imageUrl="/PoweredByNuka.png" altText="Powered by Nuka Cola" />
          </span>
        </a>
      </footer>
    </div>
  );
} // 