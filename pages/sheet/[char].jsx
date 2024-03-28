import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../../config/session';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import ResponsiveImage from '../../components/ResponsiveImage'
import { useRouter } from 'next/router';

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

function UserSelectionSummary(props) {
  const router = useRouter();
  const [character, setCharacter] = useState(null);
  const [editedCharacter, setEditedCharacter] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (value !== ''){
      setEditedCharacter({ ...editedCharacter, [name]: value }); // Update the editableCharacter state with the new value
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send the updated character data to the server
    try {
      const res = await fetch("/api/char-update", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ id: character._id, charData: editedCharacter}),
      });
      if (res.status === 200) return window.location.reload();
    } catch (error) {
      console.error('Error saving edited character:', error);
    }
  };

  useEffect(() => {

    async function fetchCharacter() {

        try {
          const response = await fetch("/api/char-single", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({ charName: router.query.char, username: props.user.username }),
          });
          const data = await response.json();
          setCharacter(data[0]);
          setEditedCharacter(data[0]);
          console.log(editedCharacter);
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
    }

    fetchCharacter();
  }, []);

  useEffect(() => {

    if (character) {
      const name = character.name;
      if (character.picURL) {
        const picURL = character.picURL;
        document.getElementById('picURL').src = picURL;
      }
      const selectedRace = character.selectedRace;
      const selectedBackground = character.selectedBackground;
      const STR = editedCharacter.STR;
      const PER = editedCharacter.PER;
      const END = editedCharacter.END;
      const CHA = editedCharacter.CHA;
      const INT = editedCharacter.INT;
      const AGI = editedCharacter.AGI;
      const LCK = editedCharacter.LCK;
      const selectedLanguages = character.Languages;
      const skills = [
        'MeleeWpn', 'Throw', 'Unarm', 'Arch', 'BigGn', 'NRG', 'SmGn', 'Smith', 'Chem', 'Com', 'Doc', 'Engineer', 'Gunsmith', 'Charm', 'Dec', 'Ins', 'Int', 'Gam', 'Lore', 'Obs', 'Pilot', 'SoH', 'Sneak', 'Surviv'
      ];
      const AP = character.AP;
      const AC = character.AC;
      const CW = character.CW;
      const maxCW = character.maxCW;
      const CC = character.CC;
      const DE = character.DE;
      const HP = character.HP;
      const maxHP = character.maxHP;
      const LR = character.LR;
      const maxLR = character.maxLR;
      const MD = character.MD;
      const PL = character.PL;
      var RR = character.RR;
      const SQ = character.SQ;
      const SP = character.SP;
      const SS = character.SS;
      const VP = character.VP;
      const VL = character.VL;

      if (!RR) {
        RR = 'Immune';
      }
  
      document.getElementById('charName').textContent = name;
      document.getElementById('selectedRace').textContent = selectedRace;
      document.getElementById('selectedBackground').textContent = selectedBackground;
      document.getElementById('specialSTR').value = STR;
      document.getElementById('specialPER').textContent = PER;
      document.getElementById('specialEND').textContent = END;
      document.getElementById('specialCHA').textContent = CHA;
      document.getElementById('specialINT').textContent = INT;
      document.getElementById('specialAGI').textContent = AGI;
      document.getElementById('specialLCK').textContent = LCK;
  
      const selectedLanguagesList = document.getElementById('selectedLanguages');

      selectedLanguagesList.innerHTML = '';
      selectedLanguages.forEach(language => {
        const li = document.createElement('li');
        li.textContent = language;
        selectedLanguagesList.appendChild(li);
      });
  
      skills.forEach(skill => {
        const skillValue = document.getElementById('total' + skill);
        skillValue.textContent = character[skill];
      });

      const secondaryStatsTable = document.createElement('table');


    document.getElementById('secondaryStatsSection').appendChild(secondaryStatsTable);
    }
  }, [character])

  const handleDeleteCharacter = async () => {
    if (!deleteConfirm) {
      alert(`This action cannot be undone, so make absolutely sure you wish to delete your dweller! Push the delete button again to confirm deletion of ${router.query.char}.`)
      setDeleteConfirm(true);
    } else {
    try {
      const res = await fetch("/api/char-delete", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ id: character._id }), // Send the ID of the character to be deleted
      });
      if (res.status === 200) {
        // Redirect to a different page or perform any other necessary action after successful deletion
        router.push('/'); // Example: Redirect to the characters page
      }
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  }
  };

  if (!editedCharacter) {
    return <div>Loading...</div>
  }

  return (
<div className={styles.container}>
        <Head>
    <title>{router.query.char}</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>

  <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

  <main className={styles.main}>
      <h1>User Selection Summary</h1>
      <h2 id='charName'></h2>
      <h3>Selected Race: <span id="selectedRace"></span></h3>
      <h3>Selected Background: <span id="selectedBackground"></span></h3>
      <h3>SPECIAL Stats:</h3>
      <form>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strength (STR)</td>
            <td><input type='number' name='STR' value={editedCharacter.STR} onChange={handleInputChange} id='specialSTR'></input></td>
          </tr>
          <tr>
            <td>Perception (PER)</td>
            <td><input type='number' name='PER' value={editedCharacter.PER} onChange={handleInputChange} id='specialPER'></input></td>
          </tr>
          <tr>
      <td>Endurance (END)</td>
      <td><input type='number' name='END' value={editedCharacter.END} onChange={handleInputChange} id='specialEND'></input></td>
    </tr>
    <tr>
      <td>Charisma (CHA)</td>
      <td><input type='number' name='CHA' value={editedCharacter.CHA} onChange={handleInputChange} id='specialCHA'></input></td>
    </tr>
    <tr>
      <td>Intelligence (INT)</td>
      <td><input type='number' name='INT' value={editedCharacter.INT} onChange={handleInputChange} id='specialINT'></input></td>
    </tr>
    <tr>
      <td>Agility (AGI)</td>
      <td><input type='number' name='AGI' value={editedCharacter.AGI} onChange={handleInputChange} id='specialAGI'></input></td>
    </tr>
    <tr>
      <td>Luck (LCK)</td>
      <td><input type='number' name='LCK' value={editedCharacter.LCK} onChange={handleInputChange} id='specialLCK'></input></td>
    </tr>
        </tbody>
      </table>
      <div id='secondaryStatsSection'>
      <h3>Secondary Stats:</h3>
      <thead>
      <tr>
        <th>Stat</th>
        <th>Value</th>
        <th>Max Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Action Points (AP)</td>
        <td><input type='number' name='AP' value={editedCharacter.AP} onChange={handleInputChange} id='AP'></input></td>
      </tr>
      <tr>
        <td>Armor Class (AC)</td>
        <td><input type='number' name='AC' value={editedCharacter.AC} onChange={handleInputChange} id='AC'></input></td>
      </tr>
      <tr>
        <td>Carry Weight (CW)</td>
        <td><input type='number' name='CW' value={editedCharacter.CW} onChange={handleInputChange} id='CW'></input></td>
        <td><input type="number" name='maxCW' value={editedCharacter.maxCW} onChange={handleInputChange} id='maxCW' /></td>
      </tr>
      <tr>
        <td>Critical Chance (CC)</td>
        <td><input type='number' name='CC' value={editedCharacter.CC} onChange={handleInputChange} id='CC'></input></td>
      </tr>
      <tr>
        <td>Detection (DE)</td>
        <td><input type='number' name='DE' value={editedCharacter.DE} onChange={handleInputChange} id='DE'></input></td>
      </tr>
      <tr>
        <td>Hit Points (HP)</td>
        <td><input type='number' name='HP' value={editedCharacter.HP} onChange={handleInputChange} id='HP'></input></td>
        <td><input type="number" name='maxHP' value={editedCharacter.maxHP} onChange={handleInputChange} id='maxHP' /></td>
      </tr>
      <tr>
      <td>Limb Resistance (LR)</td>
      <td><input type='number' name='LR' value={editedCharacter.LR} onChange={handleInputChange} id='LR'></input></td>
      <td><input type="number" name='maxLR' value={editedCharacter.maxLR} onChange={handleInputChange} id='maxLR' /></td>
    </tr>
      <tr>
        <td>Melee Damage (MD)</td>
        <td><input type='number' name='MD' value={editedCharacter.MD} onChange={handleInputChange} id='MD'></input></td>
      </tr>
      <tr>
        <td>Personality (PL)</td>
        <td><input type='number' name='PL' value={editedCharacter.PL} onChange={handleInputChange} id='PL'></input></td>
      </tr>
      <tr>
        <td>Radiation Resistance (RR)</td>
        <td><input type='number' name='RR' value={editedCharacter.RR} onChange={handleInputChange} id='RR'></input></td>
      </tr>
      <tr>
        <td>Sequence (SQ)</td>
        <td><input type='number' name='SQ' value={editedCharacter.SQ} onChange={handleInputChange} id='SQ'></input></td>
      </tr>
      <tr>
        <td>Skill Points (SP)</td>
        <td><input type='number' name='SP' value={editedCharacter.SP} onChange={handleInputChange} id='SP'></input></td>
      </tr>
      <tr>
        <td>System Shock (SS)</td>
        <td><input type='number' name='SS' value={editedCharacter.SS} onChange={handleInputChange} id='SS'></input></td>
      </tr>
      <tr>
        <td>Vault Points (VP)</td>
        <td><input type='number' name='VP' value={editedCharacter.VP} onChange={handleInputChange} id='VP'></input></td>
        <td><input type="number" name='VL' value={editedCharacter.VL} onChange={handleInputChange} id='VL' /></td>
      </tr>
    </tbody>
      </div>
      <h3>Languages:</h3>
      <ul id="selectedLanguages"></ul>
      <h3>Skills:</h3>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Melee Weapons</td>
            <td><input type="number" name='MeleeWpn' value={editedCharacter.MeleeWpn} onChange={handleInputChange} id='totalMeleeWpn' min='1' max='200' /></td>
          </tr>
          <tr>
        <td>Throwing</td>
        <td><input type="number" name='Throw' value={editedCharacter.Throw} onChange={handleInputChange} id='totalThrow' min='1' max='200' /></td>
      </tr>
      <tr>
          <td>Unarmed</td>
          <td><input type="number" name='Unarm' value={editedCharacter.Unarm} onChange={handleInputChange} id='totalUnarm' min='1' max='200' /></td>
        </tr>
      <tr>
          <td>Archery</td>
          <td><input type="number" name='Arch' value={editedCharacter.Arch} onChange={handleInputChange} id='totalArch' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Big Guns</td>
          <td><input type="number" name='BigGn' value={editedCharacter.BigGn} onChange={handleInputChange} id='totalBigGn' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Energy Weapons</td>
          <td><input type="number" name='NRG' value={editedCharacter.NRG} onChange={handleInputChange} id='totalNRG' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Small Guns</td>
          <td><input type="number" name='SmGn' value={editedCharacter.SmGn} onChange={handleInputChange} id='totalSmGn' min='1' max='200' /></td>
        </tr>
      <tr>
          <td>Blacksmith</td>
          <td><input type="number" name='Smith' value={editedCharacter.Smith} onChange={handleInputChange} id='totalSmith' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Chemistry</td>
          <td><input type="number" name='Chem' value={editedCharacter.Chem} onChange={handleInputChange} id='totalChem' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Computer Science</td>
          <td><input type="number" name='Com' value={editedCharacter.Com} onChange={handleInputChange} id='totalCom' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Doctor</td>
          <td><input type="number" name='Doc' value={editedCharacter.Doc} onChange={handleInputChange} id='totalDoc' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Engineer</td>
          <td><input type="number" name='Engineer' value={editedCharacter.Engineer} onChange={handleInputChange} id='totalEngineer' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Gunsmith</td>
          <td><input type="number" name='Gunsmith' value={editedCharacter.Gunsmith} onChange={handleInputChange} id='totalGunsmith' min='1' max='200' /></td>
        </tr>
      <tr>
          <td>Charm</td>
          <td><input type="number" name='Charm' value={editedCharacter.Charm} onChange={handleInputChange} id='totalCharm' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Deception</td>
          <td><input type="number" name='Dec' value={editedCharacter.Dec} onChange={handleInputChange} id='totalDec' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Insight</td>
          <td><input type="number" name='Ins' value={editedCharacter.Ins} onChange={handleInputChange} id='totalIns' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Intimidation</td>
          <td><input type="number" name='Int' value={editedCharacter.Int} onChange={handleInputChange} id='totalInt' min='1' max='200' /></td>
        </tr>
      <tr>
          <td>Gambling</td>
          <td><input type="number" name='Gam' value={editedCharacter.Gam} onChange={handleInputChange} id='totalGam' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Lore</td>
          <td><input type="number" name='Lore' value={editedCharacter.Lore} onChange={handleInputChange} id='totalLore' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Observation</td>
          <td><input type="number" name='Obs' value={editedCharacter.Obs} onChange={handleInputChange} id='totalObs' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Pilot</td>
          <td><input type="number" name='Pilot' value={editedCharacter.Pilot} onChange={handleInputChange} id='totalPilot' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Sleight of Hand</td>
          <td><input type="number" name='SoH' value={editedCharacter.SoH} onChange={handleInputChange} id='totalSoH' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Sneak</td>
          <td><input type="number" name='Sneak' value={editedCharacter.Sneak} onChange={handleInputChange} id='totalSneak' min='1' max='200' /></td>
        </tr>
        <tr>
          <td>Survival</td>
          <td><input type="number" name='Surviv' value={editedCharacter.Surviv} onChange={handleInputChange} id='totalSurviv' min='1' max='200' /></td>
        </tr>
        </tbody>
      </table>
      </form>
      <button onClick={handleFormSubmit}>Save Changes</button>
      <button onClick={handleDeleteCharacter}>Delete Character</button>
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
}

export default UserSelectionSummary;