const {spawnSync} =require("child_process");
const {logWarn,logInfo,logChapter} =require("./color");
const {compareDiff} =require("./compareVersion");

const switchCommand=(yarn)=>yarn?
        (process.platform==="win32"?"yarn.cmd":"yarn"):
        (process.platform==="win32"?"npm.cmd":"npm");

const autoInstall=async(yarn=true)=>{
    spawnSync(switchCommand(yarn),["install"],{stdio:"inherit"});
};
const printList=(diffList)=>{
    for(let i of diffList){
        if(i.type==="update"){
            console.log(logWarn("update"),`${logChapter(i.packageName)} from ${logInfo(i.targetVersion)} to ${logInfo(i.packageVersion)}`)
        }else {
            console.log(logWarn("new"),`${logChapter(i.packageName)} : ${logInfo(i.packageVersion)}`)
        }
    }
};
const check=(yarn=true,customPrint)=>{
    const diffList=compareDiff();
    //node_modules not exists
    if(diffList===null){
        console.log(logWarn("node_modules not exists"))
    }else if(diffList.length){
        customPrint&&customPrint();
        printList(diffList);
        autoInstall(yarn);
    }else{
        console.log(logInfo("No package to update was found"));
        process.exit();
    }
};

module.exports=check;