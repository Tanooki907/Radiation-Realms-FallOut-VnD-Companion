import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import React, { useState, useEffect } from "react";
import Image from 'next/image';

export default function Header(props) {
  const logout = useLogout();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (props.isLoggedIn) {
      async function fetchCharacters() {
        try {
          const response = await fetch("/api/char-list", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({ username: props.username }),
          });
          const data = await response.json();
          setCharacters(data);
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
      }
      fetchCharacters();
    }
  }, [props.isLoggedIn, props.username])

  return (
    <header className={styles.container}>
      {props.isLoggedIn ? (
        <>
            <Link href="/"><Image src="/Logo.png" alt="Radiation Realms" width={100} height={57} /></Link>
          <div className={styles.container}>
            <p>Welcome, {props.username}!</p>
            <div className={styles.dropdown}>
              <select onChange={(e) => {
                if (e.target.value === 'new') {
                  window.location.href = '/character-creator/start';
                } else if (e.target.value === '') {
                  
                } else {
                  window.location.href = `/sheet/${e.target.value}`;
                }
              }}>
                <option value="">Select Character</option>
                {Array.isArray(characters) && characters.length > 0 ? ( // Check if characters is an array and not empty
                  characters.map((character) => (
                    <option key={character._id} value={character.name}>{character.name}</option>
                  ))
                ) : (
                  <option value="">No characters available</option>
                )}
                <option value="new">Create New Character</option>
              </select>
            </div>
            <p onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </p>
          </div>
        </>
      ) : (
        <>
          <p>
          <Link href="/"><Image src="/Logo.png" alt="Radiation Realms" width={140} height={57} style={{ paddingLeft: "40px" }}/></Link>
          </p>
          <div style={{ paddingRight: "40px" }}>
          <p>
            <Link href="/login">Login</Link>
          </p>
          <p>
            <Link href="/signup">Sign Up</Link>
          </p>
          </div>
        </>
      )}
    </header>
  );
}