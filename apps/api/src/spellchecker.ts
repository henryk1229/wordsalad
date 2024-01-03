import { Nodehun } from 'nodehun';
import fs from 'fs';

// TODO - consolidate word sources
const affix = fs.readFileSync('./node_modules/dictionary-en/index.aff');
const dictionary = fs.readFileSync('./node_modules/dictionary-en/index.dic');
const spellchecker = new Nodehun(affix, dictionary);

export const spellcheckWord = async (submittedWord: string) => {
  return await spellchecker.spell(submittedWord);
};
