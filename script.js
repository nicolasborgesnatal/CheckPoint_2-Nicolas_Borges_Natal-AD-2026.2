// Elementos da página
const gridAtores = document.querySelector("#grid-atores");
const campoBusca = document.querySelector("#campo-busca");
const filtroPais = document.querySelector("#filtro-pais");
const filtroDecada = document.querySelector("#filtro-decada");
const contador = document.querySelector("#contador");
const mensagemVazia = document.querySelector("#mensagem-vazia");

// Países em português
const paises = {
  "United States": "Estados Unidos",
  "United Kingdom": "Reino Unido",
  "Canada": "Canadá",
  "Ireland": "Irlanda",
  "Israel": "Israel",
  "New Zealand": "Nova Zelândia",
  "Belgium": "Bélgica",
  "Spain": "Espanha",
  "Chile": "Chile",
  "Romania": "Romênia",
  "Korea, Republic of": "Coreia do Sul",
};

// Traduz o país, ou mantém o original se não estiver no objeto
function traduzirPais(pais) {
  return paises[pais] || pais;
}

// Converte "1979-08-27" em "27/08/1979"
function formatarData(data) {
  return data.split("-").reverse().join("/");
}

// Pega a década: "1979-08-27" vira "1970"
function pegarDecada(data) {
  return data.slice(0, 3) + "0";
}

// Preenche o select de países sem repetir
function preencherPaises() {
  const lista = [];

  atores.forEach((ator) => {
    if (!lista.includes(ator.pais)) {
      lista.push(ator.pais);
    }
  });

  // Ordem alfabética pelo nome em português
  lista.sort((a, b) => traduzirPais(a).localeCompare(traduzirPais(b)));

  let opcoes = "";
  lista.forEach((pais) => {
    opcoes += `<option value="${pais}">${traduzirPais(pais)}</option>`;
  });

  filtroPais.innerHTML += opcoes;
}

// Preenche o select de décadas sem repetir
function preencherDecadas() {
  const lista = [];

  atores.forEach((ator) => {
    const decada = pegarDecada(ator.nascimento);
    if (!lista.includes(decada)) {
      lista.push(decada);
    }
  });

  // Da mais antiga para a mais recente
  lista.sort((a, b) => a - b);

  let opcoes = "";
  lista.forEach((decada) => {
    opcoes += `<option value="${decada}">Década de ${decada}</option>`;
  });

  filtroDecada.innerHTML += opcoes;
}

// Monta os cards a partir de uma lista
function renderizarAtores(lista) {
  let cards = "";

  lista.forEach((ator) => {
    cards += `
      <div class="card">
        <img src="${ator.foto}" alt="Foto de ${ator.nome}" loading="lazy">
        <div class="card-info">
          <h2>${ator.nome}</h2>
          <p class="pais">${traduzirPais(ator.pais)}</p>
          <p class="nascimento">Nascimento: ${formatarData(ator.nascimento)}</p>
        </div>
      </div>
    `;
  });

  gridAtores.innerHTML = cards;
  contador.textContent = `${lista.length} de ${atores.length} atores e atrizes`;
}

// Aplica nome, país e década ao mesmo tempo
function filtrarAtores() {
  const termo = campoBusca.value.trim().toLowerCase();
  const pais = filtroPais.value;
  const decada = filtroDecada.value;

  const filtrados = atores.filter((ator) => {
    const bateNome = ator.nome.toLowerCase().includes(termo);
    // Valor vazio no select significa "todos"
    const batePais = pais === "" || ator.pais === pais;
    const bateDecada = decada === "" || pegarDecada(ator.nascimento) === decada;

    return bateNome && batePais && bateDecada;
  });

  renderizarAtores(filtrados);

  // Aviso quando nenhum card passa nos filtros
  if (filtrados.length === 0) {
    mensagemVazia.textContent = "Nenhum ator ou atriz encontrado com esses filtros. Tente outro nome, país ou década.";
  } else {
    mensagemVazia.textContent = "";
  }
}

// Início
preencherPaises();
preencherDecadas();
renderizarAtores(atores);