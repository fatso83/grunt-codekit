var cp = require('child_process');

var pyCmd = 'python',
      log = process.stderr.write.bind(process.stderr);

childProcess = cp.exec(pyCmd + ' -c ""', {}, 
   function(err, stdout, stderr) {
          if(err) { 
                log("ERROR: Received an error trying to check for a working" +
                        "Python install. Have you installed Python?\n" +
                        "Actual error: \"" + err + "\"");
                process.exit(1);
          }
   }
)

childProcess.on('exit', function(code) {
  /* This only works in unix environments */
  if(code === 127 ) {
    log('Could not find "' + pyCmd + '" executable. It needs to be in the PATH\n'); 
  } else { childProcess.stderr.on('data', function (d) { log(d); }); }
});
