// window.localStorage.clear();
Object.values(window.localStorage).forEach((tarefa) => {
	tarefa = JSON.parse(tarefa);
	carregarCardTarefa(tarefa);
});

function carregarCardTarefa(tarefa) {
	let divTarefa = document.createElement('div');
	divTarefa.classList.add('card-tarefa');

	let checkboxTarefaConcluida = document.createElement('input');
	checkboxTarefaConcluida.setAttribute('type', 'checkbox');
	checkboxTarefaConcluida.setAttribute('id', `checkbox-tarefa-concluida${tarefa.numero}`);
	checkboxTarefaConcluida.setAttribute('onclick', `alterarConclusaoDaTarefa(${tarefa.numero})`);

	let paragrafoTextoTarefa = document.createElement('p');
	paragrafoTextoTarefa.setAttribute('id', `paragrafo-texto-tarefa-${tarefa.numero}`);
	paragrafoTextoTarefa.innerHTML = tarefa.descricao;

	let divBotoes = document.createElement('div');

	let botaoExcluirTarefa = document.createElement('button');
	botaoExcluirTarefa.classList.add('botao-excluir-tarefa');
	botaoExcluirTarefa.setAttribute('numero-tarefa', tarefa.numero);
	botaoExcluirTarefa.setAttribute('onclick', `excluirTarefa(${tarefa.numero})`);

	let iconeBotaoExcluirTarefa = document.createElement('i');
	iconeBotaoExcluirTarefa.classList.add('fa');
	iconeBotaoExcluirTarefa.classList.add('fa-trash');

	botaoExcluirTarefa.appendChild(iconeBotaoExcluirTarefa);

	let botaoEditarTarefa = document.createElement('button');
	botaoEditarTarefa.classList.add('botao-editar-tarefa');
	botaoEditarTarefa.setAttribute('numero-tarefa', tarefa.numero);
	botaoEditarTarefa.setAttribute('onclick', `abrirModal('editar', ${tarefa.numero})`);

	let iconeBotaoEditarTarefa = document.createElement('i');
	iconeBotaoEditarTarefa.classList.add('fa');
	iconeBotaoEditarTarefa.classList.add('fa-edit');

	botaoEditarTarefa.appendChild(iconeBotaoEditarTarefa);

	divBotoes.appendChild(botaoExcluirTarefa);
	divBotoes.appendChild(botaoEditarTarefa);

	divTarefa.appendChild(checkboxTarefaConcluida);
	divTarefa.appendChild(paragrafoTextoTarefa);
	divTarefa.appendChild(divBotoes);

	let lista = document.getElementById('lista-de-tarefas');
	lista.appendChild(divTarefa);
}

function excluirTarefa(numeroTarefa) {
	window.localStorage.removeItem(`tarefa_${numeroTarefa}`);
	location.reload();
}

function abrirModal(acao, numeroTarefa) {
	let tituloModal = '';
	let textoBotaoModal = '';

	switch (acao) {
		case 'adicionar':
			tituloModal = 'Adicionar Tarefa';
			textoBotaoModal = 'Adicionar';
			break;
		case 'editar':
			let inputHiddenNumeroTarefa = document.createElement('input');
			inputHiddenNumeroTarefa.setAttribute('type', 'hidden');
			inputHiddenNumeroTarefa.setAttribute('numero-tarefa', numeroTarefa);

			let conteudoModal = document.getElementById('conteudo-modal');
			conteudoModal.appendChild(inputHiddenNumeroTarefa);

			tituloModal = 'Editar Tarefa';
			textoBotaoModal = 'Editar';
			break;
	}

	document.getElementById('modal').classList.toggle('esconder');

	document.getElementById('titulo-modal').innerHTML = tituloModal;

	let botaoModal = document.getElementById('botao-modal');
	botaoModal.classList.add('botao-adicionar-tarefa-modal');
	botaoModal.innerHTML = textoBotaoModal;
}

function executarAcaoModal() {
	let tituloModal = document.getElementById('titulo-modal').innerHTML;

	switch (tituloModal) {
		case 'Adicionar Tarefa':

			let tarefaAdicionar = {
				descricao: document.getElementById('input-modal').value,
				concluida: false,
				numero: window.localStorage.length + 1
			}

			window.localStorage.setItem(`tarefa_${window.localStorage.length + 1}`, JSON.stringify(tarefaAdicionar));
			location.reload();
			break;
		case 'Editar Tarefa':
			let numeroTarefa = document.querySelector('input[numero-tarefa]').attributes['numero-tarefa'].value;
			console.log(numeroTarefa);
			let tarefaEditar = JSON.parse(window.localStorage.getItem(`tarefa_${numeroTarefa}`));
			tarefaEditar.descricao = document.getElementById('input-modal').value;

			window.localStorage.setItem(`tarefa_${numeroTarefa}`, JSON.stringify(tarefaEditar));
			location.reload();
			break;
	}
}

function fecharModal() {
	document.getElementById('modal').classList.toggle('esconder');
}

function alterarConclusaoDaTarefa(numeroTarefa) {
	let tarefa = JSON.parse(window.localStorage.getItem(`tarefa_${numeroTarefa}`));
	tarefa.concluida = !tarefa.concluida;
	window.localStorage.setItem(`tarefa_${numeroTarefa}`, JSON.stringify(tarefa));

	let paragrafoTextoTarefa = document.getElementById(`paragrafo-texto-tarefa-${numeroTarefa}`);
	if (tarefa.concluida) {
		paragrafoTextoTarefa.style.textDecoration = 'line-through';
		paragrafoTextoTarefa.style.color = '#888';
	} else {
		paragrafoTextoTarefa.style.textDecoration = 'none';
		paragrafoTextoTarefa.style.color = '#111';
	}
}
