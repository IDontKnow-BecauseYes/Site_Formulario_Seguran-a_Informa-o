document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault(); // impede o recarregamento da página

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Armazena no localStorage (não seguro para senhas reais!)
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("senha", senha);

    alert("Usuário e senha salvos com sucesso!");
});

