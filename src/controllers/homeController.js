const HomeModel = require('../models/HomeModel');

/*
HomeModel.create({
    codUf: 27,
    nameUf: 'Pernambuco'
})
    .then(dados => console.log(dados))
    .catch(e => console.log(e));
*/
exports.paginaInicial = (req, res) => {
    res.render('index');
};