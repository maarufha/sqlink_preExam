/* Search string in folders and sunfolders with the same extension that the user brings 
created by: Hadi Abu-Maruf */

//check if at least the user insert file extension and a word (it can be a string also)
if (process.argv.length <= 3) {
    console.log("Usage: node search [EXT] [TEXT]\n");
    process.exit(-1);
}

var extension = process.argv[2];
var String = process.argv[3];

//file system and path folder
var fs = require('fs'), path = require('path');

//flag inform us if we found at least one file with the same string
var flag=0;
//call readDirerctory function with the path where the 'search.js' file located
readDirerctory(process.cwd());

if(flag==0){
    console.log("No file was found\n");
}
else
    console.log("\n");
/*a recrusive function, we give it a directory to start from,
 and it check if there is a files with the 
same  extension then it check the contents of the file
if there is a string that equal to the input string*/
function readDirerctory(dir){
    var files = fs.readdirSync(dir);
    for(var file in files){
        var next = path.join(dir,files[file]);
        if(fs.lstatSync(next).isDirectory()==true){
            readDirerctory(next);
        }
        else {
            //split the file name form its extension
            var ext=next.split('.').pop();
            //check if we have the file extension equal to the input extension
            if(ext.localeCompare(ext)==false){
                //get the content of the file
                var data=fs.readFileSync(next, 'utf8')
                var n = data.search(String);
                if(n!=-1){
                    flag=1;
                    console.log(next);
                }
            }
        }
    }
}
 
