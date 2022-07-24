const vowels = [ 'e', 'y', 'u', 'i', 'o', 'a' ];

function getIsVowel(letter) {
    return vowels.includes(letter.toLowerCase());
}

function countVowels(line) {
    return [...line].reduce((count, letter) => {
        return getIsVowel(letter) ? count + 1 : count;
    }, 0);
}

function countWords(line) {
    const words = line.trim().split(/\W/);

    return words.length;
}

module.exports = {
    getIsVowel,
    countVowels,
    countWords
}
