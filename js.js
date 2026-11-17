// Formulário de orçamento da Cenorê Confeitaria

const formulario = document.querySelector("#form-orcamento");
const campoData = document.querySelector("#data");
const campoHorario = document.querySelector("#horario");
const campoDescricao = document.querySelector("#descricao");
const mensagem = document.querySelector("#mensagem");

const botaoMenu = document.querySelector("#botao-menu");
const menu = document.querySelector("#menu");

// Impede que seja escolhida uma data anterior à data atual.
const agora = new Date();
const ano = agora.getFullYear();
const mes = String(agora.getMonth() + 1).padStart(2, "0");
const dia = String(agora.getDate()).padStart(2, "0");
campoData.min = `${ano}-${mes}-${dia}`;

// Abre e fecha o menu inferior.
botaoMenu.addEventListener("click", () => {
  const estaAberto = botaoMenu.getAttribute("aria-expanded") === "true";

  botaoMenu.setAttribute("aria-expanded", String(!estaAberto));
  botaoMenu.setAttribute("aria-label", estaAberto ? "Abrir menu" : "Fechar menu");
  menu.hidden = estaAberto;
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.hidden = true;
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  });
});

// Valida os campos e prepara a mensagem para o WhatsApp.
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const data = campoData.value;
  const horario = campoHorario.value;
  const descricao = campoDescricao.value.trim();

  if (!data || !horario || !descricao) {
    mensagem.textContent = "Preencha a data, o horário e a descrição do pedido.";
    return;
  }

  const [anoEntrega, mesEntrega, diaEntrega] = data.split("-");
  const dataFormatada = `${diaEntrega}/${mesEntrega}/${anoEntrega}`;

  const texto = [
    "Olá! Gostaria de solicitar um orçamento na Cenorê Confeitaria.",
    "",
    `Data de entrega: ${dataFormatada}`,
    `Horário de entrega: ${horario}`,
    `Pedido: ${descricao}`
  ].join("\n");

  // Defina o número oficial do WhatsApp da confeitaria aqui (55 + DDD + Número)
  const numeroWhatsApp = "5511963407528";

  // Limpa qualquer mensagem de erro anterior
  mensagem.textContent = "";

  // Abre diretamente o WhatsApp com a mensagem formatada
  const urlWhatsApp = `https://wa.me/${5511963407528}?text=${encodeURIComponent(texto)}`;
  window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
});