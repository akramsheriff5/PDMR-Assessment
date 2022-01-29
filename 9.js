let text = `Right now when I want to make sure I haven't used the same word 30 times
            in a piece I do a word search. I'm afraid I might miss some though, and I am
            wondering if there is an editor out there that lists repeated words and shows
            how many times they were used?`

const replaceAll = (str, find, replace) => {
                var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
                return str.replace(new RegExp(escapedFind, 'g'), replace);
            }

            
let result = replaceAll(text,"word","world war"); 

console.log(result)