var fs          = require('fs');
var path        = require('path');
var cp          = require('child_process');

// get library path
var lib = path.resolve(__dirname, '../local_modules/');

fs.readdirSync(lib).forEach(function(mod){
    var modPath = path.join(lib, mod);

    // ensure path has package.json
    if(!fs.existsSync(path.join(modPath, 'package.json'))) return;

    // install folder
    cp.spawn('npm', ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
});