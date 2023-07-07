let frm = document.querySelector("form");
let tbody = document.querySelector("tbody");
const url = 'http://localhost:3000/pessoas';

const listar = () => {
    const list = document.createDocumentFragment();
    frm.reset();
    frm.id.value = '';
    frm.nome.focus();
    frm.enviar.value = 'Adicionar';
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let pessoas = data;
            tbody.innerText = '';
            pessoas.map(function(pessoa) {
                let tr = document.createElement('tr');
                let id = document.createElement('td');
                let nome = document.createElement('td');
                let idade = document.createElement('td');
                let excluir = document.createElement('td');
                
                id.innerHTML = `${pessoa.id}`
                nome.innerHTML = `${pessoa.nome}`;
                idade.innerHTML = `${pessoa.idade}`;
                excluir.innerHTML = "EXCLUIR";

                tr.appendChild(id);
                tr.appendChild(nome);
                tr.appendChild(idade);
                tr.appendChild(excluir);
                list.appendChild(tr);
            });
            tbody.appendChild(list);
        })
        .catch(function(error) {
            console.log(error);
        });
}

frm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    if(!frm.id.value){
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });

        fetch(request)
            .then(function() {
                listar();
            });
    } else {
        let request = new Request(url+'/'+frm.id.value, {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });

        fetch(request)
            .then(function() {
                listar();
            });
    }
});

frm.btListar.addEventListener("click", (e) => {
    e.preventDefault();
    listar();
});

tbody.addEventListener("click", function(e) {
    const id = e.target.parentNode.firstChild.innerHTML;
    if (e.target.innerHTML === 'EXCLUIR'){
        let request = new Request(url+'/'+id, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });

        fetch(request)
            .then(function() {
                listar();
            });
    } else {
        
        const list = document.createDocumentFragment();
        fetch(url+'/pessoa/'+id)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let pessoas = data;
                pessoas.map(function(pessoa) {
                    frm.id.value = pessoa.id;
                    frm.nome.value = pessoa.nome;
                    frm.idade.value = pessoa.idade;
                    frm.enviar.value = 'Alterar';
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
});