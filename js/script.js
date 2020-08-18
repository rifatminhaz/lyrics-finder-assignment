function findSongs() {

    let parent = document.getElementById("parent");
    parent.style.display = "none";
    document.getElementById("lyrics").innerHTML = "";
    let child = document.getElementsByClassName("child");

    for (let index = 1; index < child.length;) {
        child[index].remove();

    }


    const song_name = document.getElementById("song-name").value;
    fetch("https://api.lyrics.ovh/suggest/" + song_name)
        .then(response => response.json())
        .then(data => {

            let count = 0;
            for (let value of Object.values(data)) {
                 
                for (let song of value) {
                     
                    if (count < 10) {

                        let title = song.title_short;
                        let artistName = song.artist.name;
                        let albumNameInput = song.album.title;

                        var name = document.getElementById("name");
                        var albumName = document.getElementById("album");
                        var author = document.getElementById("author");
                        var button = document.getElementById("result");
                        
                        if (count == 0) {
                            
                            button.innerHTML="Get Lyrics";
                            name.innerHTML = title;
                            author.innerHTML = artistName;
                            albumName.innerHTML = albumNameInput;
                        } else {
                            var cloneChild = document.getElementsByClassName("child")[0].cloneNode(true);

                            name.innerHTML = title;
                            author.innerHTML = artistName;
                            albumName.innerHTML=albumNameInput;
                            parent.appendChild(cloneChild);
                        }

                        parent.style.display = "block";
                        count++;


                    }

                }

            }

        })
    .catch(mgs=>{})




}


function findLyric(evt) {

    var grandParent = evt.parentNode.parentNode;
    const artist = grandParent.getElementsByTagName("span")[0].innerHTML;
    let title = grandParent.getElementsByTagName("h3")[0].innerHTML;
     
    const resultTitle = document.getElementById("result-title");
    const lyric = document.getElementById("lyrics");
    resultTitle.innerHTML=`${artist} - ${title}`

    lyric.innerHTML = "";
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.lyrics != undefined) {
                
                lyric.innerHTML = data.lyrics;
            } else {

                evt.innerHTML="Not Available"
                 
                lyric.innerHTML = "This lyric is not available"
            }

        })
        .catch(mgs => {})
}

