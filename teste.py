import requests
import pprint
import asyncio
import aioredis

client = 0
def menuP():
    print("=====Menu=====")
    print('1- requisitar recurso 1')
    print("2- requisitar recurso 2")
    op = input("> ")
    if(op == '1'):
        requisitarRec(1)
    elif(op == '2'):
        requisitarRec(2)

def requisitarRec(recurso):
    url = 'http://localhost:3000/server'
    payload1 = {'recurso': recurso, 'ClientID': client}
    resposta = requests.get(url + '/requestToken',params=payload1)
    if(resposta.content == "Finalizado"):
        menuAguardando()
    else:
        menuUsaRecurso(recurso)
    print("Done")

def menuUsaRecurso(recurso):
    op =0
    while(op != -1):
        url = 'http://localhost:3000/server'
        print("=====Menu=====")
        print('1- usar recurso '+str(recurso))
        print("2- soltar recurso "+str(recurso))
        op = input("> ")
        if (op == '1'):
            resposta = requests.get(url + '/resource/' + str(recurso))
            pprint.pprint(resposta.content)
        elif (op == '2'):
            payload1 = {'recurso': recurso, 'ClientID': client}
            resposta = requests.get(url + '/releaseToken/', payload1)
            op = -1



def menuAguardando():
    print("Aguardando recurso solicitado....")



def main():
    while True:
        menuP()
if __name__ == "__main__":
    main()