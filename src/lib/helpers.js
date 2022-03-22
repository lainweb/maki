const bcrypt = require('bcryptjs');
const handel = require('express-handlebars');


const helpers = {};//para registrarr
helpers.encriptar = async (contrasenaCuenta) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasenaCuenta, salt);
    return hash;
};
helpers.matchPassword = async (contrasenaCuenta, saveContrasenaCuenta) => {
    try {
        return await bcrypt.compare(contrasenaCuenta, saveContrasenaCuenta);
    } catch (e) {
        console.log(e);
    }
}

  



module.exports=helpers;