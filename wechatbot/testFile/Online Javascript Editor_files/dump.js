var dump_show_functions = 1;

function dump(obj, deep_level, this_key, level) {

  var type = typeof obj;

  var str = '';
  var array_of_objects = new Array();

//str += "(("+obj.constructor+"))";

  if (level==undefined) { level=0; }
  if (level==0) {
    str += "<hr size=1><b>START OF DUMP</b>\n\n";

    var caller_function = arguments.callee.caller;
    if (caller_function) {
      str += '<b>Caller function name:</b> '+caller_function.name+'\n\n';
    }

    if (type=='function') {
//      str += "<pre>"+obj+"</pre>";
      str += obj;
    }
  }

  if (deep_level==undefined) { deep_level=1; }
  if (this_key==undefined) { this_key=''; }
  if (type=='string' || type=='number' || type == 'boolean' || type == 'undefined') {
    str += "<b>Type:</b> " + type + "\n";
    str += "<b>Value:</b> "+ obj  + "\n";
  }

  if (type == 'object') {

    var i = 0;
    for (var key in obj) {
      array_of_objects[i] = key;
      i++;
    }

    var array_length = array_of_objects.length;

    if (level==0) {
      str += "Number of keys in object: " + array_length + "\n\n";
    }

    if (array_length==0) {
      str += "<b>(empty object)</b>\n";
    }

    array_of_objects = array_of_objects.sort();

    for (var i=0; i<array_length; i++) {

      var key = array_of_objects[i];
      var value = '';
      var is_function = 0;

      try {
        value = obj[key] + ''+''; // Bug? Regexp won't work without it?
        if (typeof obj[key] == 'function') {
          is_function=1;
        }

      } catch (e) { // Firefox bug when key=domConfig
        value = ' DUMP ERROR: key='+key+'; e='+e+"\n";
      }

      value = value.replace(/</g, "&lt;");

      if (is_function==0 || dump_show_functions == 1) {
        if (level>0) {
          if (level>1) {
            str += "&nbsp; &nbsp; &nbsp;"; // ident
          }
          str += "&nbsp; &nbsp; &nbsp;"+this_key+'.';
        }
        str += key + "=" + value + ";\n";
      }

      if (level<deep_level) { // max level recursive (change 1 to 2 or 3 to view larger reports)
        if (value.match(/^\[object/)) {
          var keystr = (this_key == '') ? key : this_key+'.'+key;
          try {
            str += dump(obj[key], deep_level, keystr, level+1);
          } catch(e) {
            str += " &nbsp; &nbsp; "+e+"\n";
          }
        }
      }

    } // next object

  }

  if (level==0) {
    str += "\n<b>END OF DUMP</b>\n<hr size=1>\n";
//    document.writeln(str);
//    $(body).append(str);
    var htmlNode = document.createElement('pre');
    document.body.appendChild(htmlNode);

    htmlNode.style.position='relative'; // Overrides default 'position:static', so z-index will work over 'position:absolute' elements.
    htmlNode.style.zIndex='10001';

    htmlNode.innerHTML = str;
  }

  return(str);

}

