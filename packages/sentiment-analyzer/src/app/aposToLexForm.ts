import wordDict from "./wordDict";

const aposToLexForm = (text:string) => {
    const data = text.split(' ');
    data.forEach((word, index) => {
        Object.keys(wordDict).forEach(key => {
            if (key === word.toLowerCase()) {
                data[index] = wordDict[key]
            }
        });
    });

    return data.join(' ');
}

export default aposToLexForm;