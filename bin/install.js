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
    console.log("[Installing dependencies for "+mod+" module]");
    cp.spawn('npm', ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
});

console.log("[Installing global dependencies]");
cp.spawn('npm', ['i'], { env: process.env, cwd: path.resolve(__dirname, "../"), stdio: 'inherit' });