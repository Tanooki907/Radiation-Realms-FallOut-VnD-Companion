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
  const [maxAllowed, setMaxAllowed] = useState(0);

  useEffect(() => {
    const selectedBackground = sessionStorage.getItem('selectedBackground');
    const allLanguages = ["Arabic", "Binary", "English", "French", "German", "Italian", "Japanese", "Mandarin", "Morse Code", "Russian", "Sign Language", "Tribal"];
    const characterINT = parseInt(sessionStorage.getItem('INT')) || 0;
    let availableLanguages = [...allLanguages];

    if (characterINT <= 5) {
      const excludedLanguages = ["Binary", "Morse Code", "Sign Language"];
      availableLanguages = availableLanguages.filter(lang => !excludedLanguages.includes(lang));
    }

    const getMaxAllowed = (int) => {
      switch (int) {
        case 6:
        case 7:
          return 2;
        case 8:
        case 9:
          return 3;
        case 10:
        case 11:
        case 12:
          return 4;
        default:
          return 1;
      }
    };

    let max = selectedBackground === 'Supervisor' ? getMaxAllowed(characterINT + 1) : getMaxAllowed(characterINT);
    setMaxAllowed(max);

    const handleCheckboxChange = (event) => {
      const checkedCount = Array.from(document.querySelectorAll('input[name="selectedLanguages"]:checked')).length;
      if (checkedCount > max) {
        event.target.checked = false;
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

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const checkedCount = Array.from(document.querySelectorAll('input[name="selectedLanguages"]:checked')).length;

      if (checkedCount < max){
        alert(`You may select ${max} languages. Please select ${max} languages before proceeding.`);
        return;
      }

      const selectedLanguages = Array.from(document.querySelectorAll('input[name="selectedLanguages"]:checked'), input => input.value);
      sessionStorage.setItem('selectedLanguages', JSON.stringify(selectedLanguages));
      window.location.href = '/character-creator/skillsbg';
    };

    const form = document.getElementById('languagesForm');
    form.addEventListener('submit', handleFormSubmit);

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
          <legend>Select {maxAllowed} languages:</legend>
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