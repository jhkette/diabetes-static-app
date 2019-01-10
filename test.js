window.onload = function() {
function makeNavMenu () {
    var headings = document.getElementsByTagName("h2"); // get h2 elements
    var menu = document.createElement("div"); // create div element
    var menuUlist = document.createElement("ul"); // create ul element
    menu.appendChild(menuUlist); // append menuUlist to menu (ie put ul in div)


    for (var i = 0; i < headings.length; i++){ // for each index of heading ..
        // link text is child of h2. ie the text
        var linkText = headings[i].childNodes[0].nodeValue;
        var menuUListItem = document.createElement("li");
        // give list item a class
        menuUListItem.className = "MyClass";
        // append li to ul (menuUListItem to menuUlist )
        menuUlist.appendChild(menuUListItem);
        // create a
        var menuUListItemLink = document.createElement("a");
         // append to each index
        menuUlist.appendChild(menuUListItemLink);
        /* The setAttribute() method takes two parameters: the attribute being targeted (in this case href),
        and the value we want to give that attribute (in this case #item + the current value of i). */

        //set attribute to each index
        menuUListItemLink.setAttribute("href", "#item" + i);
        // menu text is from link text (above) ie child node of H2
        var menuText = document.createTextNode(linkText);
        menuUListItemLink.appendChild(menuText); // append link text

        // This adds the <a name"" links to the body headings
        var anchor = document.createElement("a"); //
        anchor.setAttribute("name", "item" + i);
        document.body.insertBefore(anchor, headings[i]);

    }
    document.body.insertBefore(menu, document.body.firstChild);

}





}
