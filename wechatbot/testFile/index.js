//var groupname = "测试";
//var names = ["Julia"];





//deal with history_name



var groupname = ""
var names = [];
var history_name = [];
var button;
var dropdown;
var index;
var click_index = -1;
var when = require('when');









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

function inputRemind() {
  var deferred = when.defer();
  if(groupname==""){
    alert("Please enter the groupname you want to manage!"+"\n"+"请输入你想要管理的组名");
  }
  deferred.resolve();
  return deferred.promise;
}


function getInstruction() {
        //setInterval(function () {
    var deferred = when.defer();
    // var refreshIntervalId =
        // setInterval(function(){
            chrome.extension.onMessage.addListener(function (request, sender) {
                if (request.type === "b-c") {
                    groupname = request.msg
                }
            });
            if (groupname != "") {
                console.log(groupname);
                // clearInterval(refreshIntervalId);
                //alert("Congratualations! Got your instruction!");
                deferred.resolve();
                console.log("get instruction!");
                return deferred.promise;
            } else {
                alert("Fail to get the group name. Please try to"+
                    " input the name again~"+"\n"+
                  "未获取到您的组名，请再次输入~");
            }
        // }, 20000);

    //if (groupname != "") {
    //    console.log(groupname);
    //    clearInterval(refreshIntervalId);
    //    //alert("Congratualations! Got your instruction!");
    //    deferred.resolve();
    //} else {
    //    alert("Fail to get the instruction. Please try to" +
    //        " input again~");
    //}

};


function checkUpdate() {
    var deferred = when.defer();
    // var updateIntervalId =
      // setInterval(function () {
          console.log("get instruction!")
          var chat_items = [];
          $('.chat_item.slide-left.ng-scope').each(function () {
              chat_items.push($(this).data('cm').username);
          });
          index = chat_items.indexOf('fmessage');
          if (index != -1) {
            console.log(index);
              if ($($('.chat_item.slide-left.ng-scope')[index]).has("i").length != 0) {
                  console.log($($('.chat_item.slide-left.ng-scope')[index]).has("i"));
                  // clearInterval(updateIntervalId);
                  click_index = index;
                  console.log("click_index" + click_index)
                  deferred.resolve();
                  return deferred.promise;
              }
          }
        // },20000);
};



function clickMsg () {
  // var msgIntervalId =
    // setInterval(function(){
      var deferred = when.defer();
      if (click_index != -1) {
        $('.chat_item.slide-left.ng-scope')[click_index].click();
      // clearInterval(msgIntervalId);
        deferred.resolve();
        return deferred.promise;
      }
    // }, 20000)
  }



/*parse notes*/



function parseNote () {
  // var noteIntervalId =
    // setInterval(function(){
      var deferred = when.defer();
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
      console.log(parsenotes.length);
      console.log(history_name);
      for (var i = 0; i < parsenotes.length; i += 1) {
          console.log(parsenotes[i][1] === groupname);
          var name = parsenotes[i][0].replace(" ", "")
          if (parsenotes[i][1] === groupname && names.indexOf(name) == -1&& history_name.indexOf(name) == -1) {
              names.push(name);
          }
      }
      console.log(names);
      // clearInterval(noteIntervalId);
      deferred.resolve();
      return deferred.promise;
    // }, 20000)
};



/*
 iterate through the cards, set tag, add users
 */


function clickCard (card) {
    var deferred = when.defer();
    //$('.card').each(function (intIndex) {
    //    //if (usergroups[intIndex][0] === "true") {
    //    $(this).click();
    //    /*edit alias if needed
    //     $('.value.J_Text.ng-binding').text(usergroups[intIndex][2])
    //     $('.value.J_Text.ng-binding').blur()
    //     */
        card.click();
        //$('.web_wechat_tab_add').click();
        console.log("successfully clicked");
        //} else {
        //    return false;
        //}
    //});

    deferred.resolve();
    return deferred.promise;
};

function clickPlus() {
    var deffered = when.defer();
    if ($('.web_wechat_tab_add').length == 0) {
      $('.box_bd.chat_bd.scrollbar-dynamic.scroll-content').click()
    } else {
      $('.web_wechat_tab_add').click();
    }
    console.log("successfully added!");
    deferred.resolve();
    return deferred.promise;
}




