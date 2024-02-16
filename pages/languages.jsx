import React, { useEffect, useState } from 'react';

export default function SelectLanguages() {
    const [checkboxes, setCheckboxes] = useState([]);
  useEffect(() => {
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
        if (checkedCount > maxAllowed) {
          event.target.checked = false;
        }
      };
    
      const getMaxAllowed = (int) => {
        switch (int) {
          case 6:
            return 2;
          case 8:
            return 3;
          case 10:
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

      // Save the selected languages to sessionStorage
      const selectedLanguages = Array.from(document.querySelectorAll('input[name="selectedLanguages"]:checked'), input => input.value);
      sessionStorage.setItem('selectedLanguages', JSON.stringify(selectedLanguages));

      // Proceed to the next page or perform any other necessary action
      window.location.href = '/skillsbg';
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
    </div>
  );
} // 