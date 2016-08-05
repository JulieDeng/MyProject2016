var groupname = "测试";
//var names = ["Julia"];


var when = require("when");







//parseNote();
//    //groupNotes();
//    //clickCard();
//    setTimeout(getToGroup(), 100);
//    setTimeout(addUsr(), 500);


//    var newreq = ' '
//    console.log(newreq === ' ')
////var repeatchecking = setInterval(checkupdate, 5000)
//
//    while (newreq === ' ') {
//        checkupdate();
//        //repeatchecking
//        console.log(newreq)
//        //console.log(newreq === ' ')
//    }
//
////clearInterval(repeatchecking);
//    clickMsg();
//
//
//
//    function checkupdate() {
//        $('.chat_item').each(function(intIndex){
//            if($(this).data('cm').username == 'filehelper'){
//                console.log($(this))
//                newreq = $(this)
//                console.log(newreq)
//                return;
//                //newreq = $(this);
//                //console.log(newreq);
//                //return;
//            }
//        })
//    }

//addUsr();
//getToGroup()

//
//
//});

//var newreq = ' '
//console.log(newreq === ' ')
////var repeatchecking = setInterval(checkupdate, 5000)
//
//while (newreq === ' ') {
//    checkupdate();
//    //repeatchecking
//    console.log(newreq)
//    //console.log(newreq === ' ')
//}
//
////clearInterval(repeatchecking);
//clickMsg();
//
//
//
//function checkupdate() {
//    $('.chat_item').each(function(intIndex){
//        if($(this).data('cm').username == 'filehelper'){
//            console.log($(this))
//            newreq = $(this)
//            console.log(newreq)
//            return;
//            //newreq = $(this);
//            //console.log(newreq);
//            //return;
//        }
//    })
//}
//



function simulateClick(obj) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,
        0, 200, 200, 200, 200, false, false, false, false, 0, null);
    var canceled = !obj.dispatchEvent(evt);
}

var getInstruction = {
    run: function () {
        //setInterval(function () {
        var self = this;
        chrome.extension.onMessage.addListener(function (request, sender) {
            if (request.type === "b-c") {
                groupname = request.msg
            }
        });
        console.log(groupname);
        if (groupname != "") {
            //alert("Congratualations! Got your instruction!");
            self.trigger('done');
        } else {
            alert("Fail to get the instruction. Please try to" +
                " input again~");
        }
        //}, 10000)
    }
};

var index;
var checkUpdate = {
    run: function () {
        var self = this;
        //setInterval(function () {
        var chat_items = [];
        $('.chat_item.slide-left.ng-scope').each(function () {
            chat_items.push($(this).data('cm').username);
        });
        index = chat_items.indexOf('fmessage');
        if (index != -1) {
            if ($($('.chat_item.slide-left.ng-scope')[index]).has("i")) {
                self.trigger('done');
            }
        }
        //}, 10000)
    }
};



var clickMsg = {
    run: function () {
        var self = this;
        $('.chat_item.slide-left.ng-scope')[index].click();
        self.trigger('done');
    }
};


/*parse notes*/

var names = [];

var parseNote = {
    run: function () {
        var self = this;
        var parsenotes = [];
        var notes = [];
        $('.signature').each(function(){
            notes.push($(this).text())
        });
        console.log(notes);
        for (var i = 0; i < notes.length; i++) {
            if (notes[i] != "") parsenotes.push(notes[i].split(":"));
        }
        console.log(parsenotes);
        console.log(parsenotes[0][0]);
        console.log(parsenotes[0][1]);
        for (var i = 0; i < parsenotes.length; i += 2) {
            console.log(parsenotes[0][i+1]);
            console.log(parsenotes[0][i+1] === groupname);
            var name = parsenotes[0][i].replace(" ", "")
            if (parsenotes[0][i+1] === groupname && names.indexOf(name) == -1) {
                names.push(name);
            }
        }
        console.log(names);
        self.trigger('done');
    }
};



/*
 iterate through the cards, set tag, add users
 */


var clickCard = {
    run: function () {
        var self = this;
        $('.card').each(function (intIndex) {
            //if (usergroups[intIndex][0] === "true") {
            $(this).click();
            /*edit alias if needed
             $('.value.J_Text.ng-binding').text(usergroups[intIndex][2])
             $('.value.J_Text.ng-binding').blur()
             */
            $('.web_wechat_tab_add').click();
            console.log("successfully clicked");
            //} else {
            //    return false;
            //}
        });
        console.log("successfully added!");
        self.trigger('done');
    }
};



