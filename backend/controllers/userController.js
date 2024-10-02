module.exports.allAcess=(request,response)=>{
    response.status(200).send("Public Content");
}
module.exports.userBoard=(request,response)=>{
    response.status(200).send("User Content");
}
module.exports.AdminBoard=(request,response)=>{
    response.status(200).send("Admin Content");
}
module.exports.ModeratorBoard=(request,response)=>{
    response.status(200).send("Moderator Content");
}