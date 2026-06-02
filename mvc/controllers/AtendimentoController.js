const AtendimentoService = require("../../services/AtendimentoService");
const UsuarioService = require("../../services/UsuarioService");

class AtendimentoController {

    constructor() {
        this.atendimentoService = new AtendimentoService();
        this.usuarioService = new UsuarioService();
    }

    // --- MÉTODOS PARA WEB (VIEWS) ---

    async atendimentoListView(req, res) {
        const atendimentos = await this.atendimentoService.buscarTodosAtendimentos();
        res.render("Atendimento/ListView", { atendimentos: atendimentos });
    }

    async atendimentoCreateView(req, res) {
        const usuarios = await this.usuarioService.buscarTodosUsuarios();
        res.render("Atendimento/CreateView", { usuarios: usuarios });
    }

    async atendimentoEditView(req, res) {
        const atendimento = await this.atendimentoService.buscarAtendimento(req.params.id);
        const usuarios = await this.usuarioService.buscarTodosUsuarios();
        res.render("Atendimento/EditView", { atendimento: atendimento, usuarios: usuarios });
    }

    // --- MÉTODOS PARA API (ANDROID / MOBILE) ---

    async listarTodosAPI(req, res) {
        try {
            const atendimentos = await this.atendimentoService.buscarTodosAtendimentos();
            res.status(200).json(atendimentos);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar atendimentos" });
        }
    }

    async buscarPorIdAPI(req, res) {
        try {
            const atendimento = await this.atendimentoService.buscarAtendimento(req.params.id);
            if (atendimento) {
                res.status(200).json(atendimento);
            } else {
                res.status(404).json({ error: "Atendimento não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar atendimento" });
        }
    }

    async atendimentoPostAsync(req, res) {
        try {
            const atendimento = await this.atendimentoService.cadastrarAtendimento(
                req.body.nomeCliente,
                req.body.telefone,
                req.body.horarioAtendimento,
                req.body.dataAtendimento,
                req.body.dataNascimento,
                req.body.tipoServico,
                req.body.profissional
            );

            if (atendimento) {
                res.status(201).json({ atendimento: atendimento });
            } else {
                // Caso o serviço retorne null por conflito de horário
                res.status(409).json({ error: "Conflito de horário: Este horário já está preenchido." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao processar o agendamento" });
        }
    }

    async atendimentoPutAsync(req, res) {
        try {
            const affectedRows = await this.atendimentoService.atualizarAtendimento(
                req.body.id,
                req.body.nomeCliente,
                req.body.telefone,
                req.body.horarioAtendimento,
                req.body.dataAtendimento,
                req.body.dataNascimento,
                req.body.tipoServico,
                req.body.profissional
            );

            if (affectedRows > 0) {
                res.status(200).json({ success: true, affectedRows: affectedRows });
            } else {
                res.status(404).json({ error: "Atendimento não encontrado para atualização" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar atendimento" });
        }
    }

    async atendimentoDeleteAsync(req, res) {
        try {
            const affectedRows = await this.atendimentoService.deletarAtendimento(req.params.id);
            res.status(200).json({ success: true, affectedRows: affectedRows });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar atendimento" });
        }
    }

}

module.exports = new AtendimentoController();