/*
 update group and add users
 */

var getToGroup = {
    run: function () {
        var self = this;
        $('.web_wechat_tab_friends').click();
        console.log("right place!!")
        self.trigger('done');
    }
};

var groupnumber;
var arr = [];
var findGroupnumber ={
    run: function() {
        var self = this;
        $('.contact_item .info .nickname.ng-binding').each(function(){
            arr.push($(this).text())
            if ($(this).text() === groupname) {
                groupnumber = arr.length-1;
                console.log(groupnumber)
                self.trigger('done');
            }
        });
    }
};


var clickGroup = {
    run: function () {
        var self = this;
        $('.contact_item')[groupnumber].click();
        console.log("find group");
        self.trigger('done');
    }

}



var button;
var dropdown;

var findButton = {
    run: function () {
        var self = this;
        button = document.querySelector(".profile .button");
        console.log(button);
        self.trigger('done');
    }
};

var updateGroup = {
    run: function () {
        var self = this;
        console.log(button);
        simulateClick(button);
        self.trigger('done');
    }
};


var findDropdown = {
    run: function () {
        var self = this;
        dropdown = document.querySelector(".web_wechat_down_icon");
        self.trigger('done');
    }
};


var clickDropdown = {
    run: function () {
        var self = this;
        simulateClick(dropdown);
        console.log("dropdown got clicked");
        $('.web_wechat_add_friends').click();
        console.log("add friends got clicked");
        self.trigger('done');
    }
};



var searchUsr = {
    run: function (name) {
        var self = this;
        console.log("begin search");
        $('.input.ng-pristine.ng-valid').val(name);
        console.log("got name");
        self.trigger('done');
    }
};


var triggerSearch = {
    run: function () {
        var self = this;
        //searchbar = document.querySelector(".input.ng-pristine.ng-valid");
        //chrome.tabs.getSelected(null, function(tab){
        //    chrome.tabs.executeScript(tab.id, {code: "triggerHelper();"}, function(response) {
        //        console.log("f*** snadbox!!")
        //    });
        //});
        var injectedCode = '$(".input.ng-pristine.ng-valid").trigger("input");';
        var script = document.createElement('script');
        script.appendChild(document.createTextNode(injectedCode));
        (document.body || document.head || document.documentElement).appendChild(script);
        //console.log(searchbar);
        console.log("tirggered search!!")
        self.trigger('done');
    }

};

//function triggerHelper () {
//    var yourCustomJavaScriptCode = '$(".input.ng-pristine.ng-valid").trigger("input");';
//    var script = document.createElement('script');
//    var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
//    script.appendChild(code);
//    (document.body || document.head).appendChild(script);
//}


var clickUsr = {
    run: function () {
        var self = this;
        //var e = jQuery.Event("keydown");
        //e.which = 13; //choose the one you want
        //e.keyCode = 13;
        //$("div.contact_item").trigger(e);
        var item = document.querySelector(".ng-scope.ng-isolate-scope.active .contact_item");
        console.log(item);
        simulateClick(item);
        console.log("user chosen")
        self.trigger('done');

    }

};

var clickOK = {
    run: function () {
        var self = this;
        okbutton = document.querySelector(".button_primary.ng-scope");
        simulateClick(okbutton);
        console.log("button clicked")
        self.trigger('done');

    }

};

var addUsrs = {
    run: function () {

        var self = this;
        for(var i = 0; i < names.length; i++) {


            searchUsr.on('done', function (event) {
                $(document).ready(function() {triggerSearch.run()});
            });
            triggerSearch.on('done', function (event) {
                //console.log(document.querySelector("div.contact_item"))
                setTimeout(function() {$(document).ready(function() {clickUsr.run()});}, 500)
            });
            clickUsr.on('done', function (event) {
                $(document).ready(function() {clickOK.run()});
            });
            searchUsr.run(names[i]);
        }
        self.trigger('done');

    }

};



var eventable = {
    on: function(event, cb) {
        $(this).on(event, cb);
    },
    trigger: function (event, args) {
        $(this).trigger(event, args);
    }
};


$.extend(searchUsr, eventable);
$.extend(clickOK, eventable);
$.extend(clickMsg, eventable);
$.extend(parseNote, eventable);
$.extend(clickCard, eventable);
$.extend(findButton, eventable);
$.extend(getToGroup, eventable);
$.extend(updateGroup, eventable);
$.extend(findDropdown, eventable);
$.extend(clickDropdown, eventable);
$.extend(searchUsr, eventable);
$.extend(clickUsr, eventable);
$.extend(triggerSearch, eventable);
$.extend(clickOK, eventable);
$.extend(addUsrs, eventable);
$.extend(clickGroup, eventable);
$.extend(getInstruction, eventable);
$.extend(checkUpdate, eventable);
$.extend(findGroupnumber, eventable);






