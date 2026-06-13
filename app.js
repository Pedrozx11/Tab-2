let tarefas =
JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarDados(){

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

function adicionarTarefa(){

    const titulo =
    document.getElementById("titulo").value;

    const descricao =
    document.getElementById("descricao").value;

    if(titulo.trim() === ""){

        alert("Informe um título.");
        return;
    }

    const tarefa = {

        id: Date.now(),

        titulo: titulo,

        descricao: descricao,

        prioridade: false,

        status: "PENDENTE"
    };

    tarefas.push(tarefa);

    salvarDados();

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";

    renderizarTarefas();
}

function marcarPrioridade(id){

    const tarefa =
    tarefas.find(t => t.id === id);

    if(tarefa){

        tarefa.prioridade = true;

        salvarDados();

        renderizarTarefas();
    }
}

function finalizarTarefa(id){

    const tarefa =
    tarefas.find(t => t.id === id);

    if(tarefa){

        tarefa.status = "FINALIZADA";

        salvarDados();

        renderizarTarefas();
    }
}

function cancelarTarefa(id){

    const tarefa =
    tarefas.find(t => t.id === id);

    if(tarefa){

        tarefa.status = "CANCELADA";

        salvarDados();

        renderizarTarefas();
    }
}

function renderizarTarefas(){

    const textoPesquisa =
    document
    .getElementById("pesquisa")
    .value
    .toLowerCase();

    const lista =
    document.getElementById("listaTarefas");

    const finalizadas =
    document.getElementById("listaFinalizadas");

    lista.innerHTML = "";
    finalizadas.innerHTML = "";

    const tarefasFiltradas =
    tarefas.filter(t =>

        t.titulo.toLowerCase()
        .includes(textoPesquisa)

        ||

        t.descricao.toLowerCase()
        .includes(textoPesquisa)
    );

    tarefasFiltradas.forEach(tarefa => {

        const div =
        document.createElement("div");

        div.classList.add("tarefa");

        if(tarefa.prioridade){

            div.classList.add("prioridade");
        }

        if(tarefa.status === "FINALIZADA"){

            div.classList.add("finalizada");
        }

        if(tarefa.status === "CANCELADA"){

            div.classList.add("cancelada");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>${tarefa.descricao}</p>

            <p>
                <strong>Status:</strong>
                ${tarefa.status}
            </p>

            <div class="acoes">

                <button onclick="marcarPrioridade(${tarefa.id})">
                    Prioridade
                </button>

                <button onclick="finalizarTarefa(${tarefa.id})">
                    Finalizar
                </button>

                <button onclick="cancelarTarefa(${tarefa.id})">
                    Cancelar
                </button>

            </div>
        `;

        if(tarefa.status === "FINALIZADA"){

            finalizadas.appendChild(div);

        }else{

            lista.appendChild(div);
        }

    });
}

renderizarTarefas();