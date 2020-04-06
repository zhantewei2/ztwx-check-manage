const check=require("./index");

yarn=process.argv[2];

yarn= !(yarn==="0"||yarn==="false"||yarn==="null");

check(yarn);


