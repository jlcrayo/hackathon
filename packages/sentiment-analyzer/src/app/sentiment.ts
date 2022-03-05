import aposToLexForm from './aposToLexForm';
import {WordTokenizer, SentimentAnalyzer, PorterStemmer} from 'natural';
import {removeStopwords} from 'stopword';
export const analyzeSentiment = (text: string) => {
  console.log(text);
  
  // limpiar las expressiones abreviadas del ingles como I'm I've You're etc
const cleanText = aposToLexForm(text);
console.log(cleanText);
  //Transformar el texto a minusculas
const lowechase = cleanText.toLowerCase();
console.log(lowechase);
  //Reemplazar los caracteres no Alfabeticos
  const alphaText = lowechase.replace(/[^a-zA-Z\s]+/g, '');
  console.log(alphaText);
  //Tokenizar el texto en un array de palabras: ["I", "like","apples"]
const tokenizer = new WordTokenizer();
const tokenText = tokenizer.tokenize(alphaText);
console.log(tokenText);
  //Eliminar las stopwords, aquellas palabras que no aportan significado a una frase (he, like, have, etc)
const deletewords = removeStopwords(tokenText);
console.log(deletewords);
  //analizar el sentimiento del texto y devolver la puntuacion
const analizador = new SentimentAnalyzer("English",PorterStemmer,"afinn")
return analizador.getSentiment(deletewords);
};