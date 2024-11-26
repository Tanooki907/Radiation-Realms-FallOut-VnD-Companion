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

export default function SkillTagging(props) {
  const [size, setSize] = useState('');
  const [picURL, setPicURL] = useState('');
    const [selectedRace, setSelectedRace] = useState('');
    const [selectedBackground, setSelectedBackground] = useState('');
    const [STR, setSTR] = useState(0);
    const [PER, setPER] = useState(0);
    const [END, setEND] = useState(0);
    const [CHA, setCHA] = useState(0);
    const [INT, setINT] = useState(0);
    const [AGI, setAGI] = useState(0);
    const [LCK, setLCK] = useState(0);
    const [MeleeWpn, setMeleeWpn] = useState(0);
    const [Throw, setThrow] = useState(0);
    const [Unarm, setUnarm] = useState(0);
    const [Arch, setArch] = useState(0);
    const [BigGn, setBigGn] = useState(0);
    const [NRG, setNRG] = useState(0);
    const [SmGn, setSmGn] = useState(0);
    const [Smith, setSmith] = useState(0);
    const [Chem, setChem] = useState(0);
    const [Com, setCom] = useState(0);
    const [Doc, setDoc] = useState(0);
    const [Engineer, setEngineer] = useState(0);
    const [Gunsmith, setGunsmith] = useState(0);
    const [Charm, setCharm] = useState(0);
    const [Dec, setDec] = useState(0);
    const [Ins, setIns] = useState(0);
    const [Int, setInt] = useState(0);
    const [Gam, setGam] = useState(0);
    const [Lore, setLore] = useState(0);
    const [Obs, setObs] = useState(0);
    const [Pilot, setPilot] = useState(0);
    const [SoH, setSoH] = useState(0);
    const [Sneak, setSneak] = useState(0);
    const [Surviv, setSurviv] = useState(0);
    const [maxSkills, setMaxSkills] = useState(0);

  useEffect(() => {
    const selectedRace = (sessionStorage.getItem('selectedRace'));
    const selectedBackground = (sessionStorage.getItem('selectedBackground'))
    setSTR(parseInt(sessionStorage.getItem('STR')))
    setPER(parseInt(sessionStorage.getItem('PER')))
    setEND(parseInt(sessionStorage.getItem('END')))
    setCHA(parseInt(sessionStorage.getItem('CHA')))
    setINT(parseInt(sessionStorage.getItem('INT')))
    setAGI(parseInt(sessionStorage.getItem('AGI')))
    setLCK(parseInt(sessionStorage.getItem('LCK')))
    if (selectedRace === 'Human' || selectedRace === 'Synth' || selectedRace == 'Robot') {
      if (selectedBackground === 'Wanderer' || selectedBackground == 'Specialist Personality Core') {
          setMaxSkills(6);
      }else {
          setMaxSkills(5);
      }
    } else if (selectedRace === 'Ghoul') {
      if (selectedBackground === 'Old World Blues') {
          setMaxSkills(7);
      } else {
          setMaxSkills(6);
      }
    } else if (selectedRace === 'Eastern Super Mutant') {
      setMaxSkills(4);
    } else if (selectedRace === 'Western Super Mutant') {
      if (selectedBackground === 'The Scholar') {
          setMaxSkills(5);
      } else {
          setMaxSkills(4);
      }
    } else if (selectedRace === 'Mole Miner') {
      if (selectedBackground === 'Supervisor') {
          setMaxSkills(5);
      } else {
          setMaxSkills(4);
      }
    } else if (selectedRace === 'Intelligent Deathclaw') {
      if (selectedBackground === 'Jackson Chameleon') {
          setMaxSkills(6);
      } else {
          setMaxSkills(5);
      }
    }

        // Retrieve values from sessionStorage and update the state
        setSize(sessionStorage.getItem('size'));
    setSelectedRace(selectedRace);
    setSelectedBackground(selectedBackground);
    setMeleeWpn(parseInt(sessionStorage.getItem('MeleeWpn')));
    setThrow(parseInt(sessionStorage.getItem('Throw')));
    setUnarm(parseInt(sessionStorage.getItem('Unarm')));
    setArch(parseInt(sessionStorage.getItem('Arch')));
    setBigGn(parseInt(sessionStorage.getItem('BigGn')));
    setNRG(parseInt(sessionStorage.getItem('NRG')));
    setSmGn(parseInt(sessionStorage.getItem('SmGn')));
    setSmith(parseInt(sessionStorage.getItem('Smith')));
    setChem(parseInt(sessionStorage.getItem('Chem')));
    setCom(parseInt(sessionStorage.getItem('Com')));
    setDoc(parseInt(sessionStorage.getItem('Doc')));
    setEngineer(parseInt(sessionStorage.getItem('Engineer')));
    setGunsmith(parseInt(sessionStorage.getItem('Gunsmith')));
    setCharm(parseInt(sessionStorage.getItem('Charm')));
    setDec(parseInt(sessionStorage.getItem('Dec')));
    setIns(parseInt(sessionStorage.getItem('Ins')));
    setInt(parseInt(sessionStorage.getItem('Int')));
    setGam(parseInt(sessionStorage.getItem('Gam')));
    setLore(parseInt(sessionStorage.getItem('Lore')));
    setObs(parseInt(sessionStorage.getItem('Obs')));
    setPilot(parseInt(sessionStorage.getItem('Pilot')));
    setSoH(parseInt(sessionStorage.getItem('SoH')));
    setSneak(parseInt(sessionStorage.getItem('Sneak')));
    setSurviv(parseInt(sessionStorage.getItem('Surviv')));
    // Add event listener to restrict the number of checkboxes that can be checked based on the selected race;
  }, []);
    
        // Define the available skills and their current levels
        const availableSkills = {
            'MeleeWpn': MeleeWpn,
            'Throw': Throw,
            'Unarm': Unarm,
            'Arch': Arch,
            'BigGn': BigGn,
            'NRG': NRG,
            'SmGn': SmGn,
            'Smith': Smith,
            'Chem': Chem,
            'Com': Com,
            'Doc': Doc,
            'Engineer': Engineer,
            'Gunsmith': Gunsmith,
            'Charm': Charm,
            'Dec': Dec,
            'Ins': Ins,
            'Int': Int,
            'Gam': Gam,
            'Lore': Lore,
            'Obs': Obs,
            'Pilot': Pilot,
            'SoH': SoH,
            'Sneak': Sneak,
            'Surviv': Surviv
          };

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    var checkedCount = Array.from(document.querySelectorAll('input[name="taggedSkills"]:checked')).length;
    if (checkedCount > maxSkills) {
      alert('You have too many skills tagged. Please click to continue when you have only ' + maxSkills + ' skills tagged.')
    } else if (checkedCount < maxSkills) {
      alert('You can have more skills tagged. Please tag more skills, for a total of ' + maxSkills + '.')
    } else {
    // Increase the level of all tagged skills by 20 in sessionStorage
    const taggedSkills = Array.from(document.querySelectorAll('input[name="taggedSkills"]:checked'), input => input.value);
    sessionStorage.setItem('taggedSkills', taggedSkills);
    taggedSkills.forEach(skill => {
      if (selectedBackground == 'I Am Human') {
        sessionStorage.setItem(skill, availableSkills[skill] + 35);
      } else {
        sessionStorage.setItem(skill, availableSkills[skill] + 20);
      }
    }
  );

    if (selectedBackground == 'The Nightkin') {
      sessionStorage.setItem(Sneak, (sessionStorage.getItem(Sneak) + 25));
    }

    if (selectedRace == 'Eastern Super Mutant' || selectedRace == 'Western Super Mutant' || selectedRace == 'Intelligent Deathclaw') {
      sessionStorage.setItem(Int, sessionStorage.getItem('Int') + 30);
    }

    const name = sessionStorage.getItem('charName');
    var AP;
    var AC;
    var maxCW;
    var HP;
    var LR;
    var MD;
    var PL;
    var RR;
    var SP;
    var SS;
    var VP;
    var SQ;
    var LP;
    var GP;

    if (selectedRace == 'Human') {
      AP = Math.ceil(5 + (AGI/2) + 1);
    } else {
      AP = Math.ceil(5 + (AGI/2));
    }


      if (size == 'Small' || selectedRace == 'Mole Miner') {
        AC = PER + AGI + 10
      } else if (selectedRace == 'Intelligent Deathclaw') {
        AC = PER + AGI + 15
      } else {
        AC = PER + AGI
      }

      if (size == 'Small') {
        maxCW = STR * 5;
      }else if (size == 'Large') {
        maxCW = 50 + (20 * (STR + END))
      }else if (size == 'Huge') {
        maxCW = 200 + (50 * (STR + END))
      }else{
        maxCW = 20 + (10 * (STR + END))
      }

      if (selectedRace == 'Intelligent Deathclaw') {
        if (selectedBackground == 'Hairy Deathclaw') {
          HP = (15 + STR + (END * 2)) + 35
        }else {
          HP = (15 + STR + (END * 2)) + 20
        }
      } else if (size == 'Huge') {
        HP = (15 + STR + (END * 2)) + 60
      } else  if (selectedRace == 'Eastern Super Mutant') {
        HP = (15 + STR + (END * 2)) + 40
      } else if (selectedRace == 'Western Super Mutant') {
        HP = (15 + STR + (END * 2)) + 50
      } else {
        if (selectedBackground == 'Wastelander' || selectedBackground == 'I Am War') {
          HP = (15 + STR + (END * 2)) + 25
        } else if (selectedBackground == 'Rigor Mortis') {
          HP = (15 + STR + (END * 2)) + 10
        } else if (selectedBackground == 'Juggernaut') {
          HP = 15 + STR + (END * 2) + 30
        } else {
          HP = 15 + STR + (END * 2)
        }
      }

      if (selectedRace == 'Western Super Mutant' || selectedBackground == 'Juggernaut') {
        LR = END + 4;
      } else {
        LR = END;
      }

      if (size == 'Large') {
        MD = STR + 5
      } else if (size == 'Huge' || selectedBackground=='The Soldier') {
        MD = STR + 10
      } else {
        MD = STR
      }

      if (selectedBackground == 'Me Friend') {
        PL = (CHA * 10) + 25
      } else if (selectedBackground == 'Purveyor') {
        PL = (CHA * 10) + 20
      } else {
        PL = CHA * 10
      }

      if (selectedRace == 'Human') {
        if (selectedBackground == 'Wastelander') {
          RR = (END * 2) + 15
        } else {
          RR = END * 2
        }
      } else if (selectedRace == 'Ghoul') {
        RR = (END * 2) + 100
      } else if (selectedRace == 'Synth') {
        RR = (END * 2) + 50
      } else if (selectedRace == 'Mole Miner') {
        RR = (END * 2) + 75
      }

      if (selectedBackground == 'I Am Human') {
        SP = (10 + (INT * 3)) + 5
      } else if (selectedBackground == 'Domestic Personality Core') {
        SP = (10 + (INT * 3)) + 10
      } else {
        SP = 10 + (INT * 3)
      }

      if (selectedBackground == 'The Nightkin') {
        SQ = Math.ceil((AGI/2) + 2);
      } else {
        SQ = Math.ceil(AGI/2);
      }

      if (selectedBackground == 'Old World Blues') {
        SS = Math.ceil((END/2) + 2)
      } else {
        SS = Math.ceil(END/2)
      }

      if (selectedRace == 'Human') {
        VP = CHA + 3
      } else if (selectedBackground == "You're RADical") {
        VP = CHA + 4
      } else {
        VP = CHA + 1
      }

      if (INT >= 6) {
        if (selectedBackground == 'Old World Blues') {
        LP = Math.floor(2 + (sessionStorage.getItem('Lore')/20));
      } else {
        LP = Math.floor(sessionStorage.getItem('Lore')/20);
      }
    }

    if (LCK >= 6) {
      GP = Math.floor(sessionStorage.getItem('Gam')/25);
    }

    const charData = {
      name: name,
      madeBy: props.user.username,
      picURL,
      selectedRace: selectedRace,
      selectedBackground: selectedBackground,
      size: size,
      STR: sessionStorage.getItem('STR'),
      PER: sessionStorage.getItem('PER'),
      END: sessionStorage.getItem('END'),
      CHA: sessionStorage.getItem('CHA'),
      INT: sessionStorage.getItem('INT'),
      AGI: sessionStorage.getItem('AGI'),
      LCK: sessionStorage.getItem('LCK'),
      implants: 0,
      implantMax: Math.ceil(END/2),
      mutations: 0,
      mutateMax: Math.ceil(END/2),
      AP: AP,
      AC: AC,
      CW: 0,
      maxCW: maxCW,
      CC: LCK,
      DE: 25 + (PER * 5),
      HP: HP,
      maxHP: HP,
      LR: LR,
      maxLR: END,
      MD: MD,
      PL: PL,
      RR: RR,
      SQ: SQ,
      SP: SP,
      SS: SS,
      VP: VP,
      VL: VP,
      LP: LP,
      MaxLP: LP,
      GP: GP,
      MaxGP: GP,
      Languages: JSON.parse(sessionStorage.getItem('selectedLanguages')),
      MeleeWpn: sessionStorage.getItem('MeleeWpn'),
      Throw: sessionStorage.getItem('Throw'),
      Unarm: sessionStorage.getItem('Unarm'),
      Arch: sessionStorage.getItem('Arch'),
      BigGn: sessionStorage.getItem('BigGn'),
      NRG: sessionStorage.getItem('NRG'),
      SmGn: sessionStorage.getItem('SmGn'),
      Smith: sessionStorage.getItem('Smith'),
      Chem: sessionStorage.getItem('Chem'),
      Com: sessionStorage.getItem('Com'),
      Doc: sessionStorage.getItem('Doc'),
      Engineer: sessionStorage.getItem('Engineer'),
      Gunsmith: sessionStorage.getItem('Gunsmith'),
      Charm: sessionStorage.getItem('Charm'),
      Dec: sessionStorage.getItem('Dec'),
      Ins: sessionStorage.getItem('Ins'),
      Int: sessionStorage.getItem('Int'),
      Gam: sessionStorage.getItem('Gam'),
      Lore: sessionStorage.getItem('Lore'),
      Obs: sessionStorage.getItem('Obs'),
      Pilot: sessionStorage.getItem('Pilot'),
      SoH: sessionStorage.getItem('SoH'),
      Sneak: sessionStorage.getItem('Sneak'),
      Surviv: sessionStorage.getItem('Surviv'),
      TaggedSkills: sessionStorage.getItem('taggedSkills')
    }

    console.log(charData);

    try {
      const res = await fetch("/api/add-char", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({charData}),
      });
      if (res.status === 200) return window.location.href = "/";
      const { error: message } = await res.json();
      setError(message);
    } catch (err) {
      console.log(err);
    }
    }
  };

  const createSkillCheckboxes = () => {
    const determineCheckboxAttributes = (skill) => {
      let isChecked = false;
      let isDisabled = false;
  
      if (selectedRace === 'Ghoul' && selectedBackground === 'Old World Blues' && skill === 'Lore') {
        isChecked = true;
        isDisabled = true;
      } else if (selectedRace === 'Intelligent Deathclaw') {
        if (skill === 'Unarm') {
          isChecked = true;
          isDisabled = true;
        }
        if (selectedBackground === 'Jackson Chameleon' && skill === 'Surviv') {
          isChecked = true;
          isDisabled = true;
        }
      }
  
      return { isChecked, isDisabled };
    };
  
    return Object.keys(availableSkills).map((skill) => {
      const { isChecked, isDisabled } = determineCheckboxAttributes(skill);
  
      return (
        <div key={skill}>
          <input
            type="checkbox"
            name="taggedSkills"
            value={skill}
            id={skill.toLowerCase()}
            defaultChecked={isChecked}
            disabled={isDisabled}
          />
          <label htmlFor={skill.toLowerCase()}>{skill} - {availableSkills[skill]}</label>
          <br />
        </div>
      );
    });
  };

  return (
<div className={styles.container}>
        <Head>
    <title>Tagging Skills</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>

  <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

  <main className={styles.main}>
      <h2>Skill Tagging</h2>
      <p>Select up to {maxSkills} skills to tag.</p>
      <form id="skillsForm" onSubmit={handleFormSubmit}>
        <div id="skillOptions">
          {createSkillCheckboxes()}
        </div>
        <br />
        <button type="submit">Tag Selected Skills</button>
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