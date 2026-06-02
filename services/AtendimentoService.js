const Atendimento = require("../mvc/models/AtendimentoModel");
const AtendimentoSchema = require("../schemas/AtendimentoSchema");
const UsuarioSchema = require("../schemas/UsuarioSchema")
const { Op } = require('sequelize')
const moment = require('moment')

class AtendimentoService {

    #atendimentoSchema

    constructor() {
        this.#atendimentoSchema = AtendimentoSchema;
    }

    async buscarAtendimento(id) {
        const dado = await this.#atendimentoSchema.findOne({
            where: { id: id },
            include: "users"
        });

        if (!dado) {
            return null
        }

        const atendimento = new Atendimento(
            dado.nomeCliente,
            dado.telefone,
            dado.horarioAtendimento,
            dado.dataAtendimento,
            dado.dataNascimento,
            dado.tipoServico,
            dado.users.id
        )

        atendimento.id = dado.id

        return atendimento;

    }

    async deletarAtendimento(id) {
        const atendimento = await this.#atendimentoSchema.findOne({
            where: { id: id }
        });

        const affectedRows = await atendimento.destroy()

        return affectedRows;
    }

    async buscarTodosAtendimentos() {
        const atendimentos = []
        const dados = await this.#atendimentoSchema.findAll({
            include: "users"
        });


        for (const atendimento of dados) {
            const a = new Atendimento(
                atendimento.nomeCliente,
                atendimento.telefone,
                atendimento.horarioAtendimento,
                atendimento.dataAtendimento,
                atendimento.dataNascimento,
                atendimento.tipoServico,
                atendimento.users.username
            )

            a.id = atendimento.id

            atendimentos.push(a)
        }

        return atendimentos

    }

    async cadastrarAtendimento(
        nomeCliente,
        telefone,
        horarioAtendimento,
        dataAtendimento,
        dataNascimento,
        tipoServico,
        profissional
    ) {

        let a = null;

        const atendimento = new Atendimento(
            nomeCliente,
            telefone,
            horarioAtendimento,
            dataAtendimento,
            dataNascimento,
            tipoServico,
            profissional
        )

        let atendimentoIntervalo = null;

        if (tipoServico == "Corte de Cabelo") {
            const horario = moment(horarioAtendimento, "HH:mm").add(40,'minutes').format("HH:mm")

            const row = await this.#atendimentoSchema.findOne({
                where: {
                    tipoServico: 'Corte de Cabelo',
                    horarioAtendimento: {
                        [Op.between]: [horarioAtendimento, horario]
                    }
                }
            })

            if (row) {
                atendimentoIntervalo = row.horarioAtendimento
            }
        }
        else if(tipoServico == "Barba")
        {
            const horario = moment(horarioAtendimento, "HH:mm").add(20,'minutes').format("HH:mm")

            const row = await this.#atendimentoSchema.findOne({
                where: {
                    tipoServico: 'Barba',
                    horarioAtendimento: {
                        [Op.between]: [horarioAtendimento, horario]
                    }
                }
            })

            if (row) {
                atendimentoIntervalo = row.horarioAtendimento
            }
        }
        else if(tipoServico == "Sobrancelha")
        {
            const horario = moment(horarioAtendimento, "HH:mm").add(10,'minutes').format("HH:mm")


            const row = await this.#atendimentoSchema.findOne({
                where: {
                    tipoServico: 'Sobrancelha',
                    horarioAtendimento: {
                        [Op.between]: [horarioAtendimento, horario]
                    }
                }
            })

            if (row) {
                atendimentoIntervalo = row.horarioAtendimento
            }
        }
        else
        {
            const horario = moment(horarioAtendimento, "HH:mm").add(40,'minutes').format("HH:mm")


            const row = await this.#atendimentoSchema.findOne({
                where: {
                    tipoServico: 'Outros',
                    horarioAtendimento: {
                        [Op.between]: [horarioAtendimento, horario]
                    }
                }
            })

            if (row) {
                atendimentoIntervalo = row.horarioAtendimento
            }
        }

        const validaAtendimento = atendimento.validarConflitoHorario(horarioAtendimento, atendimentoIntervalo)


        if (validaAtendimento) {
             a = await this.#atendimentoSchema.create(
                {
                    nomeCliente: atendimento.nomeCliente,
                    telefone: atendimento.telefone,
                    horarioAtendimento: atendimento.horarioAtendimento,
                    dataAtendimento: atendimento.dataAtendimento,
                    dataNascimento: atendimento.dataNascimento,
                    tipoServico: atendimento.tipoServico,
                    profissional: atendimento.profissional,
                    usuarioId: atendimento.profissional
                }
            )
        }  

        return a;

    }

    async atualizarAtendimento(
        id,
        nomeCliente,
        telefone,
        horarioAtendimento,
        dataAtendimento,
        dataNascimento,
        tipoServico,
        profissional
    ) {

        let rows = 0;

        const atendimento = await this.buscarAtendimento(id)

        if (atendimento) {

            const model = new Atendimento(
                nomeCliente || atendimento.nomeCliente,
                telefone || atendimento.telefone,
                horarioAtendimento || atendimento.horarioAtendimento,
                dataAtendimento || atendimento.dataAtendimento,
                dataNascimento || atendimento.dataNascimento,
                tipoServico || atendimento.tipoServico,
                profissional || atendimento.profissional
            )

            const affectedRows = await this.#atendimentoSchema.update(
                {
                    nomeCliente: model.nomeCliente,
                    telefone: model.telefone,
                    horarioAtendimento: model.horarioAtendimento,
                    dataAtendimento: model.dataAtendimento,
                    dataNascimento: model.dataNascimento,
                    tipoServico: model.tipoServico,
                    profissional: model.profissional,
                    usuarioId: model.profissional
                },
                {
                    where: {
                        id: id
                    }
                }
            )

            rows = affectedRows
        }

        return rows;
    }


}
// Corrigido de modules para module
module.exports = AtendimentoService;