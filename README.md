# Covid Api Brasil

Uma api para que desenvolvedores possam utilizar os dados referentes à covid 19 no Brasil.

## Endpoints

> GET - https://covid-api-brasil.herokuapp.com/casos 

Retorna todos os casos de covid 19 no Brasil.

Resposta: 

```
{
  "totalCasos": 9056, 
  "totalMortes": 359,
  "casos": [{}]
}

Comentários:

"totalCasos" : Total de casos de covid 19 no Brasil.

"totalMortes" : Total de mortes de covid 19 no Brasil.

"casos" : Lista de objetos, onde cada objeto são os casos em uma data.
```
#

> GET - https://covid-api-brasil.herokuapp.com/casos/{data} 

Retorna todos os casos de covid 19 no Brasil na data especificada. OBS: Formato da data: YYYY-MM-DD.

__Exemplo__: https://covid-api-brasil.herokuapp.com/casos/2020-03-30

Resposta: 

```
[
  {
    "data": "2020-03-30",
    "casos": 323,
    "mortes": 23,
    "estados": [
      {
        "uf": "AC",
        "casos": 8,
        "mortes": 0
      },
   }
]

Comentários:

"data" : Data informada.

"casos" : Quantidade de casos confirmados na data informada.

"mortes" : Quantidade de mortes confirmadas na data informada.

"estados": Lista de estados onde ocorreu pelo menos um caso ou uma morte confirmado.

"uf": Sigla da unidade da federação.
"casos": Quantidade de casos confirmados na uf.
"mortes": Quantidade de mortes confirmadas na uf.
```
#
> GET - https://covid-api-brasil.herokuapp.com/ { uf do estado } 

Retorna todos os casos de covid 19 no estado informado.

__Exemplo__: https://covid-api-brasil.herokuapp.com/df

Resposta: 

```
{
  "casos": 402,
  "mortes": 5,
  "casosEstado": [
    {
      "data": "2020-03-07",
      "uf": "DF",
      "casos": 1
    },
  ]
}

Comentários:

"casos" : Total de casos de covid 19 no estado informado.

"mortes" : Total de mortes de covid 19 no estado informado.

"casosEstado" : Lista de objetos, onde cada objeto são os casos em uma data.

"data": Data do caso.
"uf": Sigla do estado.
"casos": Quantidade de casos na data do caso.
"mortes": Quantidade de mortes da data do caso.
```

#
> GET - https://covid-api-brasil.herokuapp.com/ { uf do estado } / {data}

Retorna todos os casos de covid 19 no estado e na data informado.

__Exemplo__: https://covid-api-brasil.herokuapp.com/df/2020-03-27

Resposta: 

```
[
  {
    "data": "2020-03-27",
    "uf": "DF",
    "casos": 30,
    "mortes": 0
  }
]

Comentários:

"data": Data do caso.

"uf": Sigla do estado.

"casos": Quantidade de casos na data informada.

"mortes": Quantidade de mortes da data informada.
```
