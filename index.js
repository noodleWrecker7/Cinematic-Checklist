var list;
var inputs = [];
function loadList() {
    let req = new XMLHttpRequest();
    req.open("GET", "mcu.json");
    req.onreadystatechange = function () {
        if (this.readyState != 4) return;
        console.log(this.readyState);
        list = JSON.parse(this.responseText);


        let phaseNum = 0;
        let bodyOut = "";
        list.forEach(function (phase) {
            phaseNum ++;
            bodyOut += "<div class=\"row\">\n" +
                "        <p>Phase "+phaseNum+":</p>\n" +
                "    </div>";
            phase.forEach(function(movie){
                inputs.push(movie.id);

                if(movie.stone != null) {
                    bodyOut += "<div class=\"row\">\n" +
                        "        <input id=\"" + movie.id + "\" name=\"" + movie.id + "\" type=\"checkbox\" onclick=\"save(this.id)\">\n" +
                        "        <label for=\"" + movie.id + "\" class=\""+movie.stone+"\">" + movie.title + " (" + movie.year + ")\n" +
                        "            <object type=\"image/svg+xml\" data=\""+movie.stone+"%20gem.svg\" class=\"gem\">\n" +
                        "            </object>\n" +
                        "        </label>\n" +
                        "    </div>"
                } else {
                    bodyOut += "<div class=\"row\">\n" +
                        "        <input id=\"" + movie.id + "\" name=\"" + movie.id + "\" type=\"checkbox\" onclick=\"save(this.id)\">\n" +
                        "        <label for=\"" + movie.id + "\">" + movie.title + " (" + movie.year + ")</label>\n" +
                        "    </div>"
                }
            })
        })
        document.getElementById("big-ass-box").innerHTML = bodyOut;
        setup();
    };
    req.send();
}

function setup() {
    console.log(list);
    load();
    update();
}


function save(id) {
    var checkbox = document.getElementById(id);
    localStorage.setItem('nw7list-' + id, checkbox.checked);
    update();
}

function load () {
    inputs.forEach(function(item) {
        var checked = JSON.parse(localStorage.getItem('nw7list-'+ item));
        document.getElementById(item).checked = checked;
    });
}

function update() {
    var currentlyWatched = document.querySelectorAll('input[type="checkbox"]:checked').length;
    var totalMovies = inputs.length;
    var watchedPercentage = ((100 * currentlyWatched) / totalMovies).toFixed(2);

    var bgColor;

    if (watchedPercentage >= 0 && watchedPercentage < 25) {
        bgColor = 'red';
    } else if (watchedPercentage >= 25 && watchedPercentage < 50) {
        bgColor = 'orange';
    } else if (watchedPercentage >= 50 && watchedPercentage < 75) {
        bgColor = 'yellow';
    } else if (watchedPercentage >= 75 && watchedPercentage <= 100) {
        bgColor = 'green';
    }

    document.getElementById('watchedPercentage').innerText = watchedPercentage;
    document.getElementById('progress').style.width = watchedPercentage + '%';
    document.getElementById('progress').style.backgroundColor = bgColor;
    //document.getElementById('twitter-share').href = tweetText;
}

loadList();