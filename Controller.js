const express = require('express');
const cors = require('cors');

const models = require('./models'); 

const app = express();
app.use(cors());
// para usar o formanto json precisa incluir
app.use(express.json());

let cliente = models.Cliente; // esta se referindo à classe Cliente que esta dentro da pasta 
                              // models, por isso é escrita em maiuscula
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;       
let itemcompra = models.ItemCompra;
let compra = models.Compra;
let produto = models.Produto;                        

app.get('/', function(req,res){
    res.send('Olá, mundo!')
});

// app.get('/clientes', function(req,res){
//     res.send('Seja bem-vindo(a) a ServicesTI.')
// });

app.post('/clientes',async(req,res)=> {
    await cliente.create( // passando as informações que quero inserir
        req.body
    ).then(function(){
        return res.json({
            error: false,
            messsage : "Cliente inserido com sucesso!"
        })
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            messsage : "Foi impossivel se conectar!"
        })
    });
});

app.post('/clientes/:id/pedidos', async(req,res)=>{
    const ped={
        data: req.body.data,
        ClienteId: req.params.id
    };
    // verificar qntos clientes tem e se existe
    // procura pelo Id
    if(!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            messsage: 'Cliente não existe.'
        });
    };
    // caso o cliente exista
    await pedido.create(ped).then(order=>{
        return res.json({
            error: false,
            messsage: "Pedido inserido com sucesso.",
            order
        }).catch(erro=>{
            return res.status(400).json({
                error: true,
                messsage: "Nao foi possivel inserir o pedido."
            });
        });
    });
})

//app.get('/servico',async(req,res)=> {  --- metodo para criar internamente
// metodo para chamada externa
app.post('/servicos',async(req,res)=> {
    await servico.create( // passando as informações que quero inserir
        req.body
        // deixa este req pois estou usando o json, neste caso, tira as chaves tbem
        //nome:"Delphi",
        //descricao:"Manutenção e suporte a sistemas legados em Delphi"
        ////deixar só no get
        ////createAt: new Date(),
       //// updateAt: new Date()
    ).then(function(){
        return res.json({
            error: false,
            messsage : "Servico criado com sucesso!"
        })
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            messsage : "Foi impossivel se conectar!"
        })
    });

    //res.send('Servico criado com sucesso!'); -- usado no get
});

app.post('/produtos',async(req,res)=> {
    await produto.create( // passando as informações que quero inserir
        req.body
    ).then(function(){
        return res.json({
            error: false,
            messsage : "Produto criado com sucesso!"
        })
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            messsage : "Foi impossivel se conectar!"
        })
    });
});

app.post('/pedidos',async(req,res)=> {
    await pedido.create( // passando as informações que quero inserir
        req.body
    ).then(function(){
        return res.json({
            error: false,
            messsage : "Pedido realizado com sucesso!"
        })
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            messsage : "Foi impossivel se conectar!"
        })
    });
});

app.post('/itenspedidos',async(req,res)=> {
    await itempedido.create( // passando as informações que quero inserir
        req.body
    ).then(function(){
        return res.json({
            error: false,
            messsage : "Item inserido com sucesso!"
        })
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            messsage : "Foi impossivel se conectar!"
        })
    });
});
app.post('/compras',async(req,res)=> {
    await compra.create( // passando as informações que quero inserir
        req.body
    ).then(function(){
        return res.json({
            error: false,
            messsage : "Compra realizada com sucesso!"
        })
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            messsage : "Foi impossivel se conectar!"
        })
    });
});

app.post('/itenscompras',async(req,res)=> {
    await itemcompra.create( // passando as informações que quero inserir
        req.body
    ).then(function(){
        return res.json({
            error: false,
            messsage : "Item inserido com sucesso!"
        })
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            messsage : "Foi impossivel se conectar!"
        })
    });
});

 app.get('/listaservico', async(req,res)=>{
     await servico.findAll({
         //raw:true
         // ordena por nome
         order: [['nome', 'DESC']] 
     }).then(function(servicos){
         res.json({servicos}) // recebe toda a resposta do findAll
     });
});

