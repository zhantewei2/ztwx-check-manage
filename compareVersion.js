const fs=require("fs");
const path=require("path");
const HOST_PATH=process.cwd();
const semver=require("semver");

const getLibraryDict=()=>{
    const content=JSON.parse(fs.readFileSync(
        path.join(HOST_PATH,"package.json"),
        "utf8"
    ));

    return {
        ...content.dependencies||{},
        ...content.devDependencies||{}
    };
};

const getNodeModuleDirs=()=>{
    try{
        return fs.readdirSync(path.join(
            HOST_PATH,"node_modules"
        ));
    }catch(e){
        return []
    }
};

const compareDiff=()=>{
    if(!fs.existsSync(HOST_PATH,"node_modules"))return null;

    const packageDict=getLibraryDict();
    const diffList=[];
    let packageVersion;
    let targetDir;
    let targetPackageJson;
    let targetVersion;
    let whenError;
    for(let packageName in packageDict){
        try {
            packageVersion = packageDict[packageName];
            targetDir = path.join(HOST_PATH, "node_modules", packageName);
            targetPackageJson = path.join(HOST_PATH, "node_modules", packageName, "package.json");
            if (!fs.existsSync(targetDir) || !fs.existsSync(targetPackageJson)) {
                diffList.push({
                    type: "empty",
                    packageName,
                    packageVersion
                });
                continue;
            }
            targetVersion = JSON.parse(fs.readFileSync(targetPackageJson))["version"];
            if(!semver.satisfies(targetVersion,packageVersion)){
                diffList.push({
                    type:"update",
                    packageName,
                    packageVersion,
                    targetVersion
                })
            }
        }catch(e){
            whenError=e;
            break;
        }
    }
    if(whenError)throw whenError;
    return diffList;
};

// const dict=getLibraryDict();
// console.log(dict)
exports.compareDiff=compareDiff;