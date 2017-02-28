/**
 * Created by Luís Oliveira on 2/18/17.
 * https://github.com/charlieIT
 */
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "assets/roster.json", true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);

        /**var rows = 2;
         for (var a = 0; a < rows; ++a) {*/
        rows = 5;
        count_row = 1;
        count_col = 0;

        var folder = "assets/photos/";
        var count = 0;
        for (var item in actual_JSON) {
            /** console.log(actual_JSON.roster);
             console.log(actual_JSON[item]);*/
            for (var it in actual_JSON[item]) {
                var array = actual_JSON[item][it];
                /**console.log(actual_JSON[item][it]);
                 console.log(array[0]);*/
                var uri = folder + array[0];
                var roster = $("#roster");


                var col = document.createElement("div");
                col.className = "four wide column";
                var article = document.createElement("div");
                article.className = "caption";
                var img = document.createElement("img");
                img.src = uri;
                img.className = "caption__media";
                var overlay = document.createElement("div");
                overlay.className = "caption__overlay transformed";
                var title = document.createElement("h4");
                title.className = "caption__overlay__title";
                title.innerHTML = array[1];
                var content = document.createElement("div");
                content.className = "caption__overlay__content";

                var cargo = document.createElement("p");
                cargo.innerHTML = array[2];

                var noun = document.createElement("p");
                noun.innerHTML = array[3];

                content.appendChild(cargo);
                content.appendChild(noun);
                overlay.appendChild(title);
                overlay.appendChild(content);

                article.appendChild(img);
                article.appendChild(overlay);
                col.appendChild(article);
                roster.append(col)

                //append( "<img class="roster-pic" src=""+ folder + val +"">" );
                count++;
            }

        }
    });
}
init();