import React, { useEffect, useState } from 'react';

export default function SkillTagging() {
    const [selectedRace, setSelectedRace] = useState('');
    const [selectedBackground, setSelectedBackground] = useState('');
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

  useEffect(() => {
    const selectedRace = (sessionStorage.getItem('selectedRace'));
    const selectedBackground = (sessionStorage.getItem('selectedBackground'))

        // Retrieve values from sessionStorage and update the state
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Increase the level of all tagged skills by 20 in sessionStorage
    const taggedSkills = Array.from(document.querySelectorAll('input[name="taggedSkills"]:checked'), input => input.value);
    taggedSkills.forEach(skill => {
      sessionStorage.setItem(skill, availableSkills[skill] + 20);
    });

    // Proceed to the next page or perform any other necessary action
    window.location.href = '/sheet';
  };

  const handleCheckboxChange = () => {
    var maxSkills
          if (selectedRace === 'Human' || selectedRace === 'Synth') {
            if (selectedBackground === 'Wanderer') {
                maxSkills = 6;
            }else {
                maxSkills = 5;
            }
          } else if (selectedRace === 'Ghoul') {
            if (selectedBackground === 'Old World Blues') {
                maxSkills = 7;
            } else {
                maxSkills = 6;
            }
          } else if (selectedRace === 'Eastern Super Mutant') {
            maxSkills = 4;
          } else if (selectedRace === 'Western Super Mutant') {
            if (selectedBackground === 'The Scholar') {
                maxSkills = 5;
            } else {
                maxSkills = 4;
            }
          } else if (selectedRace === 'Mole Miner') {
            if (selectedBackground === 'Supervisor') {
                maxSkills = 5;
            } else {
                maxSkills = 4;
            }
          } else if (selectedRace === 'Intelligent Deathclaw') {
            if (selectedBackground === 'Jackson Chameleon') {
                maxSkills = 6;
            } else {
                maxSkills = 5;
            }
          }
          var checkedCount = Array.from(document.querySelectorAll('input[name="taggedSkills"]:checked')).length;
          if (checkedCount > maxSkills) {
            this.checked = false;
          }
  }

  const createSkillCheckboxes = () => {
    return Object.keys(availableSkills).map((skill) => {
      let isChecked = false;
      let isDisabled = false;
  
      // Add logic to set isChecked and isDisabled based on the selected race and background
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
  
      return (
        <div key={skill}>
          <input
            type="checkbox"
            name="taggedSkills"
            value={skill}
            id={skill.toLowerCase()}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={skill.toLowerCase()}>{skill} - {availableSkills[skill]}</label>
          <br />
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Skill Tagging</h2>
      <p>Select a number of skills to tag based on your selected race.</p>
      <form id="skillsForm" onSubmit={handleFormSubmit}>
        <div id="skillOptions">
          {createSkillCheckboxes()}
        </div>
        <br />
        <button type="submit">Tag Selected Skills</button>
      </form>
    </div>
  );
} // 