import React, { useEffect } from 'react';

export default function SkillDistribution() {
  useEffect(() => {
    // Get the character's attributes from sessionStorage
    const STR = parseInt(sessionStorage.getItem('STR')) || 0;
    const PER = parseInt(sessionStorage.getItem('PER')) || 0;
    const END = parseInt(sessionStorage.getItem('END')) || 0;
    const CHA = parseInt(sessionStorage.getItem('CHA')) || 0;
    const INT = parseInt(sessionStorage.getItem('INT')) || 0;
    const AGI = parseInt(sessionStorage.getItem('AGI')) || 0;
    const LCK = parseInt(sessionStorage.getItem('LCK')) || 0;

    // Update the base points for each skill based on the character's attributes
    const updateBasePoints = () => {
        document.getElementById('baseMeleeWpn').textContent = 5 + STR + AGI + LCK;
        document.getElementById('baseThrow').textContent = 5 + STR + AGI + LCK;
        document.getElementById('baseUnarm').textContent = STR + END + AGI + LCK;
        document.getElementById('baseArch').textContent = STR + PER + AGI + LCK;
        document.getElementById('baseBigGn').textContent = STR + PER + END + LCK;
        document.getElementById('baseNRG').textContent = 5 + PER + PER + LCK;
        document.getElementById('baseSmGn').textContent = 5 + PER + PER + LCK;
        document.getElementById('baseSmith').textContent = STR + END + AGI + LCK;
        document.getElementById('baseChem').textContent = PER + INT + INT + LCK;
        document.getElementById('baseCom').textContent = PER + INT + INT + LCK;
        document.getElementById('baseDoc').textContent = PER + INT + AGI + LCK;
        document.getElementById('baseEngineer').textContent = 5 + INT + INT + LCK;
        document.getElementById('baseGunsmith').textContent = PER + INT + AGI + LCK;
        document.getElementById('baseCharm').textContent = 5 + CHA + CHA + LCK;
        document.getElementById('baseDec').textContent = PER + CHA + CHA  + LCK;
        document.getElementById('baseIns').textContent = PER + CHA + INT + LCK;
        document.getElementById('baseInt').textContent = STR + END + CHA + LCK;
        document.getElementById('baseGam').textContent = 10 + LCK + LCK;
        document.getElementById('baseLore').textContent = 5 + INT + INT + LCK;
        document.getElementById('baseObs').textContent = 5 + PER + INT + LCK;
        document.getElementById('basePilot').textContent = PER + INT + AGI + LCK;
        document.getElementById('baseSoH').textContent = PER + CHA + AGI + LCK;
        document.getElementById('baseSneak').textContent = 5 + AGI + AGI + LCK;
        document.getElementById('baseSurviv').textContent = PER + END + INT + LCK;
        sessionStorage.setItem('MeleeWpn', document.getElementById('baseMeleeWpn').textContent);
        sessionStorage.setItem('Throw', document.getElementById('baseThrow').textContent);
        sessionStorage.setItem('Unarm', document.getElementById('baseUnarm').textContent);
        sessionStorage.setItem('Arch', document.getElementById('baseArch').textContent);
        sessionStorage.setItem('BigGn', document.getElementById('baseBigGn').textContent);
        sessionStorage.setItem('NRG', document.getElementById('baseNRG').textContent);
        sessionStorage.setItem('SmGn', document.getElementById('baseSmGn').textContent);
        sessionStorage.setItem('Smith', document.getElementById('baseSmith').textContent);
        sessionStorage.setItem('Chem', document.getElementById('baseChem').textContent);
        sessionStorage.setItem('Com', document.getElementById('baseCom').textContent);
        sessionStorage.setItem('Doc', document.getElementById('baseDoc').textContent);
        sessionStorage.setItem('Engineer', document.getElementById('baseEngineer').textContent);
        sessionStorage.setItem('Gunsmith', document.getElementById('baseGunsmith').textContent);
        sessionStorage.setItem('Charm', document.getElementById('baseCharm').textContent);
        sessionStorage.setItem('Dec', document.getElementById('baseDec').textContent);
        sessionStorage.setItem('Ins', document.getElementById('baseIns').textContent);
        sessionStorage.setItem('Int', document.getElementById('baseInt').textContent);
        sessionStorage.setItem('Gam', document.getElementById('baseGam').textContent);
        sessionStorage.setItem('Lore', document.getElementById('baseLore').textContent);
        sessionStorage.setItem('Obs', document.getElementById('baseObs').textContent);
        sessionStorage.setItem('Pilot', document.getElementById('basePilot').textContent);
        sessionStorage.setItem('SoH', document.getElementById('baseSoH').textContent);
        sessionStorage.setItem('Sneak', document.getElementById('baseSneak').textContent);
        sessionStorage.setItem('Surviv', document.getElementById('baseSurviv').textContent);
    };

    // Add event listeners to update the total points when additional points are changed
    const addEventListeners = () => {
        var skills = ['MeleeWpn', 'Throw', 'Unarm', 'Arch', 'BigGn', 'NRG', 'SmGn', 'Smith', 'Chem', 'Com', 'Doc', 'Engineer', 'Gunsmith', 'Charm', 'Dec', 'Ins', 'Int', 'Gam', 'Lore', 'Obs', 'Pilot', 'SoH', 'Sneak', 'Surviv'];
        skills.forEach(function(skill) {
          var additionalInput = document.getElementById('additional' + skill);
          var totalOutput = document.getElementById('total' + skill);
          var basePoints = parseInt(document.getElementById('base' + skill).textContent);
          totalOutput.textContent = basePoints;
          additionalInput.addEventListener('input', function() {
            var basePoints = parseInt(document.getElementById('base' + skill).textContent);
            var additionalPoints = parseInt(this.value);
            var totalPoints = basePoints + additionalPoints;
            totalOutput.textContent = totalPoints;
            sessionStorage.setItem(skill, document.getElementById('total' + skill).textContent)
          });
        })
    };

    updateBasePoints();
    addEventListeners();

    // Add event listener to proceed to the next page when the button is clicked
    const handleButtonClick = () => {
      let totalPoints = 0;
      const skills = ['MeleeWpn', 'Throw', 'Unarm', 'Arch', 'BigGn', 'NRG', 'SmGn', 'Smith', 'Chem', 'Com', 'Doc', 'Engineer', 'Gunsmith', 'Charm', 'Dec', 'Ins', 'Int', 'Gam', 'Lore', 'Obs', 'Pilot', 'SoH', 'Sneak', 'Surviv'];
      skills.forEach(skill => {
        totalPoints += parseInt(document.getElementById('additional' + skill).value);
      });

      if (totalPoints === 40) {
        // Proceed to the next page
        window.location.href = '/tag-skills';
      } else {
        alert('Please distribute exactly 40 background skill points across all skills before proceeding. You have spent a total of ' + totalPoints + ' points.');
      }
    };

    const proceedButton = document.getElementById('proceedButton');
    proceedButton.addEventListener('click', handleButtonClick);
  }, []);

  return (
    <div>
      <h2>Skill Distribution</h2>
      <p>Distribute 40 additional points across the skills before proceeding to the next page.</p>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Base Points</th>
            <th>Additional Points</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <th>Combat Skills (Close)</th>
    </tr>
    <tr>
      <td>Melee Weapons</td>
      <td id="baseMeleeWpn">0</td>
      <td><input type="number" id="additionalMeleeWpn" min="0" max="40"/></td>
      <td id="totalMeleeWpn">0</td>
    </tr>
    <tr>
      <td>Throwing</td>
      <td id="baseThrow">0</td>
      <td><input type="number" id="additionalThrow" min="0" max="40"/></td>
      <td id="totalThrow">0</td>
    </tr>
    <tr>
        <td>Unarmed</td>
        <td id="baseUnarm">0</td>
        <td><input type="number" id="additionalUnarm" min="0" max="40"/></td>
        <td id="totalUnarm">0</td>
      </tr>
    <tr>
        <th>Combat Skills (Ranged)</th>
    </tr>
    <tr>
        <td>Archery</td>
        <td id="baseArch">0</td>
        <td><input type="number" id="additionalArch" min="0" max="40"/></td>
        <td id="totalArch">0</td>
      </tr>
      <tr>
        <td>Big Guns</td>
        <td id="baseBigGn">0</td>
        <td><input type="number" id="additionalBigGn" min="0" max="40"/></td>
        <td id="totalBigGn">0</td>
      </tr>
      <tr>
        <td>Energy Weapons</td>
        <td id="baseNRG">0</td>
        <td><input type="number" id="additionalNRG" min="0" max="40"/></td>
        <td id="totalNRG">0</td>
      </tr>
      <tr>
        <td>Small Guns</td>
        <td id="baseSmGn">0</td>
        <td><input type="number" id="additionalSmGn" min="0" max="40"/></td>
        <td id="totalSmGn">0</td>
      </tr>
    <tr>
        <th>Crafting Skills</th>
    </tr>
    <tr>
        <td>Blacksmith</td>
        <td id="baseSmith">0</td>
        <td><input type="number" id="additionalSmith" min="0" max="40"/></td>
        <td id="totalSmith">0</td>
      </tr>
      <tr>
        <td>Chemistry</td>
        <td id="baseChem">0</td>
        <td><input type="number" id="additionalChem" min="0" max="40"/></td>
        <td id="totalChem">0</td>
      </tr>
      <tr>
        <td>Computer Science</td>
        <td id="baseCom">0</td>
        <td><input type="number" id="additionalCom" min="0" max="40"/></td>
        <td id="totalCom">0</td>
      </tr>
      <tr>
        <td>Doctor</td>
        <td id="baseDoc">0</td>
        <td><input type="number" id="additionalDoc" min="0" max="40"/></td>
        <td id="totalDoc">0</td>
      </tr>
      <tr>
        <td>Engineer</td>
        <td id="baseEngineer">0</td>
        <td><input type="number" id="additionalEngineer" min="0" max="40"/></td>
        <td id="totalEngineer">0</td>
      </tr>
      <tr>
        <td>Gunsmith</td>
        <td id="baseGunsmith">0</td>
        <td><input type="number" id="additionalGunsmith" min="0" max="40"/></td>
        <td id="totalGunsmith">0</td>
      </tr>
    <tr>
        <th>Social Skills</th>
    </tr>
    <tr>
        <td>Charm</td>
        <td id="baseCharm">0</td>
        <td><input type="number" id="additionalCharm" min="0" max="40"/></td>
        <td id="totalCharm">0</td>
      </tr>
      <tr>
        <td>Deception</td>
        <td id="baseDec">0</td>
        <td><input type="number" id="additionalDec" min="0" max="40"/></td>
        <td id="totalDec">0</td>
      </tr>
      <tr>
        <td>Insight</td>
        <td id="baseIns">0</td>
        <td><input type="number" id="additionalIns" min="0" max="40"/></td>
        <td id="totalIns">0</td>
      </tr>
      <tr>
        <td>Intimidation</td>
        <td id="baseInt">0</td>
        <td><input type="number" id="additionalInt" min="0" max="40"/></td>
        <td id="totalInt">0</td>
      </tr>
    <tr>
        <th>Support Skills</th>
    </tr>
    <tr>
        <td>Gambling</td>
        <td id="baseGam">0</td>
        <td><input type="number" id="additionalGam" min="0" max="40"/></td>
        <td id="totalGam">0</td>
      </tr>
      <tr>
        <td>Lore</td>
        <td id="baseLore">0</td>
        <td><input type="number" id="additionalLore" min="0" max="40"/></td>
        <td id="totalLore">0</td>
      </tr>
      <tr>
        <td>Observation</td>
        <td id="baseObs">0</td>
        <td><input type="number" id="additionalObs" min="0" max="40"/></td>
        <td id="totalObs">0</td>
      </tr>
      <tr>
        <td>Pilot</td>
        <td id="basePilot">0</td>
        <td><input type="number" id="additionalPilot" min="0" max="40"/></td>
        <td id="totalPilot">0</td>
      </tr>
      <tr>
        <td>Sleight of Hand</td>
        <td id="baseSoH">0</td>
        <td><input type="number" id="additionalSoH" min="0" max="40"/></td>
        <td id="totalSoH">0</td>
      </tr>
      <tr>
        <td>Sneak</td>
        <td id="baseSneak">0</td>
        <td><input type="number" id="additionalSneak" min="0" max="40"/></td>
        <td id="totalSneak">0</td>
      </tr>
      <tr>
        <td>Survival</td>
        <td id="baseSurviv">0</td>
        <td><input type="number" id="additionalSurviv" min="0" max="40"/></td>
        <td id="totalSurviv">0</td>
      </tr>
        </tbody>
      </table>
      <br />
      <button id="proceedButton">Proceed to Next Page</button>
    </div>
  );
} // 