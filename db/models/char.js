import { Schema, model, models } from 'mongoose'

const charSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  madeBy: {
    type: String,
    required: true
  },
  picURL: String,
  selectedRace: {
    type: String,
    required: true
  },
  selectedBackground: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  STR: {
    type: Number,
    required: true
  },
  PER: {
    type: Number,
    required: true
  },
  END: {
    type: Number,
    required: true
  },
  CHA: {
    type: Number,
    required: true
  },
  INT: {
    type: Number,
    required: true
  },
  AGI: {
    type: Number,
    required: true
  },
  LCK: {
    type: Number,
    required: true
  },
  implants: {
    type: Number,
    required: true
  },
  implantMax: {
    type: Number,
    required: true
  },
  mutations: {
    type: Number,
    required: true
  },
  mutateMax: {
    type: Number,
    required: true
  },
  AP: {
    type: Number,
    required: true
  },
  AC: {
    type: Number,
    required: true
  },
  CW: {
    type: Number,
    required: true
  },
  maxCW: {
    type: Number,
    required: true
  },
  CC: {
    type: Number,
    required: true
  },
  DE: {
    type: Number,
    required: true
  },
  HP: {
    type: Number,
    required: true
  },
  maxHP: {
    type: Number,
    required: true
  },
  LR: {
    type: Number,
    required: true
  },
  maxLR: {
    type: Number,
    required: true
  },
  MD: {
    type: Number,
    required: true
  },
  PL: {
    type: Number,
    required: true
  },
  RR: Number,
  SQ: {
    type: Number,
    required: true
  },
  SP: {
    type: Number,
    required: true
  },
  SS: {
    type: Number,
    required: true
  },
  VP: {
    type: Number,
    required: true
  },
  VL: {
    type: Number,
    required: true
  },
  LP: Number,
  MaxLP: Number,
  GP: Number,
  MaxGP: Number,
  Trait1: String,
  Trait2: String,
  cybernetics: [String],
  Mutations: [String],
  Languages: {
    type: [String],
    required: true
  },
  MeleeWpn: {
    type: Number,
    required: true
  },
  Throw: {
    type: Number,
    required: true
  },
  Unarm: {
    type: Number,
    required: true
  },
  Arch: {
    type: Number,
    required: true
  },
  BigGn: {
    type: Number,
    required: true
  },
  NRG: {
    type: Number,
    required: true
  },
  SmGn: {
    type: Number,
    required: true
  },
  Smith: {
    type: Number,
    required: true
  },
  Chem: {
    type: Number,
    required: true
  },
  Com: {
    type: Number,
    required: true
  },
  Doc: {
    type: Number,
    required: true
  },
  Engineer: {
    type: Number,
    required: true
  },
  Gunsmith: {
    type: Number,
    required: true
  },
  Charm: {
    type: Number,
    required: true
  },
  Dec: {
    type: Number,
    required: true
  },
  Ins: {
    type: Number,
    required: true
  },
  Int: {
    type: Number,
    required: true
  },
  Gam: {
    type: Number,
    required: true
  },
  Lore: {
    type: Number,
    required: true
  },
  Obs: {
    type: Number,
    required: true
  },
  Pilot: {
    type: Number,
    required: true
  },
  SoH: {
    type: Number,
    required: true
  },
  Sneak: {
    type: Number,
    required: true
  },
  Surviv: {
    type: Number,
    required: true
  },
  TaggedSkills: {
    type: [String],
    required: true
  },
  Perks: [String],
})

let Char;
try {
  Char = models.Char || model('Char', charSchema);
} catch (error) {

}

export default Char;