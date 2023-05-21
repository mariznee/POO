export class Util {
    static gerarAleatorio(minimo: number, maximo: number) {
        return Math.round(((Math.random()*10)/2) * (maximo - minimo));
    }

    static exibir(text: string, X: any, Y: any) {
        console.log();
        console.log(text);
        console.table([X, Y]);
    }
}

