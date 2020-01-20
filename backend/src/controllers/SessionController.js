const User = require('../models/User')

//list seção - uma seção - criar seção - alterar seção - destroir seção
// index - show - store -  update - destroy

module.exports = {

     async store(req, res){

         const { email } = req.body;

         let user = await User.findOne({ email })

         user = user == null ? await User.create({ email }) : user;

         return res.json(user);
    },

    async validateSessionUserHeaders(req, res) {
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'usuario não encontrado no contexto atual.'});
        }
    }
};