class Usuario
{
    #id
    #email
    #senha
    #nome

    constructor(email, senha, nome)
    {
        this.#validarEmail(email)

        this.#email = email
        this.#senha = senha
        this.#nome = nome
    }

    get id()
    {
        return this.#id
    }

    get email()
    {
        return this.#email
    }

    get senha()
    {
        return this.#senha
    }

    get nome()
    {
        return this.#nome
    }

    set email(valor)
    {
        this.#email = valor
    }

    set id(valor)
    {
        this.#id = valor
    }


    #validarEmail(email)
    {
        const pattern =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if(!pattern.test(email))
        {
            throw new Error("Email fora do padrão")
        }

    }

}

module.exports = Usuario