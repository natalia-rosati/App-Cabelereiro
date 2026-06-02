class Usuario
{
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


    #validarEmail(email)
    {
        const pattern =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if(!pattern.test(email))
        {
            throw new Error("Email fora do padrão")
        }

    }

}

const usuario = new Usuario("a@b.com", "123","Zé")