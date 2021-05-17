module.exports = {
    name: 'add', 
    description: "this is an add command!", 
    execute(message, args) {
        if(!args.length) return message.channel.send('You need to add an anime name.'); 

        let arg = '';
          var i;
          for (i = 0; i < args.length; i++) {
              if (args.length > 1 && i !== args.length - 1) {
                  arg = arg.concat(args[i] + " ");
              } else {
                  arg = arg.concat(args[i]);
              }
          }

        const getLatest = require('./latest.js'); 
        let latestEp = getLatest.getEp(arg); 
        latestEp.then(
            (newestEp) => {
                message.channel.send(newestEp); 
                const fs = require('fs'); 
                const anime = {
                    name: `${arg}`, 
                    latest_episode: newestEp
                }; 
                fs.appendFileSync('animes.json', JSON.stringify(anime) + "\n", {'flags': 'a+'}, (err) => {
                    if (err) throw err; 
                    console.log(err);
                });
            },
            () =>{message.channel.send("Sorry, anime not found.")}
        );
    }
}