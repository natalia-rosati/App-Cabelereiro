const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/dbconfig');

class Atendimento extends Model{}

Atendimento.init({
    nomeCliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: false,
    } ,
    horarioAtendimento: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    dataAtendimento: {
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    tipoServico: {
        type: DataTypes.ENUM('Corte de cabelo', 'Barba', 'Sobrancelha', 'Outros'),
        allowNull: false,
    },
    profissional: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    sequelize,
    modelName: 'Atendimentos',
    tableName: 'atendimentos'
});

module.exports = Atendimento