//console.log(groupname);


$(window).bind("load", function() {


    setTimeout(function(){
        //setInterval(function() {
        console.log("start bot!");
        getInstruction.on('done', function(event) {
            console.log("execute bot!");
            $(document).ready(function() {checkUpdate.run();});
        });
        checkUpdate.on('done', function(event) {
            console.log("execute bot!");
            $(document).ready(function() {clickMsg.run();});
        });
        clickMsg.on('done', function (event) {
            $(document).ready(function() {parseNote.run();});
        });
        parseNote.on('done', function (event) {
            clickCard.run();
        });
        clickCard.on('done', function (event) {
            getToGroup.run();
        });
        getToGroup.on('done', function (event) {
            $(document).ready(function() {findGroupnumber.run()});
        });
        findGroupnumber.on('done', function (event) {
            $(document).ready(function() {clickGroup.run()});
        });
        clickGroup.on('done', function (event) {
            $(document).ready(function() {findButton.run()});
        });
        findButton.on('done', function (event) {
            updateGroup.run();
        });
        updateGroup.on('done', function (event) {
            $(document).ready(function() {findDropdown.run()});
        });
        findDropdown.on('done', function (event) {
            clickDropdown.run();
        });
        clickDropdown.on('done', function (event) {
            $(document).ready(function() {addUsrs.run();});
        });
        addUsrs.on('done', function (event) {
            $(document).ready(function() {clickOK.run();});
        });
        //checkUpdate.run();

        //clickMsg.run();
        //getToGroup.run();
        getInstruction.run();
        //}, 60000);
    }, 5000);

});









/*

 multigroup version
 namereq:list of strings with format of(alias:我是name)
 groupreq: list of strings with format of(1,2,3)
 alias: list of alias
 name: list of names
 grouplists: list of group number
 usergroups: list of users with format of (alia,name,group list)
 userlist:the cached users
 updategroup:list of groups need to update



 var editnotes = [],
 namereq = [],
 groupreq = [],
 alias = [],
 names = [],
 usergroups = [],
 userlist = [],
 grouplists = [],
 updategroup = [];


 function parseNote() {
 var deferred = when.defer();
 setTimeout(function(){
 var notes = $('.signature').text().split(" ")

 for(var i = 0; i < notes.length; i += 1) {
 if (i % 2 === 0) {
 editnotes.push(notes[i])
 } else {
 editnotes.push(notes[i].split("!")[0])
 editnotes.push(notes[i].split("!")[1])
 }
 }

 console.log(editnotes)

 for (var i = 0; i < editnotes.length; i++) {
 (i % 2 === 0 ? namereq : groupreq).push(editnotes[i]);
 }
 console.log(namereq)
 console.log(groupreq)

 for (var i = 0; i < namereq.length; i++) {
 var temp = namereq[i].split(":");
 alias.push(temp[0]);
 names.push(temp[1]);
 grouplists.push(groupreq[i].split(","));
 }
 console.log(alias)
 console.log(names)
 console.log(grouplists)

 names.map(function (name) {
 names.substring(2)
 });
 console.log(names);
 deferred.resolve(records);

 },500);
 return deferred.promise;}
 */




/*
 group alias, name, group number together, flag duplicated user,
 update group

 function groupNotes() {
 var deferred = when.defer();
 setTimeout(function(){
 for (var i = 0; i < alias.length; i++) {
 var usergroup = [];
 if (userlist.includes(alias[i])) {
 usergroup.push("false")
 usergroup.push(alias[i])
 usergroup.push(names[i])
 usergroup.push(grouplists[i])
 } else {
 usergroup.push("true")
 usergroup.push(alias[i])
 usergroup.push(names[i])
 grouplists[i].map(function (group) {
 parseInt(group)
 });
 usergroup.push(grouplists[i])
 userlist.push(alias[i])
 for (var j = 0; j < grouplists[i].length; j++) {
 if (!updategroup.includes(grouplists[i][j])) {
 updategroup.push(grouplists[i][j])
 }
 }
 }
 usergroups.push(usergroup)
 }
 console.log(userlist);
 console.log(usergroups)
 console.log(updategroup)
 deferred.resolve(records);
 },500);
 return deferred.promise;}
 */



















