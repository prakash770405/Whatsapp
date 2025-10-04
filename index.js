const express=require("express");
const mongoose=require("mongoose");
const app=express();
const chat=require("./models/chat");
const methodOverride=require("method-override");

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

//---------------------------------------database connection

main().then(()=>{
    console.log("Database connected");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.listen(8080,(req,res)=>{
    console.log("server is running on port 8080");
});

// let chat1=new chat({
//     from: "riya",
//     to: "akash",
//     msg: "Hi akash, how are you?",
//     created_at: new Date()
// });
// chat1.save().then((result)=>{
//     console.log(result);
// }).catch(err=>{
//     console.log(err);
// });


//---------------------------------------show chats
app.get("/chats", async (req,res)=>{
let chats=await chat.find();
res.render("index.ejs",{chats});
})
//---------------------------------------add  new message
app.get("/chats/new",(req,res)=>{
    res.render("newmsg.ejs");
})
app.post("/chats/new",(req,res)=>{
let {from,to,msg}=req.body;
let newchat=new chat({
    from,
    to,
    msg,
    created_at: new Date()  
    });
    newchat.save().then((result)=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    });
    res.redirect("/chats");
})
//---------------------------------------edit message
app.get("/chats/:id/edit",  async (req,res)=>{
    let {id}= req.params;
    let info=await chat.findById(id);
     res.render("editmsg.ejs",{info});
})

app.put("/chats/:id/edit", async (req,res)=>{
    let {id}= req.params;
    let {msg}=req.body;
     await chat.findByIdAndUpdate(id,
        {msg}
    );
    res.redirect("/chats");
});

//---------------------------------------delete message
app.delete("/chats/:id/delete", async (req,res)=>{
    let {id}= req.params;   
        await chat.findByIdAndDelete(id);
    res.redirect("/chats");
});