const  search_word = (text, word) => {
    
    var x = 0, y=0;
   
    for (i=0;i< text.length;i++)
        {
        if(text[i] == word[0])
            {
            for(j=i;j< i+word.length;j++)
               {
                if(text[j]==word[j-i])
                  {
                    y++;
                  }
                if (y==word.length){
                    x++;
                }
            }
            y=0;
        }
    }
   return "'"+word+"' was found "+x+" times.";
}

let text = `Right now when I want to make sure I haven't used the same word 30 times
            in a piece I do a word search. I'm afraid I might miss some though, and I am
            wondering if there is an editor out there that lists repeated words and shows
            how many times they were used?`

let whatToSearch = 'times'


console.log(search_word(text,whatToSearch))