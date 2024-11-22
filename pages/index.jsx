import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/header';
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../config/session';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import ResponsiveImage from '../components/ResponsiveImage'

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

  function HomePage(props) {
    const [quote, setQuote] = useState({ content: '', author: '' });
  
    useEffect(() => {
      async function fetchQuote() {
        try {
          const response = await fetch('https://johndturn-quotableapiproxy.web.val.run/quotes/random?tags=age|change|conservative|courage|freedom|future|history|honor|opportunity|pain|perseverance|politics|power-quotes|science|society|technology|truth|virtue|war|work');
          if (response.ok) {
            const data = await response.json();
            setQuote({ content: data[0].content, author: data[0].author });
          } else {
            console.error('Failed to fetch quote');
          }
        } catch (error) {
          console.error('Error fetching quote:', error);
        }
      }
  
      fetchQuote();
    }, []);

  return (
    <div>
                <Head>
    <title>Radiation Realms - The Fallout: Vaults and Deathclaws Companion</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>

  <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <h1>Radiation Realms - The Fallout: Vaults and Deathclaws Companion</h1>
      <p><i>{quote.content}</i> - {quote.author}</p><hr />

      <p>Hey there, Vault Dwellers and wasteland wanderers! Are you ready to take your Fallout: Vaults & Deathclaws experience to the next level? Introducing Radiation Realms: The ultimate companion for all your character creation and management needs. With Radiation Realms, you can kiss clutter goodbye and say hello to a seamless, user-friendly online app that puts the power of character creation and management right at your fingertips.</p>

      <p>Picture this: You log in to Radiation Realms and dive into the online character creator, where you can craft your very own unique wasteland hero or heroine. Choose your SPECIAL attributes, customize your skills, and even select your starting gear (available soon)—all with just a few clicks. But that&apos;s not all! Once your character is created, you can access and edit their character sheet anytime, anywhere. No more lugging around piles of paper or trying to decipher messy handwriting. Radiation Realms keeps all your character sheets neatly organized and easily accessible, so you can focus on what really matters—conquering the wasteland.</p>

      <p>And here&apos;s the best part: as you journey through the treacherous Fallout universe, you can update your character sheet on the fly. Found a new weapon? Acquired a powerful perk? No problem! With Radiation Realms, you can make changes to your character sheet, save your progress, and keep track of all those crucial numbers as you navigate the dangers of the wasteland. It&apos;s like having your own personal Vault-Tec assistant, minus the creepy experiments and questionable ethics.</p>

      <p>So, what are you waiting for? Join the Radiation Realms community and revolutionize the way you play Fallout: Vaults & Deathclaws. Say goodbye to the hassle of character management and hello to a smoother, more streamlined gaming experience. Get ready to unleash your inner wasteland legend with Radiation Realms—because in the world of Fallout, every number counts.</p>

      {props.isLoggedIn ? null : (
                <h2>Sign up with Vault-Tec, and create your wastelander today!</h2>
      )}

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
}

export default HomePage;