function passRequests () {
  // var requestIntervalId =
    // setInterval(function(){
      var deferred = when.defer();
      $('.card').each(function (i) {
        clickCard($(this))
          .delay(200)
          .then(clickPlus)
      });
      // clearInterval(requestIntervalId);
      deferred.resolve();
      return deferred.promise;
    // }, 20000);
}





/*
 update group and add users
 */

function getToGroup () {
  // var groupIntervalId =
    // setInterval(function(){
      var deferred = when.defer();
      if (names.length != 0) {
        $('.web_wechat_tab_friends').click();
        console.log("right place!!");
        // clearInterval(groupIntervalId);
        deferred.resolve();
        return deferred.promise;
      }
    // }, 20000);
}

var groupnumber;
var arr = [];
function findGroupnumber (){
  // var findIntervalId =
    // setInterval(function(){
      var deferred = when.defer();
      console.log(groupname);
      console.log(arr);
      console.log(arr === [])
      if (arr.length == 0) {
        $('.contact_item .info .nickname.ng-binding').each(function(){
            arr.push($(this).text())
            if ($(this).text() === groupname) {
                groupnumber = arr.length-1;
                console.log(groupnumber)
                // clearInterval(findIntervalId);
                deferred.resolve();
                return deferred.promise;
            }
        });
      } else {
        groupnumber = arr.indexOf(groupname)
      }
    // },20000)
};


function clickGroup () {
  // var clickIntervalId =
    // setInterval(function(){
      var deferred = when.defer();
      $('.contact_item')[groupnumber].click();
      console.log("find group");
      // clearInterval(clickIntervalId);
      deferred.resolve();
      return deferred.promise;
    // },20000);
}





function findButton () {
  // var buttonIntervalId =
    // setInterval(function(){
      var deferred = when.defer();
      button = document.querySelector(".profile .button");
      // clearInterval(buttonIntervalIds);
      console.log(button);
      deferred.resolve();
      return deferred.promise;
    // },20000)
};

function updateGroup () {
  // var updategIntervalId;
    // setInterval(function(){
      var deferred = when.defer();
      console.log(button);
      simulateClick(button);
      // clearInterval(updategIntervalId);
      deferred.resolve();
      return deferred.promise;
    // },20000)
};


function findDropdown () {
  // var finddropIntervalId
    // setInterval(function(){
      var deferred = when.defer();
      dropdown = document.querySelector(".web_wechat_down_icon");
      // clearInterval(finddropIntervalId);
      console.log(dropdown);
      deferred.resolve();
      return deferred.promise;
    // },20000)
};


function clickDropdown () {
  // var dropdownIntervalId=
    // setInterval(function(){
      var deferred = when.defer();
      console.log(dropdown);
      simulateClick(dropdown);
      console.log("dropdown got clicked");
      $('.web_wechat_add_friends').click();
      console.log("add friends got clicked");
      // clearInterval(dropdownIntervalId);
      deferred.resolve();
      return deferred.promise;
    // },20000)
};



function searchUsr (name) {
  // var searchIntervalId=
    // setInterval(function(){
      var deferred = when.defer();
      console.log("begin search");
      $('.input.ng-pristine.ng-valid').val(name);
      console.log(names);
      console.log(names);
      // clearInterval(searchIntervalId);
      deferred.resolve();
      return deferred.promise;
    // },20000)
};


function triggerSearch () {
    var deferred = when.defer();
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
    console.log("tirggered search!!");
    console.log(names);
    deferred.resolve();
    return deferred.promise;
};

//function triggerHelper () {
//    var yourCustomJavaScriptCode = '$(".input.ng-pristine.ng-valid").trigger("input");';
//    var script = document.createElement('script');
//    var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
//    script.appendChild(code);
//    (document.body || document.head).appendChild(script);
//}


function clickUsr () {
    var deferred = when.defer();
    //var e = jQuery.Event("keydown");
    //e.which = 13; //choose the one you want
    //e.keyCode = 13;
    //$("div.contact_item").trigger(e);
    var item = document.querySelector(".ng-scope.ng-isolate-scope.active .contact_item");
    console.log(item);
    simulateClick(item);
    console.log("user chosen");
    deferred.resolve();
    return deferred.promise;
};

function clickOK () {
    var deferred = when.defer();
    okbutton = document.querySelector(".button_primary.ng-scope");
    simulateClick(okbutton);
    console.log("button clicked");
    deferred.resolve();
    return deferred.promise;
};

