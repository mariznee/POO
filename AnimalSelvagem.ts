import { Animal } from "./Animal";
import { Util } from "./Util";

export class AnimalSelvagem extends Animal {
    private _domesticavel: boolean;
    private _agressividade: number;

    constructor(nome: string, peso: number, energia: number, velocidade: number, domesticavel: boolean, agressividade: number) {
        super(nome, peso, energia, velocidade);
        this._idadeMeses = 0;
        this._areaDominio = Util.gerarAleatorio(1, 6) * 2 + 3;
        this._domesticavel = domesticavel;
        this._agressividade = agressividade;
    }
       
    private checarAgressividade(): void {
        if (this._agressividade <= 0) {
            this._agressividade = 0;
        }
        if (this._agressividade >= 100) {
            this._agressividade = 100;
            throw new Error("R.I.P.\n" +
                `O ${this.nome} morreu de raiva!`);
        }
    }

    public checarPeso(): void {
        if (this.peso <= 0) {
            this.peso = 0;
            throw new Error("RIP!\n" +
                `Esse ${this.nome} morreu de fome!`);
        }
        if (this.peso >= 100) {
            this.peso = 100;
            throw new Error("RIP!\n" +
                `Esse ${this.nome} explodiu de tanto comer!`);
        }
    }

    public checarDisposicao(): void {
        if (this._energia <= 0) {
            this._energia = 0;
            throw new Error("R.I.P.\n" +
                `Acabou a energia vital do ${this.nome}!`);
        }
        if (this._energia > 100) {
            this._energia = 100;
        }
    }

    private checarAreaDominio(): void {
        if (this._idadeMeses >= 20) {
            this._areaDominio += this._areaDominio * 10;
        }
    }

    private checarGeral(): void {
        this.checarPeso();
        this.checarDisposicao();
        this.checarAreaDominio();
        this.checarAgressividade();
    }

    public alimentar(presa: number): void {
        if (presa < 1.2) {
            this._agressividade += Util.gerarAleatorio(1, 5);
            this.checarAgressividade;
        }
        this.peso += Util.gerarAleatorio(1, 5) * presa * 3;
        this._energia += Util.gerarAleatorio(1, 7);
        this._idadeMeses += Util.gerarAleatorio(1, 5);
        this.checarGeral();
    }

    public apostarCorrida(corredor: Animal): void {
        this.correr(corredor);
        corredor.correr(this);
    }

    public correr(corredor: Animal): void {
        console.log("#".repeat(this._velocidade*2), this.nome);
        if (this.peso > 50 && this._agressividade < 20) {
            this.peso -= Util.gerarAleatorio(1, 8);
            this._energia -= Util.gerarAleatorio(1, 7);
            this._idadeMeses += Util.gerarAleatorio(1, 6);
        } else {
            this.peso -= Util.gerarAleatorio(1, 5);
            this._energia -= Util.gerarAleatorio(1, 3);
            this._idadeMeses += Util.gerarAleatorio(1, 3);
        }
        this.checarGeral();
    }

    public dormir(): void {
        if (this._domesticavel) {
            this._energia += Util.gerarAleatorio(1, 7);
            this.peso -= Util.gerarAleatorio(1, 3);
            this._agressividade -= Util.gerarAleatorio(1, 2);
            this._idadeMeses += Util.gerarAleatorio(0, 6);
            this.checarGeral();
        } else {
            this._energia += Util.gerarAleatorio(1, 5);
            this.peso -= Util.gerarAleatorio(1, 4);
            this._agressividade -= Util.gerarAleatorio(1, 3);
            this._idadeMeses += Util.gerarAleatorio(0, 5);
            this.checarGeral();
        }
    }

    public marcarTerritorio(): void {
        const aleatorio = Util.gerarAleatorio(0, 6);
        const ganhouTerritorio = aleatorio < this._velocidade && aleatorio < this._energia;

        if (ganhouTerritorio) {
            this._areaDominio += Util.gerarAleatorio(1, 5);
            this._energia -= Util.gerarAleatorio(1, 7);
            this.peso -= Util.gerarAleatorio(0, 3);
            this._idadeMeses += Util.gerarAleatorio(0, 6);
            console.log(`A área de domínio de ${this.nome} aumentou!`);
            
        } else {
            this.migrar(1);
            this._idadeMeses += Util.gerarAleatorio(0, 3);
            console.log(`A única alternativa do ${this.nome} é migrar.`);
        }
    }    

    public brigar(): boolean {    
        const maiorBriga = this.atacar();
        if (maiorBriga) {
            //console.log("Briga ganha agora é só comer a presa!");
            this.alimentar(1.235);
        } else {
            this._areaDominio -= Util.gerarAleatorio(0, 4);
        }
        return maiorBriga;              
    }

    private atacar(): boolean {
        const aleatorio = Util.gerarAleatorio(0, 8); 
        const ganhouBriga = aleatorio < this._velocidade && aleatorio < this._agressividade;

        if (ganhouBriga) {
            this._energia += this._energia * 1.5;
            this._agressividade -= this._agressividade * 0.25;
            this._idadeMeses += Util.gerarAleatorio(0, 6);
            this.checarGeral();
            return true;
        } else {
            this._energia = 10;
            this._agressividade = 90;
            this._idadeMeses += Util.gerarAleatorio(0, 3);
            this.checarGeral();
            return false;
        }    
    }
    
    public migrar(partiu: number): void {
        if (partiu == 1) {          
            this._energia -= Util.gerarAleatorio(1, 4);
            this.peso -= Util.gerarAleatorio(1, 2);
            this._idadeMeses += Util.gerarAleatorio(0, 7);
            console.log(`O ${this.nome} partiu em busca de um novo território`);
        } else {
            console.log("Não vou à lugar nenhum! -.- ");
            this._idadeMeses += Util.gerarAleatorio(1, 4);
        }
        this.checarGeral();
    }
}