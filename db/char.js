import { ObjectId } from 'mongodb';
import dbConnect from './connection'
import Char from './models/char';

export async function add(charData) {
  await dbConnect()

          // Create a new document based on the charSchema and save it to the database
    Char.create(charData)
    .then((result) => {
      console.log('Character data stored successfully:', result);
    })
    .catch((error) => {
      console.error('Error storing predetermined data:', error);
    });
}

export async function find(username) {
  await dbConnect();

  const characters = await Char.find({ madeBy: username })

  return characters;
}

export async function findMe(charName, username) {
  await dbConnect();

  const character = await Char.find({ name: charName, madeBy: username })

  //console.log(character);

  return character;
}

export async function edit(id, charData) {
  await dbConnect()


          // Create a new document based on the charSchema and save it to the database
    Char.updateOne({ _id: id }, { $set: charData } )
    .then((result) => {
      console.log('Character data stored successfully:', result);
    })
    .catch((error) => {
      console.error('Error storing data:', error);
    });
}

export async function del(id) {
  await dbConnect()


          // Create a new document based on the charSchema and save it to the database
    Char.deleteOne({ _id: id } )
    .then((result) => {
      console.log('Character deleted:', result);
    })
    .catch((error) => {
      console.error('Error deleting character:', error);
    });
}