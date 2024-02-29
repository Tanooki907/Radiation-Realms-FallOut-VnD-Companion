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

export default function PointBuySystem(props) {
const [SPECIALPoints, setSPECIALPoints] = useState(0);
const [prevValues, setPrevValues] = useState({
STR: 1,
PER: 1,
END: 1,
CHA: 1,
INT: 1,
AGI: 1,
LCK: 1
});
const [allocatedPoints, setAllocatedPoints] = useState(0);
const [init, setInit] = useState(false);
const updatePoints = (event) => {
var selectedRace = sessionStorage.getItem('selectedRace');
var selectedBackground = sessionStorage.getItem('selectedBackground');
var STRInput = document.getElementById('strength');
var PERInput = document.getElementById('perception');
var ENDInput = document.getElementById('endurance');
var CHAInput = document.getElementById('charisma');
var INTInput = document.getElementById('intelligence');
var AGIInput = document.getElementById('agility');
var LCKInput = document.getElementById('luck');
if (SPECIALPoints == 0) {
  if (selectedRace === 'Human') {
    if (selectedBackground === 'Wanderer') {
        setSPECIALPoints(35);
    } else {
        setSPECIALPoints(33);
    }
} else if (selectedRace === 'Ghoul') {
    if (selectedBackground === 'Old World Blues') {
        setSPECIALPoints(30);
    } else {
        setSPECIALPoints(28);
    }
  STRInput.max = 8;
  PERInput.min = 2;
  ENDInput.max = 8;
  if (selectedBackground === "You're RADical") {
    CHAInput.min = 2;
  }
  INTInput.min = 3;
  INTInput.max = 12;
  LCKInput.min = 5;
  LCKInput.max = 12;
} else if (selectedRace === 'Synth') {
    if (selectedBackground === 'I Am Superior') {
        setSPECIALPoints(36);
    } else {
        setSPECIALPoints(33);
    }
} else if (selectedRace === 'Eastern Super Mutant') {
    if (selectedBackground === 'OVERLORD') {
      setSPECIALPoints(32);
      STRInput.min = 7;
      ENDInput.min = 6;
    } else {
      setSPECIALPoints(30);
      STRInput.min = 6;
      ENDInput.min = 5;
    }
    STRInput.max = 15;
    ENDInput.max = 12;
    CHAInput.max = 5;
    INTInput.max = 7;
} else if (selectedRace === 'Western Super Mutant') {
  setSPECIALPoints(30);
  STRInput.min = 5;
  STRInput.max = 13;
  if (selectedBackground === 'The Soldier') {
    ENDInput.min = 6;
  } else {
    ENDInput.min = 5;
  }
  ENDInput.max = 11;
  CHAInput.max = 7;
  if (selectedBackground === 'The Scholar') {
    INTInput.min = 3;
  } else {
    INTInput.min = 2;
  }
  INTInput.max = 11;
  if (selectedBackground === 'The Nightkin') {
    AGIInput.min = 2;
  }
} else if (selectedRace === 'Mole Miner') {
  STRInput.min = 3;
  STRInput.max = 12;
  ENDInput.max = 8;
  if (selectedBackground === 'Purveyor') {
    setSPECIALPoints(32);
    CHAInput.min = 2;
  }else if (selectedBackground === 'Supervisor') {
    setSPECIALPoints(32);
    INTInput.min = 2;
  } else {
    setSPECIALPoints(31);
  }
  LCKInput.min = 3;
} else if (selectedRace === 'Intelligent Deathclaw') {
  setSPECIALPoints(27);
  STRInput.min = 8;
  STRInput.max = 16;
  PERInput.min = 3;
  PERInput.max = 12;
  ENDInput.min = 5;
  ENDInput.max = 15;
  CHAInput.max = 5;
  INTInput.min = 4;
  AGIInput.min = 3;
  AGIInput.max = 12;
}

  sessionStorage.setItem("STR", STRInput.min || 0);
sessionStorage.setItem("PER", PERInput.min || 0);
sessionStorage.setItem("END", ENDInput.min || 0);
sessionStorage.setItem("CHA", CHAInput.min || 0);
sessionStorage.setItem("INT", INTInput.min || 0);
sessionStorage.setItem("AGI", AGIInput.min || 0);
sessionStorage.setItem("LCK", LCKInput.min || 0);

setPrevValues({
  STR: parseInt(STRInput.min),
  PER: parseInt(PERInput.min),
  END: parseInt(ENDInput.min),
  CHA: parseInt(CHAInput.min),
  INT: parseInt(INTInput.min),
  AGI: parseInt(AGIInput.min),
  LCK: parseInt(LCKInput.min)
});



}

  var STR = parseInt(document.getElementById('strength').value);
  var PER = parseInt(document.getElementById('perception').value);
  var END = parseInt(document.getElementById('endurance').value);
  var CHA = parseInt(document.getElementById('charisma').value);
  var INT = parseInt(document.getElementById('intelligence').value);
  var AGI = parseInt(document.getElementById('agility').value);
  var LCK = parseInt(document.getElementById('luck').value);


  setAllocatedPoints((STR-STRInput.min) + (PER-PERInput.min) + (END-ENDInput.min) + (CHA-CHAInput.min) +(INT-INTInput.min) + (AGI-AGIInput.min) + (LCK-LCKInput.min));

  if (
    allocatedPoints > SPECIALPoints ||
    (allocatedPoints === SPECIALPoints && allocatedPoints !== 0)
  ) {
    alert(
      "You have allocated the maximum allowed amount. If you wish to reassign your SPECIAL points, please reload the page."
    );
    const lastAlteredInput = document.getElementById(event.target.id);
    lastAlteredInput.value = parseInt(lastAlteredInput.value - 1);

    // Revert to the previous allocation
    setAllocatedPoints(SPECIALPoints);

    // Update the remaining points display

    // Update the sessionStorage values to the previous allocation
    sessionStorage.setItem("STR", prevValues.STR || 0);
    sessionStorage.setItem("PER", prevValues.PER || 0);
    sessionStorage.setItem("END", prevValues.END || 0);
    sessionStorage.setItem("CHA", prevValues.CHA || 0);
    sessionStorage.setItem("INT", prevValues.INT || 0);
    sessionStorage.setItem("AGI", prevValues.AGI || 0);
    sessionStorage.setItem("LCK", prevValues.LCK || 0);
  } else if (init == true) {
    // Store the current values as previous values for the next allocation check
    setPrevValues({
      STR: parseInt(STRInput.value),
      PER: parseInt(PERInput.value),
      END: parseInt(ENDInput.value),
      CHA: parseInt(CHAInput.value),
      INT: parseInt(INTInput.value),
      AGI: parseInt(AGIInput.value),
      LCK: parseInt(LCKInput.value)
    });

    sessionStorage.setItem("STR", STR || 0);
    sessionStorage.setItem("PER", PER || 0);
    sessionStorage.setItem("END", END || 0);
    sessionStorage.setItem("CHA", CHA || 0);
    sessionStorage.setItem("INT", INT || 0);
    sessionStorage.setItem("AGI", AGI || 0);
    sessionStorage.setItem("LCK", LCK || 0);
  } else {
    setInit(true);
  }
};
const goToNextPage = () => {
// Redirect to the next page
if (allocatedPoints === SPECIALPoints){
  window.location.href = "/character-creator/languages";
} else {
  alert('Please spend all of your SPECIAL points before proceeding.')
}
};

useEffect(() => {
// Update the content of the <p> element with the id 'remainingPoints'
document.getElementById('remainingPoints').innerText = "Points remaining: " + (SPECIALPoints - allocatedPoints);
}, [SPECIALPoints, allocatedPoints]);

return (
<div className={styles.container}>
        <Head>
    <title>What Makes You SPECIAL?</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

  <h2>Point Buy System</h2>
  <form>
    <label htmlFor="strength">Strength:</label>
    <input type="number" id="strength" name="strength" min="1" max="10" value={prevValues.STR} onChange={updatePoints}></input><br></br>

    <label htmlFor="perception">Perception:</label>
    <input type="number" id="perception" name="perception" min="1" max="10" value={prevValues.PER} onChange={updatePoints}></input><br></br>

    <label htmlFor="endurance">Endurance:</label>
    <input type="number" id="endurance" name="endurance" min="1" max="10" value={prevValues.END} onChange={updatePoints}></input><br></br>

    <label htmlFor="charisma">Charisma:</label>
    <input type="number" id="charisma" name="charisma" min="1" max="10" value={prevValues.CHA} onChange={updatePoints}></input><br></br>

    <label htmlFor="intelligence">Intelligence:</label>
    <input type="number" id="intelligence" name="intelligence" min="1" max="10" value={prevValues.INT} onChange={updatePoints}></input><br></br>

    <label htmlFor="agility">Agility:</label>
    <input type="number" id="agility" name="agility" min="1" max="10" value={prevValues.AGI} onChange={updatePoints}></input><br></br>

    <label htmlFor="luck">Luck:</label>
    <input type="number" id="luck" name="luck" min="1" max="10" value={prevValues.LCK} onChange={updatePoints}></input><br></br>

    <p id="remainingPoints"></p>

    <button type="button" onClick={goToNextPage}>Proceed to Next Page</button>
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
} //