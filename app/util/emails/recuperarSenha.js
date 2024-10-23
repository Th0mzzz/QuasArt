module.exports = (url, token) => {
    return `<!DOCTYPE html>
            <html lang="pt-br">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Recuperação senha QuasArt</title>
                <style>
                    * {
                        padding: 0;
                        margin: 0;
                        border: 0;
                        box-sizing: border-box;
                    }

                    body,
                    html {
                        background: var(--cor-fundo);
                        transition: background .3s;
                        overflow-x: hidden;
                        scroll-behavior: smooth;
                        min-height: 100vh;
                    }

                    ::-webkit-scrollbar {
                        width: 10px;
                        padding: 0 10px;
                    }

                    ::-webkit-scrollbar-thumb {
                        background: linear-gradient(to bottom, var(--cor-principal), var(--cor-principal-hover));
                        border-radius: 20px;
                    }

                    :root {
                        /* Cores */
                        --cor-principal: #E6781E;
                        --cor-principal-hover: #ffc79a;
                        --cor-secundaria: #9A3198;
                        --cor-secundaria-hover: #9c5d9e;
                        --cor-fundo: #F3F8FF;
                        --cor-fundo2: #F8F6F4;
                        --cor-containers: #fff;
                        --cor-texto: #2C2C2C;
                        --cor-danger: #f56b6b;
                        --cor-success: #7ABA78;
                        --cor-warning: #FCCD2A;
                        /* Fontes */
                        --fs-text: clamp(13px, 2vw, 1px);
                        --fs-title: clamp(28px, 3vw, 32px);
                        --fs-subtitle: clamp(20px, 2.5vw, 22px);
                        --fs-supertitle: clamp(32px, 8vw, 40px);
                        --fs-tipografiaLogo: clamp(24px, 3vw, 28px);
                        --ff-text: 'Poppins', Verdana;
                        --ff-title: 'Montserrat', Arial;
                        --ff-subtitle: 'Montserrat', Arial;
                        --ff-supertitle: 'Poppins', Verdana;
                        --ff-tipografiaLogo: 'Jost', monospace;
                        --ff-smallText: 'Questrial', sans-serif;
                        --ff-link: 'Questrial', monospace;
                        --cor-btn: var(--cor-principal);
                        --cor-btn-hover: var(--cor-principal-hover);
                    }

                    .text {
                        text-decoration: none;
                        font-weight: 400;
                        font-family: var(--ff-text);
                        font-size: var(--fs-text);
                    }

                    .title {
                        text-decoration: none;
                        font-weight: 800;
                        font-family: var(--ff-title);
                        font-size: var(--fs-title);
                    }

                    .subtitle {
                        text-decoration: none;
                        font-weight: 600;
                        font-family: var(--ff-subtitle);
                        font-size: var(--fs-subtitle);
                    }

                    .supertitle {
                        text-decoration: none;
                        font-weight: 700;
                        font-family: var(--ff-supertitle);
                        font-size: var(--fs-supertitle);
                        letter-spacing: 1px;
                    }

                    .tipografia {
                        text-decoration: none;
                        font-weight: normal;
                        font-family: var(--ff-tipografiaLogo);
                        font-size: var(--fs-tipografiaLogo);
                    }

                    .negrito-amarelo {
                        color: var(--cor-principal);
                        text-decoration: none;
                        font-weight: bold;
                    }

                    .negrito-roxo {
                        color: var(--cor-secundaria-hover);
                        text-decoration: none;
                        font-weight: bold;
                    }

                    .smallText {
                        text-decoration: none;
                        font-weight: 400;
                        font-size: var(--fs-smalltext);
                        font-family: var(--ff-smallText);
                    }

                    .link {
                        font-size: var(--fs-link);
                        font-family: var(--ff-link);
                        text-decoration: none;
                    }

                    .btn {
                        display: block;
                        color: #ffffff;
                        font-weight: 400;
                        font-family: var(--ff-text);
                        font-size: clamp(14px, 2vw, 16px);
                        text-decoration: none;
                        background: var(--cor-btn);
                        padding: .5rem 1rem;
                        border-radius: 5px;
                        transition: background .3s, color .3s;
                        border: 1px solid transparent;
                        cursor: pointer;
                        text-align: center;

                        &.submit {
                            width: 100%;
                            border-radius: 50px;
                        }
                    }

                    .ativacao__container {
                        padding: 4rem;
                        display: flex;
                        flex-flow: column nowrap;
                        align-items: center;
                        background: var(--cor-containers);
                        width: fit-content;
                        border-radius: 20px;
                        margin: 4rem auto ;
                        box-shadow: 0 0 5px #00000071;
                        & header {
                            margin: auto;
                        }
                        & article{
                            margin-top: 1rem;
                            & .btn{
                                margin-top: 1rem;
                            }
                        }
                    }
                </style>
            </head>

            <body>
                <section class="ativacao__container">
                    <header>
                        <h2 class="title">Recuperar Senha</h2>
                    </header>
                    <article>
                        <p class="text">Solicitação de recuperação de senha. Clique abaixo para recupera-lá!</p>
                        <a href="${url}/redefinir-senha?token=${token}" class="btn" style="display: inline-block; padding: 10px 20px; background-color: #E6781E; color: #ffffff; text-decoration: none; border-radius: 5px;">Redefinir senha</a>
                    </article>
                    <footer>
                        <p class='text'>Ignore esse e-mail caso não tenha solicitado.</p>
                    </footer>
                </section>
            </body>

            </html>`
}