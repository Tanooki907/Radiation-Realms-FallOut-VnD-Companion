import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../../config/session';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';

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

export default function BackgroundSelection(props) {
  const [selectedRace, setSelectedRace] = useState('');

  const saveBackgroundData = (event) => {
    event.preventDefault();
    const selectedBackground = document.querySelector('input[name="background"]:checked').value;
    sessionStorage.setItem('selectedBackground', selectedBackground);
    if (selectedBackground == 'OVERLORD') {
      sessionStorage.setItem('size', 'Huge');
    }
    window.location.href = '/character-creator/special';
  };

  useEffect(() => {
    const storedSelectedRace = sessionStorage.getItem('selectedRace');
    if (storedSelectedRace) {
      setSelectedRace(storedSelectedRace);
    }
  }, []);

  let backgroundOptions;
  if (selectedRace === 'Human') {
    backgroundOptions = (
      <div>
        <input type="radio" id="background1" name="background" value="Isolationist" required/>
        <label for="background1">Isolationist</label><br />
        <input type="radio" id="background2" name="background" value="Wanderer" required/>
        <label for="background2">Wanderer</label><br />
        <input type="radio" id="background3" name="background" value="Wastelander" required/>
        <label for="background3">Wastelander</label><br />
      </div>
    );
  } else if (selectedRace === 'Ghoul') {
    // Populate background options for Ghoul
    backgroundOptions = (
        <div>
        <input type="radio" id="background4" name="background" value="Old World Blues" required/>
        <label for="background4">Old World Blues</label><br />
        <input type="radio" id="background5" name="background" value="Rigor Mortis" required/>
        <label for="background5">Rigor Mortis</label><br />
        <input type="radio" id="background6" name="background" value="You're RADical" required/>
        <label for="background6">You&apos;re RADical</label><br></br>
        </div>
    );
  } else if (selectedRace === 'Synth') {
    // Populate background options for Synth
    backgroundOptions = (
        <div>
        <input type="radio" id="background7" name="background" value="I Am Human" required/>
        <label for="background7">I Am Human</label><br/>
        <input type="radio" id="background8" name="background" value="I Am Superior" required/>
        <label for="background8">I Am Superior</label><br/>
        <input type="radio" id="background9" name="background" value="I Am War" required/>
        <label for="background9">I Am War</label><br></br>
        </div>
        );
  } else if (selectedRace === 'Eastern Super Mutant') {
    // Populate background options for Eastern Super Mutant
    backgroundOptions = (
        <div>
        <input type="radio" id="background10" name="background" value="Me Friend" required/>
        <label for="background10">Me Friend</label><br/>
        <input type="radio" id="background11" name="background" value="OVERLORD" required/>
        <label for="background11">OVERLORD</label><br/>
        <input type="radio" id="background12" name="background" value="Pain Good" required/>
        <label for="background12">Pain Good</label><br></br>
        </div>
        );
  } else if (selectedRace === 'Western Super Mutant') {
    // Populate background options for Western Super Mutant
    backgroundOptions = (
        <div>
        <input type="radio" id="background13" name="background" value="The NightKin" required/>
        <label for="background13">The NightKin</label><br/>
        <input type="radio" id="background14" name="background" value="The Scholar" required/>
        <label for="background14">The Scholar</label><br/>
        <input type="radio" id="background15" name="background" value="The Soldier" required/>
        <label for="background15">The Soldier</label><br></br>
        </div>
        );
  } else if (selectedRace === 'Mole Miner') {
    // Populate background options for Mole Miner
    backgroundOptions = (
        <div>
        <input type="radio" id="background16" name="background" value="Juggernaut" required/>
        <label for="background16">Juggernaut</label><br/>
        <input type="radio" id="background17" name="background" value="Purveyor" required/>
        <label for="background17">Purveyor</label><br/>
        <input type="radio" id="background18" name="background" value="Supervisor" required/>
        <label for="background18">Supervisor</label><br></br>
        </div>
        );
  } else if (selectedRace === 'Robot') {
    backgroundOptions = (
        <div>
        <input type="radio" id="background19" name="background" value="Domestic Personality Core" required/>
        <label for="background19">Domestic Personality Core</label><br/>
        <input type="radio" id="background20" name="background" value="Military Personality Core" required/>
        <label for="background20">Military Personality Core</label><br/>
        <input type="radio" id="background21" name="background" value="Specialist Personality Core" required/>
        <label for="background21">Specialist Personality Core</label><br></br>
        </div>
        );
  } else if (selectedRace === 'Intelligent Deathclaw') {
    // Populate background options for Intelligent Deathclaw
    backgroundOptions = (
        <div>
        <input type="radio" id="background22" name="background" value="Gatorclaw" required/>
        <label for="background22">Gatorclaw</label><br/>
        <input type="radio" id="background23" name="background" value="Hairy Deathclaw" required/>
        <label for="background23">Hairy Deathclaw</label><br/>
        <input type="radio" id="background24" name="background" value="Jackson Chameleon" required/>
        <label for="background24">Jackson Chameleon</label><br></br>
        </div>
        );
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Select Your Background</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <h2>Select Your Background:</h2>
      <form onSubmit={saveBackgroundData}>
        <div id="backgroundOptions">
          {backgroundOptions}
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>

      <footer className={styles.footer}>
        <a
          href="https://fallout.fandom.com/wiki/Nuka-Cola"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src="/PoweredByNuka.png" alt="Powered by Nuka Cola" width={576} height={288} />
          </span>
        </a>
      </footer>
    </div>
  );
}