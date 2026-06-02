const sequelize = require("./database/dbconfig");
const Usuario = require("./schemas/UsuarioSchema");
const Atendimento = require("./schemas/AtendimentoSchema")
const server = require("./server");

async function run() {

    const port = 8080;

    try {

        Usuario.hasMany(Atendimento, {
            foreignKey:"usuarioId",
            as:"atendimentos"
        })

        Atendimento.belongsTo(Usuario, {
            foreignKey:"usuarioId",
            as:"users"
        })

        await sequelize.authenticate();
        console.log('✅ Conexão com o banco realizada com sucesso.');
       
        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados.');
   
        server.port = port;
        server.listen();

    } catch (error) {
        console.error('❌ Erro ao iniciar a aplicação:', error);
    }
}

run();