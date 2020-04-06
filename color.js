exports.logWarn=(message)=>{
    return "\033[31m"+ message +"\033[0m";
};
exports.logInfo=(message)=>{
    return "\033[34m"+ message +"\033[0m";
};

exports.logChapter=(message)=>{
    return "\033[033m"+ message+ "\033[0m";
};