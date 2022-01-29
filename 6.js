let text = `Right now when I want to make sure I haven't used the same word 30 times
            in a piece I do a word search. I'm afraid I might miss some though, and I am
            wondering if there is an editor out there that lists repeated words and shows
            how many times they were used?`

let whatToSearch = 'times'
var hasTest = text.includes(whatToSearch);

if(hasTest == true){
	console.log('The word ',whatToSearch,'is in the Paragraph')
}
else{
	console.log('The word ',whatToSearch,'not in the Paragraph')

}