function addUsrs () {
  // var addUsrIntervalId
    // setInterval(function(){
      var deferred = when.defer();
      console.log(names)
      for(var i = 0; i < names.length; i++) {
          history_name.push(names[i])
          searchUsr(names[i])
              .then(triggerSearch)
              .delay(3000)
              .then(clickUsr)
              .then(clickOK)
      }
      // clearInterval(addUsrIntervalId);
      deferred.resolve();
      return deferred.promise;
    // },20000)
};


//
//var eventable = {
//    on: function(event, cb) {
//        $(this).on(event, cb);
//    },
//    trigger: function (event, args) {
//        $(this).trigger(event, args);
//    }
//};
//
//
//$.extend(searchUsr, eventable);
//$.extend(clickOK, eventable);
//$.extend(clickMsg, eventable);
//$.extend(parseNote, eventable);
//$.extend(clickCard, eventable);
//$.extend(findButton, eventable);
//$.extend(getToGroup, eventable);
//$.extend(updateGroup, eventable);
//$.extend(findDropdown, eventable);
//$.extend(clickDropdown, eventable);
//$.extend(searchUsr, eventable);
//$.extend(clickUsr, eventable);
//$.extend(triggerSearch, eventable);
//$.extend(clickOK, eventable);
//$.extend(addUsrs, eventable);
//$.extend(clickGroup, eventable);
//$.extend(getInstruction, eventable);
//$.extend(checkUpdate, eventable);
//$.extend(findGroupnumber, eventable);






//console.log(groupname);


$(window).bind("load", function() {
    console.log("bot start");
    setInterval(function() {
      inputRemind()
          .then(getInstruction)
          .delay(2000)
          .then(checkUpdate)
          .then(clickMsg)
          .then(parseNote)
          .then(passRequests)
          .delay(200)
          .then(function(){
            if(names.length==0){
              return;
            } else {
              getToGroup()
                .delay(200)
                .then(findGroupnumber)
                .delay(200)
                .then(clickGroup)
                .then(findButton)
                .then(updateGroup)
                .delay(1000)
                .then(findDropdown)
                .delay(1000)
                .then(clickDropdown)
                .delay(1000)
                .then(addUsrs)
                .then(function() {
                  names = []
                  console.log(history_name)
                })
            }
          })
          // .then(findDropdown)
          // .then(clickDropdown)
          // .then(addUsrs);
        }, 20000);





    //setTimeout(function(){
    ////setInterval(function() {
    //   console.log("start bot!");
    //    getInstruction.on('done', function(event) {
    //        console.log("execute bot!");
    //        $(document).ready(function() {checkUpdate.run();});
    //    });
    //    checkUpdate.on('done', function(event) {
    //        console.log("execute bot!");
    //        $(document).ready(function() {clickMsg.run();});
    //    });
    //    clickMsg.on('done', function (event) {
    //        $(document).ready(function() {parseNote.run();});
    //    });
    //    parseNote.on('done', function (event) {
    //        clickCard.run();
    //    });
    //    clickCard.on('done', function (event) {
    //        getToGroup.run();
    //    });
    //    getToGroup.on('done', function (event) {
    //        $(document).ready(function() {findGroupnumber.run()});
    //    });
    //    findGroupnumber.on('done', function (event) {
    //        $(document).ready(function() {clickGroup.run()});
    //    });
    //    clickGroup.on('done', function (event) {
    //        $(document).ready(function() {findButton.run()});
    //    });
    //    findButton.on('done', function (event) {
    //        updateGroup.run();
    //    });
    //    updateGroup.on('done', function (event) {
    //        $(document).ready(function() {findDropdown.run()});
    //    });
    //    findDropdown.on('done', function (event) {
    //        clickDropdown.run();
    //    });
    //    clickDropdown.on('done', function (event) {
    //        $(document).ready(function() {addUsrs.run();});
    //    });
    //    addUsrs.on('done', function (event) {
    //        $(document).ready(function() {clickOK.run();});
    //    });
    //    //checkUpdate.run();
    //
    //    //clickMsg.run();
    //    //getToGroup.run();
    //    getInstruction.run();
    ////}, 60000);
    //}, 5000);

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
        deferred.resolve();

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
        deferred.resolve();
},500);
    return deferred.promise;}
*/