app.get('/listaproduto', async(req,res)=>{
    await produto.findAll({
        raw:true
    }).then(function(produtos){
        res.json({produtos}) // recebe toda a resposta do findAll
    });
});

app.get('/listacompra', async(req,res)=>{
    await compra.findAll({
        raw:true
    }).then(function(compras){
        res.json({compras}) // recebe toda a resposta do findAll
    });
});

app.get('/listacliente', async(req,res)=>{
    await cliente.findAll({
        raw:true
    }).then(function(clientes){
        res.json({clientes}) // recebe toda a resposta do findAll
    });
});

app.get('/listaitemcompra', async(req,res)=>{
    await itemcompra.findAll({
        raw:true
    }).then(function(itemcompras){
        res.json({itemcompras}) // recebe toda a resposta do findAll
    });
});

// faz uma contagem de quantidade de cadastros
app.get('ofertaservicos', async (req,res)=>{
    await servico.count('id').then (function(servicos){
        res.json({servicos});
    }); 
});
///:id === parametro para buscar.. poderia ser nome 
app.get('/servico/:id', async(req,res)=>{
    await servico.findByPk(req.params.id).then(serv => {
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            messsage: "Erro: codigo nao encontrado!"
        });
    });
});

/*app.get('/atualizaservico', async(req,res)=>{
    await servico.findByPk(1).then(serv =>{
        serv.nome='HTML/CSS/JS';
        serv.descricao = 'Paginas estaticas e dinamicas estirizadas..';
        serv.save();
        return res.json({serv});
    });

});*/

app.put('/atualizaservico', async(req,res)=>{
    await servico.update(req.body,{
        where:{id: req.body.id}}).then(function(){
            return res.json({
                error: false,
                messsage: "Servico alterado com sucesso!"
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true, 
                messsage:"Erro na alteracao do servico."
            });
        });
});    

app.put('/atualizacompra', async(req,res)=>{
    await compra.update(req.body,{
        where:{id: req.body.id}}).then(function(){
            return res.json({
                error: false,
                messsage: "Compra alterado com sucesso!"
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true, 
                messsage:"Erro na alteracao da compra."
            });
        });
});    
app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id, {include:[{all:true}]})
    .then(ped=>{
        return res.json({ped});
    });
});

/*app.get('excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            messsage:"Cliente excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            messsage: "Erro ao excluir cliente."
        });    
    });
});*/

app.get('/excluircliente', async(req,res)=>{
    cliente.destroy({
        where: {id:1}
    });
});

app.get('/excluirproduto', async(req,res)=>{
    produto.destroy({
        where: {id:1}
    });
});

app.get('/excluiritemcompra', async(req,res)=>{
    itemcompra.destroy({
        where: {id:1}
    });
});

app.get('/excluircompra', async(req,res)=>{
    itemcompra.destroy({
        where: {id:1}
    });
});

/*app.get('excluircompra/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            messsage:"Compra excluida com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            messsage: "Erro ao excluir compra."
        });    
    });
});

app.get('excluirproduto/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            messsage:"Produto excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            messsage: "Erro ao excluir produto."
        });    
    });
});

app.get('excluiritemcompra/:id', async(req, res)=>{
    await itemcompra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            messsage:"Item excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            messsage: "Erro ao excluir item da compra."
        });    
    });
});*/

app.put('/atualizaproduto', async(req,res)=>{
    await produto.update(req.body,{
        where:{id: req.body.id}}).then(function(){
            return res.json({
                error: false,
                messsage: "Produto alterado com sucesso!"
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true, 
                messsage:"Erro na alteracao do produto."
            });
        });
});    

app.put('/atualizaitemcompra', async(req,res)=>{
    await itemcompra.update(req.body,{
        where:{id: req.body.id}}).then(function(){
            return res.json({
                error: false,
                messsage: "Item alterado com sucesso!"
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true, 
                messsage:"Erro na alteracao do item da compra."
            });
        });
});    

let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});