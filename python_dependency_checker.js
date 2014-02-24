#!/usr/bin/env node

var cp = require('child_process');

var pyCmd = 'python',
      childProcess = cp.exec(pyCmd + ' -c ""', {}, function() { /* do nothing */ }),
      log = process.stderr.write.bind(process.stderr);

childProcess.on('exit', function(code) {

  if(code === 127 ) {
    log('Could not find "' + pyCmd + '" executable. It needs to be in the PATH\n'); 
  } else { childProcess.stderr.on('data', function (d) { log(d); }); }

  process.exit(code);
});
