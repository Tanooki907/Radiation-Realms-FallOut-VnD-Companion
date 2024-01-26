import dbConnect from './connection'
import Char from './models/char';

export async function testing() {
  await dbConnect()

      // Create a model based on the charSchem

      // Predetermined data
      const predeterminedData = {
        Id: 1,
        name: 'Samantha Murrays',
        selectedRace: 'Human',
        selectedBackground: 'Wastelander',
        size: 'Medium',
        STR: 3,
        PER: 9,
        END: 5,
        CHA: 10,
        INT: 3,
        AGI: 1,
        LCK: 9,
        implants: 0,
        implantMax: 3,
        mutations: 0,
        mutateMax: 3,
        AP: 7,
        AC: 10,
        CW: 21.06,
        maxCW: 100,
        CC: 9,
        DE: 70,
        HP: 53,
        maxHP: 53,
        LR: 5,
        maxLR: 5,
        MD: 3,
        PL: 100,
        RR: 25,
        SQ: 1,
        SP: 19,
        SS: 3,
        VP: 13,
        VL: 13,
        Languages: ['English'],
        MeleeWpn: 18,
        Throw: 18,
        Unarm: 18,
        Arch: 22,
        BigGn: 26,
        NRG: 32,
        SmGn: 72,
        Smith: 18,
        Chem: 24,
        Com: 24,
        Doc: 22,
        Engineer: 20,
        Gunsmith: 22,
        Charm: 38,
        Dec: 74,
        Ins: 31,
        Int: 67,
        Gam: 28,
        Lore: 58,
        Obs: 70,
        Pilot: 22,
        SoH: 29,
        Sneak: 16,
        Surviv: 26
        // Add other fields with predetermined values
      };

          // Create a new document based on the charSchema and save it to the database
    Char.create(predeterminedData)
    .then((result) => {
      console.log('Predetermined data stored successfully:', result);
    })
    .catch((error) => {
      console.error('Error storing predetermined data:', error);
    });
}